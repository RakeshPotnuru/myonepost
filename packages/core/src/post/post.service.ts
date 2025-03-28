import {
  CONSTANTS,
  Events,
  NotificationType,
  PostType,
  Prisma,
  users,
} from "@1post/shared";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { Env } from "src/env.validation";
import { GoogleService } from "src/google/google.service";
import { MuxService } from "src/mux/mux.service";
import { NotificationCreateEvent } from "src/notification/notification.events";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
    private readonly mux: MuxService,
    private readonly config: ConfigService<Env>,
    private readonly eventEmitter: EventEmitter2,
    private readonly google: GoogleService,
  ) {}

  async create(
    createPostDto: Omit<Prisma.postsCreateInput, "user">,
    user: users,
  ) {
    const isPostSafe = createPostDto.status !== "FLAGGED";

    const nextPostAllowedAt = isPostSafe
      ? new Date(new Date().getTime() + CONSTANTS.POST.NEXT_POST_ALLOWED_AT)
      : null; // next post after 24 hours

    await this.remove(user.id, createPostDto.post_type, true);

    try {
      const { id } = (
        await this.prisma.$transaction([
          this.prisma.posts.create({
            data: {
              ...createPostDto,
              user: {
                connect: { id: user.id },
              },
            },
            select: { id: true },
          }),
          this.prisma.users.update({
            where: { id: user.id },
            data: { next_post_allowed_at: nextPostAllowedAt },
            select: { id: true },
          }),
        ])
      )[1];

      if (createPostDto.status !== "PENDING") {
        this.eventEmitter.emit(
          Events.NOTIFICATION_CREATE,
          new NotificationCreateEvent({
            userId: user.id,
            type: NotificationType.ALERT,
            content: isPostSafe
              ? "Your post has been published."
              : `Your post has been flagged by our system. It's currently in review.`,
          }),
        );
      }

      return { id };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        "Something went wrong. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(userId: string, updatePostDto: Prisma.postsUpdateInput) {
    try {
      await this.prisma.posts.update({
        where: { user_id: userId },
        data: updatePostDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
        }
      }

      throw new HttpException(
        "Something went wrong. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(
    userId: string,
    newPostType?: PostType,
    shouldArchive: boolean = false,
  ) {
    try {
      const post = await this.prisma.posts.findUnique({
        where: { user_id: userId },
      });

      if (!post) {
        return;
      }

      if (post.status === "PENDING") {
        throw new HttpException(
          "Cannot delete a post when it's in pending status.",
          HttpStatus.FORBIDDEN,
        );
      }

      if (
        !shouldArchive &&
        newPostType !== "IMAGE" &&
        post.post_type === "IMAGE" &&
        post.media_url
      ) {
        await this.cloudinary.deleteImage(
          `${CONSTANTS.ASSET_FOLDERS.POSTS}/${post.media_url.split("/").pop().split(".")[0]}`,
        );
      }

      if (
        !shouldArchive &&
        (post.post_type === "VIDEO" || post.post_type === "AUDIO") &&
        post.media_data?.asset_id
      ) {
        await this.mux.video.assets
          .delete(post.media_data.asset_id)
          .catch(() => {
            // ignore
          });
      }

      await this.prisma.posts.delete({
        where: { user_id: userId },
        select: { id: true },
      });

      if (shouldArchive) {
        await this.archive({
          post_type: post.post_type,
          text: post.text,
          media_url: post.media_url,
          media_data: post.media_data,
          media_caption: post.media_caption,
          created_at: post.created_at,
          like_count: post.like_count,
          user: {
            connect: { id: userId },
          },
        });
      }

      return { success: true };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        "Something went wrong. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async archive(post: Prisma.archivesCreateInput) {
    try {
      await this.prisma.archives.create({
        data: post,
        select: { id: true },
      });
    } catch (error) {
      console.log(error);

      throw new HttpException(
        "Something went wrong. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  canPost(user: users) {
    if (user.next_post_allowed_at && user.next_post_allowed_at > new Date()) {
      throw new HttpException(
        "Next post is not allowed yet",
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }

  async createAsset(userId: string, url: string) {
    return await this.mux.video.assets
      .create({
        input: [{ url }],
        playback_policy: ["public"],
        encoding_tier: "baseline",
        passthrough: userId,
      })
      .catch((error) => {
        console.error("Mux upload creation failed:", error);

        throw new HttpException(
          "Something went wrong. Please try again later.",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async checkVideo(userId: string, playbackId: string, assetId: string) {
    try {
      const isVideoSafe = await this.google.isVideoSafe(
        `gs://${this.config.get("GCS_BUCKET_NAME")}/${userId}.mp4`,
        `${userId}.mp4`,
      );

      const caption = (
        await this.prisma.posts.findUnique({
          where: { user_id: userId, post_type: "VIDEO" },
          select: { media_caption: true },
        })
      ).media_caption;

      const isCaptionSafe = caption
        ? await this.google.isTextSafe(caption)
        : true;

      await this.prisma.$transaction(async (tx) => {
        await tx.posts.update({
          where: { user_id: userId },
          data: {
            status: isVideoSafe && isCaptionSafe ? "APPROVED" : "FLAGGED",
            media_url: playbackId,
            media_data: { asset_id: assetId },
          },
          select: { id: true },
        });

        if (!isVideoSafe || !isCaptionSafe) {
          await tx.users.update({
            where: { id: userId },
            data: {
              next_post_allowed_at: null,
            },
            select: { id: true },
          });
        }
      });

      this.eventEmitter.emit(
        Events.NOTIFICATION_CREATE,
        new NotificationCreateEvent({
          userId: userId,
          type: NotificationType.ALERT,
          content: isVideoSafe
            ? "Your post has been published."
            : "Your post has been flagged by our system. It's currently in review.",
        }),
      );
    } catch (error) {
      console.log("Error checking video:", error);
    }
  }
}

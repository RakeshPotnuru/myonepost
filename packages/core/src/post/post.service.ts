import { CONSTANTS, PostType, Prisma, users } from "@1post/shared";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { Env } from "src/env.validation";
import { MuxService } from "src/mux/mux.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
    private readonly mux: MuxService,
    private readonly config: ConfigService<Env>,
  ) {}

  async create(
    createPostDto: Omit<Prisma.postsCreateInput, "user">,
    user: users,
    isPostSafe: boolean,
  ) {
    const nextPostAllowedAt = isPostSafe
      ? new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      : null; // next post after 24 hours

    await this.remove(user.id, createPostDto.post_type);

    try {
      return (
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

  async remove(userId: string, newPostType?: PostType) {
    try {
      const post = await this.prisma.posts.findUnique({
        where: { user_id: userId },
      });

      if (!post) {
        return;
      }

      if (
        newPostType !== "IMAGE" &&
        post.post_type === "IMAGE" &&
        post.media_url
      ) {
        await this.cloudinary.deleteImage(
          `${CONSTANTS.ASSET_FOLDERS.POSTS}/${userId}`,
        );
      }

      if (
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

      return { success: true };
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

  async createUploadUrl(userId: string) {
    return await this.mux.video.uploads
      .create({
        cors_origin:
          this.config.get<Env["NODE_ENV"]>("NODE_ENV") === "development"
            ? "*"
            : this.config.get<string>("CLIENT_URL"),
        new_asset_settings: {
          playback_policy: ["public"],
          encoding_tier: "baseline",
          passthrough: userId,
        },
      })
      .catch((error) => {
        console.error("Mux upload creation failed:", error);

        throw new HttpException(
          "Something went wrong. Please try again later.",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}

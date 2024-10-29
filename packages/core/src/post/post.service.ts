import { CONSTANTS } from "@1post/shared";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prisma, User } from "@prisma/client";
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
    createPostDto: Omit<Prisma.PostCreateInput, "user">,
    user: User,
  ) {
    const nextPostAllowedAt = new Date(
      new Date().getTime() + 24 * 60 * 60 * 1000,
    ); // next post after 24 hours

    await this.remove(user.id);

    try {
      return (
        await this.prisma.$transaction([
          this.prisma.post.create({
            data: {
              ...createPostDto,
              user: {
                connect: { id: user.id },
              },
            },
            select: { id: true },
          }),
          this.prisma.user.update({
            where: { id: user.id },
            data: { nextPostAllowedAt },
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

  async update(userId: string, updatePostDto: Prisma.PostUpdateInput) {
    try {
      await this.prisma.post.update({
        where: { userId },
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

  async remove(userId: string) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { userId },
      });

      if (!post) {
        return;
      }

      if (post.postType === "IMAGE" && post.mediaUrl) {
        await this.cloudinary.deleteImage(
          `${CONSTANTS.ASSET_FOLDERS.POSTS}/${userId}`,
        );
      }

      if (
        (post.postType === "VIDEO" || post.postType === "AUDIO") &&
        post.mediaData?.asset_id
      ) {
        await this.mux.video.assets
          .delete(post.mediaData.asset_id)
          .catch(() => {
            // ignore
          });
      }

      await this.prisma.post.delete({
        where: { userId },
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

  canPost(user: User) {
    if (user.nextPostAllowedAt && user.nextPostAllowedAt > new Date()) {
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

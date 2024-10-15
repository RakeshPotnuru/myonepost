import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { CONSTANTS } from "src/common/constants";
import { MuxService } from "src/mux/mux.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
    private readonly mux: MuxService,
  ) {}

  async create(
    createPostDto: Omit<Prisma.PostCreateInput, "user">,
    user: User,
  ) {
    if (user.nextPostAllowedAt && user.nextPostAllowedAt > new Date()) {
      throw new HttpException(
        "Next post is not allowed yet",
        HttpStatus.FORBIDDEN,
      );
    }

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
    } catch {
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

      if (post.postType === "VIDEO" && post.mediaData.asset_id) {
        await this.mux.video.assets.delete(post.mediaData.asset_id);
      }

      await this.prisma.post.delete({
        where: { userId },
        select: { id: true },
      });

      return { success: true };
    } catch {
      throw new HttpException(
        "Something went wrong. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

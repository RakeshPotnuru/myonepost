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

  async createPost(
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

    await this.removePost(user.id);

    return (
      await this.prisma.$transaction(async (tx) => {
        // Create new post
        tx.post.create({
          data: {
            ...createPostDto,
            user: {
              connect: { id: user.id },
            },
          },
          select: { id: true },
        });

        // Update user's nextPostAllowedAt
        tx.user.update({
          where: { id: user.id },
          data: { nextPostAllowedAt },
          select: { id: true },
        });
      })
    )[1];
  }

  async updatePost(userId: string, updatePostDto: Prisma.PostUpdateInput) {
    this.prisma.post.update({
      where: { userId },
      data: updatePostDto,
    });
  }

  async removePost(userId: string) {
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

    if (post.postType === "VIDEO" && post.mediaUrl) {
      await this.mux.video.assets.delete(post.mediaUrl);
    }

    return await this.prisma.post.delete({
      where: { userId },
      select: { id: true },
    });
  }
}

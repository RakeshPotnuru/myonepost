import { Prisma, users } from "@1post/shared";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { NotificationService } from "src/notification/notification.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCommentDto } from "./dto";

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notify: NotificationService,
  ) {}

  async create(user: users, createCommentDto: CreateCommentDto) {
    const { text, postId } = createCommentDto;

    try {
      const { "1": post } = await this.prisma.$transaction([
        this.prisma.comments.create({
          data: {
            text,
            post: {
              connect: { id: postId },
            },
            user: {
              connect: { id: user.id },
            },
          },
          select: { id: true },
        }),
        this.prisma.posts.update({
          where: { id: postId },
          data: { comment_count: { increment: 1 } },
          select: { user_id: true },
        }),
      ]);

      if (post.user_id !== user.id) {
        let comment = text;
        if (comment.length > 50) {
          comment = text.slice(0, 50) + "...";
        }

        await this.notify.create(
          post.user_id,
          "NEW_COMMENT",
          `@${user.username} commented on your post: "${comment}"`,
        );
      }

      return { success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new HttpException(
            "You have already commented on this post",
            HttpStatus.CONFLICT,
          );
        }
        if (error.code === "P2016") {
          throw new HttpException("Post does not exist", HttpStatus.NOT_FOUND);
        }
      }

      throw new HttpException(
        "Something went wrong. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(postId: string, userId: string) {
    try {
      await this.prisma.$transaction([
        this.prisma.comments.delete({
          where: {
            user_id_post_id: {
              post_id: postId,
              user_id: userId,
            },
          },
          select: { id: true },
        }),
        this.prisma.posts.update({
          where: { id: postId },
          data: { comment_count: { decrement: 1 } },
          select: { id: true },
        }),
      ]);

      return { success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2016") {
          throw new HttpException(
            "Comment does not exist",
            HttpStatus.NOT_FOUND,
          );
        }
      }

      throw new HttpException(
        "Something went wrong. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

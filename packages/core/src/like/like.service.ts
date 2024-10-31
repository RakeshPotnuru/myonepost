import { Prisma, users } from "@1post/shared";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { NotificationService } from "src/notification/notification.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LikeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notify: NotificationService,
  ) {}

  async likePost(user: users, postId: string) {
    try {
      const { "1": post } = await this.prisma.$transaction([
        this.prisma.post_likes.create({
          data: {
            post: {
              connect: {
                id: postId,
              },
            },
            user: {
              connect: {
                id: user.id,
              },
            },
          },
          select: { id: true },
        }),
        this.prisma.posts.update({
          where: { id: postId },
          data: { like_count: { increment: 1 } },
          include: { user: { select: { id: true } } },
        }),
      ]);

      await this.notify.create(
        post.user.id,
        "NEW_POST_LIKE",
        `@${user.username} has liked your post`,
      );

      return { success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
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

  async unlikePost(userId: string, postId: string) {
    try {
      await this.prisma.$transaction([
        this.prisma.post_likes.delete({
          where: {
            user_id_post_id: {
              user_id: userId,
              post_id: postId,
            },
          },
        }),
        this.prisma.posts.update({
          where: { id: postId },
          data: { like_count: { decrement: 1 } },
          select: { id: true },
        }),
      ]);

      return { success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
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

  async likeComment(user: users, commentId: string) {
    try {
      const { "1": comment } = await this.prisma.$transaction([
        this.prisma.comment_likes.create({
          data: {
            comment: {
              connect: {
                id: commentId,
              },
            },
            user: {
              connect: {
                id: user.id,
              },
            },
          },
          select: { id: true },
        }),
        this.prisma.comments.update({
          where: { id: commentId },
          data: { like_count: { increment: 1 } },
          select: {
            text: true,
            user_id: true,
          },
        }),
      ]);

      if (comment.user_id !== user.id) {
        let commentText = comment.text;
        if (commentText.length > 50) {
          commentText = commentText.slice(0, 50) + "...";
        }

        await this.notify.create(
          comment.user_id,
          "NEW_COMMENT_LIKE",
          `@${user.username} has liked your comment: "${commentText}"`,
        );
      }

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

  async unlikeComment(userId: string, commentId: string) {
    try {
      await this.prisma.$transaction([
        this.prisma.comment_likes.delete({
          where: {
            user_id_comment_id: {
              user_id: userId,
              comment_id: commentId,
            },
          },
        }),
        this.prisma.comments.update({
          where: { id: commentId },
          data: { like_count: { decrement: 1 } },
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

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost(userId: string, postId: string) {
    try {
      await this.prisma.$transaction([
        this.prisma.postLike.create({
          data: {
            post: {
              connect: {
                id: postId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
          select: { id: true },
        }),
        this.prisma.post.update({
          where: { id: postId },
          data: { likeCount: { increment: 1 } },
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

  async unlikePost(userId: string, postId: string) {
    try {
      await this.prisma.$transaction([
        this.prisma.postLike.delete({
          where: {
            userId_postId: {
              userId,
              postId,
            },
          },
        }),
        this.prisma.post.update({
          where: { id: postId },
          data: { likeCount: { decrement: 1 } },
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

  async likeComment(userId: string, commentId: string) {
    try {
      await this.prisma.$transaction([
        this.prisma.commentLike.create({
          data: {
            comment: {
              connect: {
                id: commentId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
          select: { id: true },
        }),
        this.prisma.comment.update({
          where: { id: commentId },
          data: { likeCount: { increment: 1 } },
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

  async unlikeComment(userId: string, commentId: string) {
    try {
      await this.prisma.$transaction([
        this.prisma.commentLike.delete({
          where: {
            userId_commentId: {
              userId,
              commentId,
            },
          },
        }),
        this.prisma.comment.update({
          where: { id: commentId },
          data: { likeCount: { decrement: 1 } },
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

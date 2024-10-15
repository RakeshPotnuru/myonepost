import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCommentDto } from "./dto";

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createCommentDto: CreateCommentDto) {
    const { text, postId } = createCommentDto;

    try {
      return await this.prisma.$transaction([
        this.prisma.comment.create({
          data: {
            text,
            post: {
              connect: { id: postId },
            },
            user: {
              connect: { id: userId },
            },
          },
          select: { id: true },
        }),
        this.prisma.post.update({
          where: { id: postId },
          data: { commentCount: { increment: 1 } },
          select: { id: true },
        }),
      ])[0];
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
        this.prisma.comment.delete({
          where: {
            userId_postId: {
              postId,
              userId,
            },
          },
          select: { id: true },
        }),
        this.prisma.post.update({
          where: { id: postId },
          data: { commentCount: { decrement: 1 } },
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

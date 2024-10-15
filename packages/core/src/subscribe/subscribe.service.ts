import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SubscribeService {
  constructor(private readonly prisma: PrismaService) {}

  async subscribe(userId: string, subscribedToId: string) {
    try {
      await this.prisma.$transaction([
        this.prisma.subscriber.create({
          data: {
            subscribedTo: {
              connect: {
                id: subscribedToId,
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
        this.prisma.user.update({
          where: { id: subscribedToId },
          data: { subscriberCount: { increment: 1 } },
          select: { id: true },
        }),
        this.prisma.user.update({
          where: { id: userId },
          data: { subscriptionCount: { increment: 1 } },
          select: { id: true },
        }),
      ]);

      return { success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2016") {
          throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
        }
      }

      throw new HttpException(
        "Something went wrong. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async unsubscribe(userId: string, subscribedToId: string) {
    try {
      await this.prisma.$transaction([
        this.prisma.subscriber.delete({
          where: {
            userId_subscribedToId: {
              userId,
              subscribedToId,
            },
          },
          select: { id: true },
        }),
        this.prisma.user.update({
          where: { id: subscribedToId },
          data: { subscriberCount: { decrement: 1 } },
          select: { id: true },
        }),
        this.prisma.user.update({
          where: { id: userId },
          data: { subscriptionCount: { decrement: 1 } },
          select: { id: true },
        }),
      ]);

      return { success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2016") {
          throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
        }
      }

      throw new HttpException(
        "Something went wrong. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

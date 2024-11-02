import { Events, NotificationType, Prisma, users } from "@1post/shared";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SubscribeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async subscribe(user: users, subscribedToId: string) {
    try {
      await this.prisma.$transaction([
        this.prisma.subscribers.create({
          data: {
            subscribed_to: {
              connect: {
                id: subscribedToId,
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
        this.prisma.users.update({
          where: { id: subscribedToId },
          data: { subscriber_count: { increment: 1 } },
          select: { id: true },
        }),
        this.prisma.users.update({
          where: { id: user.id },
          data: { subscription_count: { increment: 1 } },
          select: { id: true },
        }),
      ]);

      this.eventEmitter.emit(Events.NOTIFICATION_CREATE, {
        userId: subscribedToId,
        type: NotificationType.NEW_SUBSCRIBER,
        content: `@${user.username} has subscribed to you`,
      });

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
        this.prisma.subscribers.delete({
          where: {
            user_id_subscribed_to_id: {
              user_id: userId,
              subscribed_to_id: subscribedToId,
            },
          },
          select: { id: true },
        }),
        this.prisma.users.update({
          where: { id: subscribedToId },
          data: { subscriber_count: { decrement: 1 } },
          select: { id: true },
        }),
        this.prisma.users.update({
          where: { id: userId },
          data: { subscription_count: { decrement: 1 } },
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

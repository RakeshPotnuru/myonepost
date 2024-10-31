import { CONSTANTS, NotificationType } from "@1post/shared";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, type: NotificationType, content: string) {
    try {
      await this.prisma.notification.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          type,
          content,
        },
      });
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  }

  async remove() {
    const cutoffDate = new Date(
      new Date().getTime() - CONSTANTS.NOTIFICATION_TTL,
    ); // last 7 days

    try {
      await this.prisma.notification.deleteMany({
        where: {
          createdAt: {
            lte: cutoffDate,
          },
        },
      });
    } catch (error) {
      console.error("Error deleting old notifications:", error);
    }
  }

  async markAsRead(notificationIds: string[], userId: string) {
    try {
      await this.prisma.notification.updateMany({
        where: {
          id: {
            in: notificationIds,
          },
          userId,
        },
        data: {
          isRead: true,
        },
      });

      return { success: true };
    } catch {
      throw new HttpException(
        "Something went wrong. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async get(userId: string) {
    try {
      const notifications = await this.prisma.notification.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return notifications;
    } catch (error) {
      console.error("Error getting notifications:", error);

      throw new HttpException(
        "Something went wrong. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

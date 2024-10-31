import { CONSTANTS, NotificationType } from "@1post/shared";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, type: NotificationType, content: string) {
    try {
      await this.prisma.notifications.create({
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
      await this.prisma.notifications.deleteMany({
        where: {
          created_at: {
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
      await this.prisma.notifications.updateMany({
        where: {
          id: {
            in: notificationIds,
          },
          user_id: userId,
        },
        data: {
          is_read: true,
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
}

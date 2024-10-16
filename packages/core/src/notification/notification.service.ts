import { Injectable } from "@nestjs/common";
import { CONSTANTS } from "src/common/constants";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

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
}

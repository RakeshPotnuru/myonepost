import { Body, Controller, Patch, UseGuards } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { UpdateNotificationDto } from "./dto";
import { NotificationService } from "./notification.service";

@ApiTags("Notification")
@Controller("notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  remove() {
    return this.notificationService.remove();
  }

  @ApiOperation({ summary: "Mark a notification as read" })
  @UseGuards(JwtGuard)
  @Patch()
  markAsRead(
    @GetUser("id") userId: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.markAsRead(
      updateNotificationDto.ids,
      userId,
    );
  }
}

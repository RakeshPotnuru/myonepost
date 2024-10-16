import { Controller } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { NotificationService } from "./notification.service";

@Controller("notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  remove() {
    return this.notificationService.remove();
  }
}

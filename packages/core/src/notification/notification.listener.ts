import { Events } from "@1post/shared";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { NotificationCreateEvent } from "./notification.events";
import { NotificationService } from "./notification.service";

@Injectable()
export class NotificationListener {
  constructor(private readonly notify: NotificationService) {}

  @OnEvent(Events.NOTIFICATION_CREATE)
  async handleNotify(payload: NotificationCreateEvent) {
    const { content, type, userId } = payload;

    await this.notify.create(userId, type, content);
  }
}

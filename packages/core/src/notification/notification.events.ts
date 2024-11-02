import { NotificationType } from "@1post/shared";

export class NotificationCreateEvent {
  userId: string;
  type: NotificationType;
  content: string;

  constructor(payload: {
    userId: string;
    type: NotificationType;
    content: string;
  }) {
    this.userId = payload.userId;
    this.type = payload.type;
    this.content = payload.content;
  }
}

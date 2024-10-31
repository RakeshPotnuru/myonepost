import type { Notification } from "@1post/shared";

interface NotificationCardProps extends Notification {}

export default function NotificationCard({ content }: NotificationCardProps) {
  return <div>{content}</div>;
}

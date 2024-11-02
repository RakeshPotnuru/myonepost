import { Global, Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { NotificationListener } from "./notification.listener";

@Global()
@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationListener],
})
export class NotificationModule {}

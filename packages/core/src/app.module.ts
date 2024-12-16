import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { JwtStrategy } from "./auth/strategy";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { CommentModule } from "./comment/comment.module";
import { validationSchema } from "./env.validation";
import { FeedModule } from "./feed/feed.module";
import { GoogleModule } from "./google/google.module";
import { LikeModule } from "./like/like.module";
import { MuxModule } from "./mux/mux.module";
import { NotificationModule } from "./notification/notification.module";
import { PostModule } from "./post/post.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ReportModule } from "./report/report.module";
import { ReportService } from "./report/report.service";
import { SubscribeModule } from "./subscribe/subscribe.module";
import { UserModule } from "./user/user.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validationSchema.parse,
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    PrismaModule,
    UserModule,
    CloudinaryModule,
    FeedModule,
    PostModule,
    MuxModule,
    CommentModule,
    SubscribeModule,
    LikeModule,
    NotificationModule,
    ReportModule,
    GoogleModule,
    HealthModule,
  ],
  providers: [JwtStrategy, ReportService],
})
export class AppModule {}

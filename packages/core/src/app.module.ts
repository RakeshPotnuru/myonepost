import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { JwtStrategy } from "./auth/strategy";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { CommentModule } from "./comment/comment.module";
import { validationSchema } from "./env.validation";
import { FeedModule } from "./feed/feed.module";
import { LikeModule } from "./like/like.module";
import { MuxModule } from "./mux/mux.module";
import { PostModule } from "./post/post.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SubscribeModule } from "./subscribe/subscribe.module";
import { UserModule } from "./user/user.module";
import { NotificationModule } from "./notification/notification.module";
import { ReportService } from "./report/report.service";
import { ReportModule } from "./report/report.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validationSchema.parse,
    }),
    ScheduleModule.forRoot(),
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
  ],
  providers: [JwtStrategy, ReportService],
})
export class AppModule {}

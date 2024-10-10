import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { JwtStrategy } from "./auth/strategy";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { validationSchema } from "./env.validation";
import { FeedModule } from "./feed/feed.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    UserModule,
    CloudinaryModule,
    FeedModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}

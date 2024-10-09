import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "./auth/strategy";
import { validationSchema } from "./env.validation";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema,
    }),
    PrismaModule,
    UserModule,
    CloudinaryModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}

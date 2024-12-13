import { Module } from "@nestjs/common";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { GoogleModule } from "src/google/google.module";
import { MuxModule } from "src/mux/mux.module";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [CloudinaryModule, MuxModule, GoogleModule],
})
export class PostModule {}

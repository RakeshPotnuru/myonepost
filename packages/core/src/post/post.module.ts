import { Module } from "@nestjs/common";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { GoogleNlpModule } from "src/google-nlp/google-nlp.module";
import { MuxModule } from "src/mux/mux.module";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [CloudinaryModule, MuxModule, GoogleNlpModule],
})
export class PostModule {}

import { HeadersLike } from "@mux/mux-node/core";
import { UnwrapWebhookEvent } from "@mux/mux-node/resources";
import {
  Body,
  Controller,
  Delete,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  RawBody,
  UploadedFile,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { CONSTANTS } from "src/common/constants";
import { ApiFileUpload } from "src/common/decorator";
import { Env } from "src/env.validation";
import { MuxService } from "src/mux/mux.service";
import {
  CreateImagePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
} from "./dto";
import { imagePostValidators } from "./imagePostValidators";
import { PostService } from "./post.service";

@ApiTags("Post")
@Controller("post")
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly cloudinary: CloudinaryService,
    private readonly mux: MuxService,
    private readonly config: ConfigService<Env>,
  ) {}

  @ApiOperation({ summary: "Create a text post" })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  @Post("text")
  createTextPost(
    @GetUser() user: User,
    @Body() createTextPostDto: CreateTextPostDto,
  ) {
    return this.postService.createPost(
      {
        postType: "TEXT",
        text: createTextPostDto.text,
        status: "APPROVED",
      },
      user,
    );
  }

  @ApiOperation({ summary: "Create an image post" })
  @HttpCode(HttpStatus.CREATED)
  @ApiFileUpload({
    allowedTypes: ["image/png", "image/jpeg", "images/jpg", "image/gif"],
  })
  @ApiBody({
    type: CreateImagePostDto,
  })
  @UseGuards(JwtGuard)
  @Post("image")
  async createImagePost(
    @GetUser() user: User,
    @Body() createImagePostDto: CreateImagePostDto,
    @UploadedFile(imagePostValidators)
    file: Express.Multer.File,
  ) {
    const result = await this.cloudinary.uploadImage(
      file,
      CONSTANTS.ASSET_FOLDERS.POSTS,
      user.id,
    );

    const mediaUrl = result.secure_url;

    return await this.postService.createPost(
      {
        postType: "IMAGE",
        mediaUrl,
        mediaCaption: createImagePostDto.mediaCaption,
        status: "APPROVED",
      },
      user,
    );
  }

  @ApiOperation({ summary: "Create mux upload url" })
  @UseGuards(JwtGuard)
  @Post("video")
  async createVideoPost(
    @GetUser() user: User,
    @Body() createVideoPostDto: CreateVideoPostDto,
  ) {
    const { url } = await this.mux.video.uploads.create({
      cors_origin:
        this.config.get<Env["NODE_ENV"]>("NODE_ENV") === "development"
          ? "*"
          : this.config.get<string>("CLIENT_URL"),
      new_asset_settings: {
        playback_policy: ["public"],
        encoding_tier: "baseline",
        passthrough: user.id,
      },
    });

    await this.postService.createPost(
      {
        postType: "VIDEO",
        status: "PENDING",
        mediaCaption: createVideoPostDto.mediaCaption,
      },
      user,
    );
    return { url };
  }

  @Post("mux-webhook")
  async muxWebhook(@RawBody() body: string, @Headers() headers: HeadersLike) {
    try {
      this.mux.webhooks.verifySignature(
        body,
        headers,
        this.config.get("MUX_WEBHOOK_SECRET"),
      );
    } catch {
      throw new HttpException("Invalid signature", HttpStatus.FORBIDDEN);
    }

    const { type: eventType, data: eventData } =
      body as unknown as UnwrapWebhookEvent;

    if (eventType === "video.asset.ready") {
      console.log("Video asset ready", eventData);

      await this.postService.updatePost(eventData.passthrough, {
        status: "APPROVED",
        mediaUrl: eventData.playback_ids[0].id,
      });
    }

    return { success: true };
  }

  @ApiOperation({ summary: "Delete current user post" })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  @Delete()
  remove(@GetUser("id") userId: string) {
    return this.postService.removePost(userId);
  }
}

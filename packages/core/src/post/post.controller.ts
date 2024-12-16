import { CONSTANTS, Events, users } from "@1post/shared";
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
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { ApiFileUpload } from "src/common/decorator";
import { Env } from "src/env.validation";
import { GoogleService } from "src/google/google.service";
import { MuxService } from "src/mux/mux.service";
import {
  CreateAudioPostDto,
  CreateImagePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
} from "./dto";
import { imagePostValidators } from "./imagePostValidators";
import { PostCheckEvent } from "./post.events";
import { PostService } from "./post.service";

@ApiTags("Post")
@Controller("post")
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly cloudinary: CloudinaryService,
    private readonly mux: MuxService,
    private readonly config: ConfigService<Env>,
    private readonly google: GoogleService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @ApiOperation({ summary: "Create a text post" })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  @Post("text")
  async createTextPost(
    @GetUser() user: users,
    @Body() createTextPostDto: CreateTextPostDto,
  ) {
    this.postService.canPost(user);

    const isTextSafe = await this.google.isTextSafe(createTextPostDto.text);

    return this.postService.create(
      {
        post_type: "TEXT",
        text: createTextPostDto.text,
        status: isTextSafe ? "APPROVED" : "FLAGGED",
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
    @GetUser() user: users,
    @Body() createImagePostDto: CreateImagePostDto,
    @UploadedFile(imagePostValidators)
    file: Express.Multer.File,
  ) {
    this.postService.canPost(user);

    const result = await this.cloudinary.uploadImage(
      file,
      CONSTANTS.ASSET_FOLDERS.POSTS,
      user.id,
    );

    const mediaUrl = result.secure_url;

    const isImageSafe = await this.google.isImageSafe(mediaUrl);
    const caption = createImagePostDto.mediaCaption;

    const isCaptionSafe = caption
      ? await this.google.isTextSafe(caption)
      : true;

    return await this.postService.create(
      {
        post_type: "IMAGE",
        media_url: mediaUrl,
        media_caption: caption,
        status: isImageSafe && isCaptionSafe ? "APPROVED" : "FLAGGED",
      },
      user,
    );
  }

  @ApiOperation({ summary: "Create upload url" })
  @UseGuards(JwtGuard)
  @Post("upload")
  async createUploadUrl(@GetUser() user: users) {
    const url = await this.google.getUploadSignedUrl(`${user.id}.mp4`);

    return { url };
  }

  @ApiOperation({ summary: "Create a video post" })
  @UseGuards(JwtGuard)
  @Post("video")
  async createVideoPost(
    @GetUser() user: users,
    @Body() createVideoPostDto: CreateVideoPostDto,
  ) {
    this.postService.canPost(user);

    await this.postService.createAsset(
      user.id,
      `https://storage.googleapis.com/${this.config.get("GCS_BUCKET_NAME")}/${user.id}.mp4`,
    );

    return await this.postService.create(
      {
        post_type: "VIDEO",
        status: "PENDING",
        media_caption: createVideoPostDto.mediaCaption,
      },
      user,
    );
  }

  // TODO: moderate
  @ApiOperation({ summary: "Create a audio post" })
  @UseGuards(JwtGuard)
  @Post("audio")
  async createAudioPost(
    @GetUser() user: users,
    @Body() createAudioPostDto: CreateAudioPostDto,
  ) {
    this.postService.canPost(user);

    await this.postService.createAsset(
      user.id,
      `https://storage.googleapis.com/${this.config.get("GCS_BUCKET_NAME")}/${user.id}.mp4`,
    );

    return await this.postService.create(
      {
        post_type: "AUDIO",
        status: "PENDING",
        media_caption: createAudioPostDto.mediaCaption,
      },
      user,
    );
  }

  @ApiOperation({ summary: "Mux webhook" })
  @HttpCode(HttpStatus.OK)
  @Post("mux-webhook")
  async muxWebhook(
    @RawBody() rawBody: string,
    @Body() body: string,
    @Headers() headers: HeadersLike,
  ) {
    try {
      this.mux.webhooks.verifySignature(
        rawBody.toString(),
        headers,
        this.config.get("MUX_WEBHOOK_SECRET"),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }

    const { type: eventType, data: eventData } =
      body as unknown as UnwrapWebhookEvent;

    if (eventType === "video.asset.ready") {
      this.eventEmitter.emit(
        Events.VIDEO_CHECK,
        new PostCheckEvent({
          userId: eventData.passthrough,
          playbackId: eventData.playback_ids[0].id,
          assetId: eventData.id,
        }),
      );
    }

    return { success: true };
  }

  @ApiOperation({ summary: "Delete current user post including related media" })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  @Delete()
  remove(@GetUser("id") userId: string) {
    return this.postService.remove(userId);
  }
}

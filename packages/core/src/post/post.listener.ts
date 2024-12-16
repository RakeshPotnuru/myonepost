import { Events } from "@1post/shared";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { PostCheckEvent } from "./post.events";
import { PostService } from "./post.service";

@Injectable()
export class PostListener {
  constructor(private readonly postService: PostService) {}

  @OnEvent(Events.VIDEO_CHECK)
  async handleNotify(payload: PostCheckEvent) {
    const { userId, assetId, playbackId } = payload;

    await this.postService.checkVideo(userId, playbackId, assetId);
  }
}

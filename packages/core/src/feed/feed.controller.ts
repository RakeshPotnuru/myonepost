import { CONSTANTS } from "@1post/shared";
import { Controller } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { FeedService } from "./feed.service";

@Controller()
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async updatePostsScore() {
    const posts = await this.feedService.getPosts();

    for (const post of posts) {
      const engagementScore =
        post.like_count * CONSTANTS.WEIGHTS.LIKE +
        post.comment_count * CONSTANTS.WEIGHTS.COMMENT;

      const postTypeMultiplier =
        CONSTANTS.WEIGHTS.POST_TYPE_MULTIPLIER[post.post_type];

      const hoursSinceCreation = Math.floor(
        (new Date().getTime() - post.created_at.getTime()) / (60 * 60 * 1000),
      );

      const timeScore =
        1 / (1 + CONSTANTS.WEIGHTS.TIME_DECAY_FACTOR * hoursSinceCreation);

      const totalScore = engagementScore * postTypeMultiplier * timeScore;

      await this.feedService.updatePostScore(post.id, totalScore);
    }
  }
}

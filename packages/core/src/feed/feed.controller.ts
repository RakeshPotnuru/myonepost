import { Controller } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { CONSTANTS } from "src/common/constants";
import { FeedService } from "./feed.service";

@Controller()
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async updateTrendingScores() {
    const posts = await this.feedService.getPosts();

    for (const post of posts) {
      const score =
        post.likeCount * CONSTANTS.WEIGHTS.LIKE +
        post.commentCount * CONSTANTS.WEIGHTS.COMMENT;
      const postTypeMultiplier =
        CONSTANTS.WEIGHTS.POST_TYPE_MULTIPLIER[post.postType];
      const trendingScore = score * postTypeMultiplier;

      await this.feedService.updateTrendingScore(post.id, trendingScore);
    }
  }
}

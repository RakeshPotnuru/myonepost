import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FeedService {
  constructor(private readonly prisma: PrismaService) {}

  async getPosts() {
    const cutoffDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000); // Last 24 hours

    try {
      return await this.prisma.posts.findMany({
        where: {
          status: "APPROVED",
          created_at: {
            gte: cutoffDate,
          },
        },
        select: {
          id: true,
          like_count: true,
          comment_count: true,
          post_type: true,
          created_at: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updatePostScore(postId: string, score: number) {
    try {
      await this.prisma.post_scores.upsert({
        where: { post_id: postId },
        update: { score },
        create: { post_id: postId, score },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FeedService {
  constructor(private readonly prisma: PrismaService) {}

  async getPosts() {
    const cutoffDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000); // Last 24 hours

    try {
      return await this.prisma.post.findMany({
        where: {
          status: "APPROVED",
          createdAt: {
            gte: cutoffDate,
          },
        },
        select: {
          id: true,
          likeCount: true,
          commentCount: true,
          postType: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updatePostScore(postId: string, score: number) {
    try {
      await this.prisma.postScore.upsert({
        where: { postId },
        update: { score },
        create: { postId, score },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

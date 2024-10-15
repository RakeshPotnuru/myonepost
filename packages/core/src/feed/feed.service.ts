import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FeedService {
  constructor(private readonly prisma: PrismaService) {}

  async getPosts() {
    const cutoffDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000); // Last 24 hours

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
  }

  async updatePostScore(postId: string, score: number) {
    await this.prisma.postScore.upsert({
      where: { postId },
      update: { score },
      create: { postId, score },
    });
  }
}

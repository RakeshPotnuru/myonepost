import type { Post, Prisma} from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export default class PostService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return await this.prisma.post.create({ data });
  }
}

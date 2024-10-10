import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getPage(username: string, isAuthenticated: boolean, userId?: string) {
    const page = await this.prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        post: true,
      },
    });

    if (!page) {
      throw new HttpException("Page not found", HttpStatus.NOT_FOUND);
    }

    // If the page is private and the user is not authenticated
    if (page.isPrivate && !isAuthenticated && page.post.status !== "APPROVED") {
      throw new HttpException("Page not found", HttpStatus.NOT_FOUND);
    }

    // If not the owner and the post is not approved
    if (userId !== page.id && page.post.status !== "APPROVED") {
      page.post = null;
    }

    return page;
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        if (error.code === "P2002") {
          throw new HttpException(
            "Username already taken",
            HttpStatus.CONFLICT,
          );
        }
      }

      throw error;
    }
  }
}

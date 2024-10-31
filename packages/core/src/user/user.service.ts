import { Prisma, User } from "@1post/shared";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    delete user.email;

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getPage(username: string, user: User) {
    const page = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        username: true,
        displayName: true,
        bio: true,
        avatarUrl: true,
        url: true,
        subscriberCount: true,
        email: user.username === username,
        isPrivate: true,
        nextPostAllowedAt: user.username === username,
        post: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            postType: true,
            text: true,
            mediaUrl: true,
            mediaCaption: true,
            commentCount: true,
            likeCount: true,
            status: user.username === username,
          },
          where: {
            OR: [
              { status: "APPROVED" },
              {
                userId: user.id,
              },
            ],
          },
        },
      },
    });

    if (!page || (page.isPrivate && !user)) {
      throw new HttpException("Page not found", HttpStatus.NOT_FOUND);
    }

    if (user.username !== username) delete page.isPrivate;

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

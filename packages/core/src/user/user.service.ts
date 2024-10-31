import { Prisma, users } from "@1post/shared";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async me(userId: string) {
    const user = await this.prisma.users.findUnique({
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

  async getPage(username: string, user: users) {
    const page = await this.prisma.users.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        created_at: true,
        updated_at: true,
        username: true,
        display_name: true,
        bio: true,
        avatar_url: true,
        url: true,
        subscriber_count: true,
        email: user.username === username,
        is_private: true,
        next_post_allowed_at: user.username === username,
        post: {
          select: {
            id: true,
            created_at: true,
            updated_at: true,
            post_type: true,
            text: true,
            media_url: true,
            media_caption: true,
            comment_count: true,
            like_count: true,
            status: user.username === username,
          },
          where: {
            OR: [
              { status: "APPROVED" },
              {
                user_id: user.id,
              },
            ],
          },
        },
      },
    });

    if (!page || (page.is_private && !user)) {
      throw new HttpException("Page not found", HttpStatus.NOT_FOUND);
    }

    if (user.username !== username) delete page.is_private;

    return page;
  }

  async update(id: string, updateUserDto: Prisma.usersUpdateInput) {
    try {
      return await this.prisma.users.update({
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

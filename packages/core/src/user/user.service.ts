import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getPage(username: string, isAuthenticated: boolean) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.isPrivate && !isAuthenticated) {
      throw new NotFoundException("User not found");
    }

    return user;
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
          throw new NotFoundException("User not found");
        }
        if (error.code === "P2002") {
          throw new ForbiddenException("Username already exists");
        }
      }

      throw error;
    }
  }
}

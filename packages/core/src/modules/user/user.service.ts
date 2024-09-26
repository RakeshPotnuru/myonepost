import type { Prisma} from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class UserService {
  async createUser(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data });
  }
}

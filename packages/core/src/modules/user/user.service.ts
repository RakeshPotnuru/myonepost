import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class UserService {
  async listUsers() {
    return await prisma.profile.findMany();
  }
}

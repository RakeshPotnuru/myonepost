import { Prisma } from "@1post/shared";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReportDto: Prisma.reportsCreateInput) {
    try {
      await this.prisma.reports.create({
        data: createReportDto,
        select: { id: true },
      });
      return { success: true };
    } catch (err) {
      console.log(err);

      throw new HttpException(
        "Something went wrong. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

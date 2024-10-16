import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReportDto: Prisma.ReportCreateInput) {
    try {
      await this.prisma.report.create({
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

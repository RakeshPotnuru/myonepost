import { PrismaClient } from "@1post/shared";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient {}

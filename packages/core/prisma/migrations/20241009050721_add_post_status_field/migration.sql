-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'PENDING';

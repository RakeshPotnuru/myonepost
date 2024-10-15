/*
  Warnings:

  - You are about to alter the column `media_caption` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "media_caption" SET DATA TYPE VARCHAR(150);

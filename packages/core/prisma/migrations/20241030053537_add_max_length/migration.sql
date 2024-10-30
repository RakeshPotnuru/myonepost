/*
  Warnings:

  - You are about to alter the column `description` on the `reports` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(280)`.

*/
-- AlterTable
ALTER TABLE "reports" ALTER COLUMN "description" SET DATA TYPE VARCHAR(280);

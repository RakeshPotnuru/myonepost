/*
  Warnings:

  - You are about to drop the `subscribed_scores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trending_scores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "subscribed_scores" DROP CONSTRAINT "subscribed_scores_post_id_fkey";

-- DropForeignKey
ALTER TABLE "trending_scores" DROP CONSTRAINT "trending_scores_post_id_fkey";

-- DropTable
DROP TABLE "subscribed_scores";

-- DropTable
DROP TABLE "trending_scores";

-- CreateTable
CREATE TABLE "post_scores" (
    "id" UUID NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "post_id" UUID NOT NULL,

    CONSTRAINT "post_scores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_scores_post_id_key" ON "post_scores"("post_id");

-- CreateIndex
CREATE INDEX "post_scores_post_id_idx" ON "post_scores"("post_id");

-- AddForeignKey
ALTER TABLE "post_scores" ADD CONSTRAINT "post_scores_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "trending_scores" (
    "id" UUID NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "post_id" UUID NOT NULL,

    CONSTRAINT "trending_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscribed_scores" (
    "id" UUID NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "user_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,

    CONSTRAINT "subscribed_scores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trending_scores_post_id_key" ON "trending_scores"("post_id");

-- CreateIndex
CREATE INDEX "trending_scores_post_id_idx" ON "trending_scores"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscribed_scores_post_id_key" ON "subscribed_scores"("post_id");

-- CreateIndex
CREATE INDEX "subscribed_scores_user_id_post_id_idx" ON "subscribed_scores"("user_id", "post_id");

-- AddForeignKey
ALTER TABLE "trending_scores" ADD CONSTRAINT "trending_scores_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscribed_scores" ADD CONSTRAINT "subscribed_scores_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

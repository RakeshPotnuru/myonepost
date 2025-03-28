-- CreateTable
CREATE TABLE "archives" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL,
    "post_type" "PostType" NOT NULL DEFAULT 'TEXT',
    "text" VARCHAR(4000),
    "media_url" TEXT,
    "media_data" JSONB,
    "media_caption" VARCHAR(150),
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "user_id" UUID NOT NULL,

    CONSTRAINT "archives_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "archives" ADD CONSTRAINT "archives_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

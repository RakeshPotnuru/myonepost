import { CONSTANTS } from "@1post/shared";
import { LanguageServiceClient, protos } from "@google-cloud/language";
import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";
import { v1, protos as videoProtos } from "@google-cloud/video-intelligence";
import { ImageAnnotatorClient } from "@google-cloud/vision";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Env } from "src/env.validation";

@Injectable()
export class GoogleService {
  private readonly languageServiceClient: LanguageServiceClient;
  private readonly imageAnnotatorClient: ImageAnnotatorClient;
  private readonly videoIntelligenceServiceClient: v1.VideoIntelligenceServiceClient;
  private readonly storage: Storage;

  constructor(private readonly config: ConfigService<Env>) {
    this.languageServiceClient = new LanguageServiceClient();
    this.imageAnnotatorClient = new ImageAnnotatorClient();
    this.videoIntelligenceServiceClient =
      new v1.VideoIntelligenceServiceClient();
    this.storage = new Storage({
      credentials: {
        project_id: config.get("GC_PROJECT_ID"),
        private_key_id: config.get("GC_PRIVATE_KEY_ID"),
        private_key: config.get("GC_PRIVATE_KEY"),
        client_email: config.get("GC_CLIENT_EMAIL"),
        client_id: config.get("GC_CLIENT_ID"),
      },
    });
  }

  async isTextSafe(text: string) {
    const document: protos.google.cloud.language.v1.IModerateTextRequest["document"] =
      {
        content: text,
        type: "PLAIN_TEXT",
      };

    const [result] = await this.languageServiceClient.moderateText({
      document,
    });

    return result.moderationCategories?.every(
      (category) =>
        (category.confidence ?? 0) < CONSTANTS.POST.MODERATION_THRESHOLD.TEXT,
    );
  }

  async isImageSafe(imageUrl: string) {
    const [result] =
      await this.imageAnnotatorClient.safeSearchDetection(imageUrl);

    return Object.values(result.safeSearchAnnotation).every(
      (category) =>
        !CONSTANTS.POST.MODERATION_THRESHOLD.IMAGE.includes(category),
    );
  }

  async isVideoSafe(videoUrl: string, fileName: string) {
    const request: videoProtos.google.cloud.videointelligence.v1.IAnnotateVideoRequest =
      {
        inputUri: videoUrl,
        features: [
          "EXPLICIT_CONTENT_DETECTION" as unknown as videoProtos.google.cloud.videointelligence.v1.Feature,
        ],
      };

    const [operation] =
      await this.videoIntelligenceServiceClient.annotateVideo(request);
    const [result] = await operation.promise();

    await this.storage
      .bucket(this.config.get("GCS_BUCKET_NAME"))
      .file(fileName)
      .delete();

    const explicitContentResults =
      result.annotationResults[0].explicitAnnotation;

    return explicitContentResults.frames.every(
      (result) =>
        (result.pornographyLikelihood as number) <
        CONSTANTS.POST.MODERATION_THRESHOLD.VIDEO,
    );
  }

  async getUploadSignedUrl(fileName: string) {
    const options: GetSignedUrlConfig = {
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: "application/octet-stream",
    };

    await this.storage
      .bucket(this.config.get("GCS_BUCKET_NAME"))
      .setCorsConfiguration([
        {
          maxAgeSeconds: 3600,
          method: ["GET", "POST", "PUT", "OPTIONS"],
          origin: [this.config.get("CLIENT_URL")],
          responseHeader: ["Content-Type", "Access-Control-Allow-Origin"],
        },
      ]);

    const [url] = await this.storage
      .bucket(this.config.get("GCS_BUCKET_NAME"))
      .file(fileName)
      .getSignedUrl(options);

    return url;
  }
}

import { CONSTANTS } from "@1post/shared";
import { LanguageServiceClient, protos } from "@google-cloud/language";
import { ImageAnnotatorClient } from "@google-cloud/vision";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleService {
  private readonly languageServiceClient: LanguageServiceClient;
  private readonly imageAnnotatorClient: ImageAnnotatorClient;

  constructor() {
    this.languageServiceClient = new LanguageServiceClient();
    this.imageAnnotatorClient = new ImageAnnotatorClient();
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

  async isImageSafe(image: string) {
    const [result] = await this.imageAnnotatorClient.safeSearchDetection(image);

    console.log(result);
    return Object.values(result.safeSearchAnnotation).every(
      (category) =>
        !CONSTANTS.POST.MODERATION_THRESHOLD.IMAGE.includes(category),
    );
  }
}

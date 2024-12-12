import { CONSTANTS } from "@1post/shared";
import { LanguageServiceClient, protos } from "@google-cloud/language";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleNlpService {
  private languageServiceClient: LanguageServiceClient;

  constructor() {
    this.languageServiceClient = new LanguageServiceClient();
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
    console.log(result);

    return result.moderationCategories?.every(
      (category) =>
        (category.confidence ?? 0) < CONSTANTS.POST.MODERATION_THRESHOLD,
    );
  }
}

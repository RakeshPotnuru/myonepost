import type { protos } from "@google-cloud/language";
import { LanguageServiceClient } from "@google-cloud/language";
import type { Request, Response } from "express";

import PostService from "./post.service";

export default class PostController extends PostService {
  private static async isTextSafe(text: string) {
    const client = new LanguageServiceClient({
      projectId: "my-one-post",
    });

    const document: protos.google.cloud.language.v1.IModerateTextRequest["document"] =
      {
        content: text,
        type: "PLAIN_TEXT",
      };

    const [result] = await client.moderateText({ document });

    console.log(result);

    return result.moderationCategories?.every(
      (category) => (category.confidence ?? 0) < 0.5,
    );
  }

  createTestPostHandler = async (req: Request, res: Response) => {
    try {
      // filter text, if not safe trice, then block posting for one day
      //   const post = await this.createPost(req.body);
      //   const post = req.body;
      const result = await PostController.isTextSafe(
        "click this link to win a free car",
      );
      console.log(result);

      if (!result) {
        return res.status(400).json({
          error:
            "Your input contains content that may violate safety guidelines. Please review and modify.",
        });
      }

      return res.status(201).json(result);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: "Error creating post" });
    }
  };
}

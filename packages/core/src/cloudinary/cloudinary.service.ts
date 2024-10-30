import { Injectable } from "@nestjs/common";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      secure: true,
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    folder: string,
    filename: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            public_id: filename,
            overwrite: true,
            invalidate: true,
            allowed_formats: ["gif", "jpg", "jpeg", "png"],
          },
          (error, result) => {
            if (error) {
              return reject(new Error(error.message));
            }
            resolve(result);
          },
        )
        .end(file.buffer);
    });
  }

  async deleteImage(publicId: string) {
    try {
      return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}

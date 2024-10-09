import * as Joi from "joi";

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test", "provision")
    .default("development"),
  PORT: Joi.number().port().default(4000),
  DATABASE_URL: Joi.string().required(),
  DIRECT_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  CLOUDINARY_URL: Joi.string().required(),
});

import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { Env } from "./env.validation";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  const configService = app.get(ConfigService<Env>);

  app.enableCors({
    origin:
      configService.get<Env["NODE_ENV"]>("NODE_ENV") === "production"
        ? configService.get("CLIENT_URL")
        : "*",
    credentials:
      configService.get<Env["NODE_ENV"]>("NODE_ENV") === "production",
  });

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  if (configService.get<Env["NODE_ENV"]>("NODE_ENV") !== "production") {
    const config = new DocumentBuilder()
      .setTitle("My One Post")
      .setDescription("")
      .setVersion("1.0")
      .addBearerAuth()
      .addSecurityRequirements("bearer")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document, {
      customCss: ".swagger-ui .topbar { background-color: #2563EB; }",
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  const port = configService.get<number>("PORT");
  await app.listen(port);
  console.log(`✅ Application is running on: ${await app.getUrl()}`);
}
bootstrap();

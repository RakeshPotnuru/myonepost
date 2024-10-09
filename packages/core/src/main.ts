import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const configService = app.get(ConfigService);

  if (configService.get<string>("NODE_ENV") !== "production") {
    const config = new DocumentBuilder()
      .setTitle("My One Post")
      .setDescription("")
      .setVersion("1.0")
      .addTag("1post")
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

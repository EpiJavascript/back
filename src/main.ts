import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import AppModule from './app.module';

function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('EpiJavascript')
    .setDescription('EpiJavascript API description')
    .setVersion('1.0')
    .addBearerAuth({
      description: 'Standard Authorization header using the Bearer scheme. Example: "bearer {token}"',
      in: 'header',
      name: 'Authorization',
      type: 'apiKey',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('api');
  initSwagger(app);
  await app.listen(process.env.PORT ? process.env.PORT : 3001);
}
void bootstrap();

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('EpiJavascript')
    .setDescription('EpiJavascript API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  initSwagger(app);
  await app.listen(process.env.PORT ? process.env.PORT : 3001);
}
bootstrap();

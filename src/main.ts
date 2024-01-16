import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = 3005;
  // app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });
  const config = new DocumentBuilder()
    .setTitle('API-Starter')
    .setDescription('Remember to change this')
    .setVersion('1.0')
    .addTag('starter')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '.', 'public'));
  app.setBaseViewsDir(join(__dirname, '.', 'views'));
  app.setViewEngine('hbs');

  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}
void bootstrap();

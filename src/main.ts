import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('api');
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}
void bootstrap();

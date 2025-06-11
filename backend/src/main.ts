import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  // Enable CORS here
  app.enableCors({
    origin: 'http://localhost:5173', // Or '*' during development
    credentials: true,               // If using cookies or auth headers
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

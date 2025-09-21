import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // Nếu có PORT trong env thì dùng, không thì fallback về 3000
  const port = process.env.PORT || 3000;
  await app.listen(port);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  console.log(`🚀 Server is running on http://localhost:${port}`);
}
bootstrap();
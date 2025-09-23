import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.enableCors({
    origin: [
      "http://localhost:5173",          // dev local
      "https://fe-e-vercel-w9x1.vercel.app/"  // FE deploy
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();

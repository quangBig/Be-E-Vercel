import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Để upload payload lớn (nếu cần)
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // 🚀 Fix CORS cho frontend
  app.enableCors({
    origin: [
      "http://localhost:5173",                  // local dev
      "https://fe-e-vercel.vercel.app",         // FE deploy domain
      "https://fe-e-vercel-mltc150en-quangbigs-projects.vercel.app" // fallback FE domain
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Server is running on http://localhost:${port}`);
}
bootstrap();

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get()
  getRoot() {
    return { message: '🚀 NestJS API is running on Vercel!' };
  }
  @Get('ping')
  ping() {
    return { message: 'pong' };
  }
}

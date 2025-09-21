import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PagesModule } from './page-home/page.module';
import { PageProductsModule } from './page-products/page-products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URI as string,
    ),
    UsersModule,
    AuthModule,
    ProductsModule,
    PagesModule,
    PageProductsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

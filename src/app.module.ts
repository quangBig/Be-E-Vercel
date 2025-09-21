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
import { CloudinaryModule } from './products/cloudinary/cloudinary.module';
import { UploadModule } from './upload/upload.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/oder.module';

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
    PageProductsModule,
    CloudinaryModule,
    // UploadModule,
    CartModule,
    OrderModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

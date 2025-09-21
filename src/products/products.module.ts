import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/products.schema';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
    imports: [
        MulterModule.register({}),
        CloudinaryModule,
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule { }

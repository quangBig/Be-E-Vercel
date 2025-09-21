import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PageProducts, PageProductsSchema } from "./schemas/page-products.schema";
import { PageProductsController } from "./page-products.controller";
import { PageProductsService } from "./page-products.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: PageProducts.name, schema: PageProductsSchema }])],
    controllers: [PageProductsController],
    providers: [PageProductsService],
})
export class PageProductsModule { }
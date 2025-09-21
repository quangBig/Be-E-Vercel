import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Page, PageSchema } from "./schemas/page.schema";
import { PagesController } from "./page.controller";
import { PagesService } from "./page.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }])],
    controllers: [PagesController],
    providers: [PagesService],
})
export class PagesModule { }
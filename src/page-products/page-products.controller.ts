import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    Query,
} from "@nestjs/common";
import { PageProductsService } from "./page-products.service";
import { CreatePageProductDto } from "./dto/create-page-products.dto";

@Controller("page-products")
export class PageProductsController {
    constructor(private readonly pageProductsService: PageProductsService) { }

    @Post()
    create(@Body() dto: CreatePageProductDto) {
        return this.pageProductsService.create(dto);
    }

    @Get()
    findAll() {
        return this.pageProductsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.pageProductsService.findOne(id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() dto: CreatePageProductDto) {
        return this.pageProductsService.update(id, dto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.pageProductsService.remove(id);
    }

    // ---------------- Banner ----------------

    @Post(":id/banner")
    addBanner(
        @Param("id") id: string,
        @Body() bannerData: { bannerVideo?: any; bannerContent?: any }
    ) {
        return this.pageProductsService.addBanner(id, bannerData);
    }

    // thay vì gọi updateBanner
    @Patch(':id/banner/:bannerIndex')
    async updateBannerContent(
        @Param('id') id: string,
        @Param('bannerIndex') bannerIndex: number,
        @Body() updateData: any
    ) {
        return this.pageProductsService.updateBannerContent(id, bannerIndex, updateData);
    }

    // thay vì gọi removeBanner
    @Delete(':id/banner/:bannerIndex')
    async removeBannerContent(
        @Param('id') id: string,
        @Param('bannerIndex') bannerIndex: number,
    ) {
        return this.pageProductsService.removeBannerContent(id, bannerIndex);
    }

    @Post(":id/banner-connect")
    addBannerConnect(@Param("id") id: string, @Body() bannerData: any) {
        return this.pageProductsService.addBannerConnect(id, bannerData);
    }

    @Patch(":id/banner-connect/:index")
    updateBannerConnect(
        @Param("id") id: string,
        @Param("index") index: number,
        @Body() updateData: any
    ) {
        return this.pageProductsService.updateBannerConnect(id, index, updateData);
    }

    @Delete(":id/banner-connect/:index")
    removeBannerConnect(@Param("id") id: string, @Param("index") index: number) {
        return this.pageProductsService.removeBannerConnect(id, index);
    }

}

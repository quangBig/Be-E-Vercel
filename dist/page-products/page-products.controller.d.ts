import { PageProductsService } from "./page-products.service";
import { CreatePageProductDto } from "./dto/create-page-products.dto";
export declare class PageProductsController {
    private readonly pageProductsService;
    constructor(pageProductsService: PageProductsService);
    create(dto: CreatePageProductDto): Promise<import("./schemas/page-products.schema").PageProducts>;
    findAll(): Promise<import("./schemas/page-products.schema").PageProducts[]>;
    findOne(id: string): Promise<import("./schemas/page-products.schema").PageProducts>;
    update(id: string, dto: CreatePageProductDto): Promise<import("./schemas/page-products.schema").PageProducts>;
    remove(id: string): Promise<import("./schemas/page-products.schema").PageProducts>;
    addBanner(id: string, bannerData: {
        bannerVideo?: any;
        bannerContent?: any;
    }): Promise<import("./schemas/page-products.schema").PageProducts>;
    updateBannerContent(id: string, bannerIndex: number, updateData: any): Promise<import("./schemas/page-products.schema").PageProducts>;
    removeBannerContent(id: string, bannerIndex: number): Promise<import("./schemas/page-products.schema").PageProducts>;
    addBannerConnect(id: string, bannerData: any): Promise<import("./schemas/page-products.schema").PageProducts>;
    updateBannerConnect(id: string, index: number, updateData: any): Promise<import("./schemas/page-products.schema").PageProducts>;
    removeBannerConnect(id: string, index: number): Promise<import("./schemas/page-products.schema").PageProducts>;
}

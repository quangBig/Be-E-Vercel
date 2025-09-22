import { PageProducts, PageProductsDocument } from "./schemas/page-products.schema";
import { Model } from "mongoose";
import { CreatePageProductDto } from "./dto/create-page-products.dto";
export declare class PageProductsService {
    private pageProductsModel;
    constructor(pageProductsModel: Model<PageProductsDocument>);
    create(createPageProductsDto: CreatePageProductDto): Promise<PageProducts>;
    findAll(): Promise<PageProducts[]>;
    findOne(id: string): Promise<PageProducts>;
    update(id: string, updatePageProductsDto: CreatePageProductDto): Promise<PageProducts>;
    remove(id: string): Promise<PageProducts>;
    addBanner(id: string, bannerData: {
        bannerVideo?: any;
        bannerContent?: any;
    }): Promise<PageProducts>;
    updateBannerContent(id: string, bannerIndex: number, updateData: any): Promise<PageProducts>;
    removeBannerContent(id: string, bannerIndex: number): Promise<PageProducts>;
    addBannerConnect(id: string, bannerData: any): Promise<PageProducts>;
    updateBannerConnect(id: string, bannerIndex: number, updateData: any): Promise<PageProducts>;
    removeBannerConnect(id: string, bannerIndex: number): Promise<PageProducts>;
}

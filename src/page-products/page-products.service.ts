import { InjectModel } from "@nestjs/mongoose";
import { PageProducts, PageProductsDocument } from "./schemas/page-products.schema";
import { Model, Types } from "mongoose";
import { CreatePageProductDto } from "./dto/create-page-products.dto";

export class PageProductsService {
    constructor(
        @InjectModel(PageProducts.name)
        private pageProductsModel: Model<PageProductsDocument>
    ) { }

    async create(createPageProductsDto: CreatePageProductDto): Promise<PageProducts> {
        const existingName = await this.pageProductsModel
            .findOne({ name: createPageProductsDto.name })
            .exec();
        if (existingName) {
            throw new Error(`Page with name ${createPageProductsDto.name} already exists`);
        }

        const existingSlug = await this.pageProductsModel
            .findOne({ slug: createPageProductsDto.slug })
            .exec();
        if (existingSlug) {
            throw new Error(`Page with slug ${createPageProductsDto.slug} already exists`);
        }

        const createdPageProducts = new this.pageProductsModel(createPageProductsDto);
        return createdPageProducts.save();
    }

    async findAll(): Promise<PageProducts[]> {
        return this.pageProductsModel.find().exec();
    }

    async findOne(id: string): Promise<PageProducts> {
        const pageProducts = await this.pageProductsModel.findById(id).exec();
        if (!pageProducts) {
            throw new Error(`PageProducts with id ${id} not found`);
        }
        return pageProducts;
    }

    async update(id: string, updatePageProductsDto: CreatePageProductDto): Promise<PageProducts> {
        const existingPageProducts = await this.pageProductsModel
            .findOne({ name: updatePageProductsDto.name })
            .exec();
        if (existingPageProducts && (existingPageProducts._id as Types.ObjectId).toString() !== id) {
            throw new Error(`PageProducts with name ${updatePageProductsDto.name} already exists`);
        }

        const existingSlug = await this.pageProductsModel
            .findOne({ slug: updatePageProductsDto.slug })
            .exec();
        if (existingSlug && (existingSlug._id as Types.ObjectId).toString() !== id) {
            throw new Error(`PageProducts with slug ${updatePageProductsDto.slug} already exists`);
        }

        const updated = await this.pageProductsModel
            .findByIdAndUpdate(id, updatePageProductsDto, { new: true })
            .exec();

        if (!updated) {
            throw new Error(`PageProducts with ID ${id} not found`);
        }

        return updated;
    }

    async remove(id: string): Promise<PageProducts> {
        const deleted = await this.pageProductsModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new Error(`PageProducts with id ${id} not found`);
        }
        return deleted;
    }

    // ------------------ Banner -------------------


    async addBanner(
        id: string,
        bannerData: { bannerVideo?: any; bannerContent?: any }
    ): Promise<PageProducts> {
        const page = await this.pageProductsModel.findById(id).exec();
        if (!page) {
            throw new Error(`PageProducts with id ${id} not found`);
        }

        if (bannerData.bannerVideo) {
            page.bannerVideo = bannerData.bannerVideo;
        }

        if (bannerData.bannerContent) {
            // nếu bannerContent là mảng thì push thêm
            if (!page.bannerContent) {
                page.bannerContent = [];
            }

            if (Array.isArray(bannerData.bannerContent)) {
                page.bannerContent.push(...bannerData.bannerContent);
            } else {
                page.bannerContent.push(bannerData.bannerContent);
            }
        }

        return page.save();
    }

    async updateBannerContent(
        id: string,
        bannerIndex: number,
        updateData: any
    ): Promise<PageProducts> {
        const page = await this.pageProductsModel.findById(id).exec();
        if (!page) {
            throw new Error(`PageProducts with id ${id} not found`);
        }

        if (!page.bannerContent || !page.bannerContent[bannerIndex]) {
            throw new Error(`BannerContent index ${bannerIndex} not found`);
        }

        // update từng field
        page.bannerContent[bannerIndex] = {
            ...page.bannerContent[bannerIndex],
            ...updateData,
        };

        return page.save();
    }

    async removeBannerContent(
        id: string,
        bannerIndex: number
    ): Promise<PageProducts> {
        const page = await this.pageProductsModel.findById(id).exec();
        if (!page) {
            throw new Error(`PageProducts with id ${id} not found`);
        }

        if (!page.bannerContent || !page.bannerContent[bannerIndex]) {
            throw new Error(`BannerContent index ${bannerIndex} not found`);
        }

        page.bannerContent.splice(bannerIndex, 1);

        return page.save();
    }

    // ------------------ Banner Connect -------------------

    async addBannerConnect(
        id: string,
        bannerData: any
    ): Promise<PageProducts> {
        const page = await this.pageProductsModel.findById(id).exec();
        if (!page) {
            throw new Error(`PageProducts with id ${id} not found`);
        }

        if (!page.bannerConnect) {
            page.bannerConnect = [];
        }

        if (Array.isArray(bannerData)) {
            page.bannerConnect.push(...bannerData);
        } else {
            page.bannerConnect.push(bannerData);
        }

        return page.save();
    }

    async updateBannerConnect(
        id: string,
        bannerIndex: number,
        updateData: any
    ): Promise<PageProducts> {
        const page = await this.pageProductsModel.findById(id).exec();
        if (!page) {
            throw new Error(`PageProducts with id ${id} not found`);
        }

        if (!page.bannerConnect || !page.bannerConnect[bannerIndex]) {
            throw new Error(`BannerConnect index ${bannerIndex} not found`);
        }

        page.bannerConnect[bannerIndex] = {
            ...page.bannerConnect[bannerIndex],
            ...updateData,
        };

        return page.save();
    }

    async removeBannerConnect(
        id: string,
        bannerIndex: number
    ): Promise<PageProducts> {
        const page = await this.pageProductsModel.findById(id).exec();
        if (!page) {
            throw new Error(`PageProducts with id ${id} not found`);
        }

        if (!page.bannerConnect || !page.bannerConnect[bannerIndex]) {
            throw new Error(`BannerConnect index ${bannerIndex} not found`);
        }

        page.bannerConnect.splice(bannerIndex, 1);

        return page.save();
    }



}

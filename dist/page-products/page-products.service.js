"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageProductsService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const page_products_schema_1 = require("./schemas/page-products.schema");
const mongoose_2 = require("mongoose");
let PageProductsService = class PageProductsService {
    pageProductsModel;
    constructor(pageProductsModel) {
        this.pageProductsModel = pageProductsModel;
    }
    async create(createPageProductsDto) {
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
    async findAll() {
        return this.pageProductsModel.find().exec();
    }
    async findOne(id) {
        const pageProducts = await this.pageProductsModel.findById(id).exec();
        if (!pageProducts) {
            throw new Error(`PageProducts with id ${id} not found`);
        }
        return pageProducts;
    }
    async update(id, updatePageProductsDto) {
        const existingPageProducts = await this.pageProductsModel
            .findOne({ name: updatePageProductsDto.name })
            .exec();
        if (existingPageProducts && existingPageProducts._id.toString() !== id) {
            throw new Error(`PageProducts with name ${updatePageProductsDto.name} already exists`);
        }
        const existingSlug = await this.pageProductsModel
            .findOne({ slug: updatePageProductsDto.slug })
            .exec();
        if (existingSlug && existingSlug._id.toString() !== id) {
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
    async remove(id) {
        const deleted = await this.pageProductsModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new Error(`PageProducts with id ${id} not found`);
        }
        return deleted;
    }
    async addBanner(id, bannerData) {
        const page = await this.pageProductsModel.findById(id).exec();
        if (!page) {
            throw new Error(`PageProducts with id ${id} not found`);
        }
        if (bannerData.bannerVideo) {
            page.bannerVideo = bannerData.bannerVideo;
        }
        if (bannerData.bannerContent) {
            if (!page.bannerContent) {
                page.bannerContent = [];
            }
            if (Array.isArray(bannerData.bannerContent)) {
                page.bannerContent.push(...bannerData.bannerContent);
            }
            else {
                page.bannerContent.push(bannerData.bannerContent);
            }
        }
        return page.save();
    }
    async updateBannerContent(id, bannerIndex, updateData) {
        const page = await this.pageProductsModel.findById(id).exec();
        if (!page) {
            throw new Error(`PageProducts with id ${id} not found`);
        }
        if (!page.bannerContent || !page.bannerContent[bannerIndex]) {
            throw new Error(`BannerContent index ${bannerIndex} not found`);
        }
        page.bannerContent[bannerIndex] = {
            ...page.bannerContent[bannerIndex],
            ...updateData,
        };
        return page.save();
    }
    async removeBannerContent(id, bannerIndex) {
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
    async addBannerConnect(id, bannerData) {
        const page = await this.pageProductsModel.findById(id).exec();
        if (!page) {
            throw new Error(`PageProducts with id ${id} not found`);
        }
        if (!page.bannerConnect) {
            page.bannerConnect = [];
        }
        if (Array.isArray(bannerData)) {
            page.bannerConnect.push(...bannerData);
        }
        else {
            page.bannerConnect.push(bannerData);
        }
        return page.save();
    }
    async updateBannerConnect(id, bannerIndex, updateData) {
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
    async removeBannerConnect(id, bannerIndex) {
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
};
exports.PageProductsService = PageProductsService;
exports.PageProductsService = PageProductsService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(page_products_schema_1.PageProducts.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PageProductsService);
//# sourceMappingURL=page-products.service.js.map
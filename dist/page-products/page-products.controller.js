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
exports.PageProductsController = void 0;
const common_1 = require("@nestjs/common");
const page_products_service_1 = require("./page-products.service");
const create_page_products_dto_1 = require("./dto/create-page-products.dto");
let PageProductsController = class PageProductsController {
    pageProductsService;
    constructor(pageProductsService) {
        this.pageProductsService = pageProductsService;
    }
    create(dto) {
        return this.pageProductsService.create(dto);
    }
    findAll() {
        return this.pageProductsService.findAll();
    }
    findOne(id) {
        return this.pageProductsService.findOne(id);
    }
    update(id, dto) {
        return this.pageProductsService.update(id, dto);
    }
    remove(id) {
        return this.pageProductsService.remove(id);
    }
    addBanner(id, bannerData) {
        return this.pageProductsService.addBanner(id, bannerData);
    }
    async updateBannerContent(id, bannerIndex, updateData) {
        return this.pageProductsService.updateBannerContent(id, bannerIndex, updateData);
    }
    async removeBannerContent(id, bannerIndex) {
        return this.pageProductsService.removeBannerContent(id, bannerIndex);
    }
    addBannerConnect(id, bannerData) {
        return this.pageProductsService.addBannerConnect(id, bannerData);
    }
    updateBannerConnect(id, index, updateData) {
        return this.pageProductsService.updateBannerConnect(id, index, updateData);
    }
    removeBannerConnect(id, index) {
        return this.pageProductsService.removeBannerConnect(id, index);
    }
};
exports.PageProductsController = PageProductsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_page_products_dto_1.CreatePageProductDto]),
    __metadata("design:returntype", void 0)
], PageProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PageProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PageProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_page_products_dto_1.CreatePageProductDto]),
    __metadata("design:returntype", void 0)
], PageProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PageProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(":id/banner"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PageProductsController.prototype, "addBanner", null);
__decorate([
    (0, common_1.Patch)(':id/banner/:bannerIndex'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('bannerIndex')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], PageProductsController.prototype, "updateBannerContent", null);
__decorate([
    (0, common_1.Delete)(':id/banner/:bannerIndex'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('bannerIndex')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PageProductsController.prototype, "removeBannerContent", null);
__decorate([
    (0, common_1.Post)(":id/banner-connect"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PageProductsController.prototype, "addBannerConnect", null);
__decorate([
    (0, common_1.Patch)(":id/banner-connect/:index"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("index")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", void 0)
], PageProductsController.prototype, "updateBannerConnect", null);
__decorate([
    (0, common_1.Delete)(":id/banner-connect/:index"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("index")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], PageProductsController.prototype, "removeBannerConnect", null);
exports.PageProductsController = PageProductsController = __decorate([
    (0, common_1.Controller)("page-products"),
    __metadata("design:paramtypes", [page_products_service_1.PageProductsService])
], PageProductsController);
//# sourceMappingURL=page-products.controller.js.map
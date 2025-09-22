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
exports.PagesController = void 0;
const common_1 = require("@nestjs/common");
const create_page_dto_1 = require("./dto/create-page.dto");
const update_page_dto_1 = require("./dto/update-page.dto");
const page_service_1 = require("./page.service");
let PagesController = class PagesController {
    pagesService;
    constructor(pagesService) {
        this.pagesService = pagesService;
    }
    create(createPageDto) {
        return this.pagesService.create(createPageDto);
    }
    findAll() {
        return this.pagesService.findAll();
    }
    findOne(id) {
        return this.pagesService.findOne(id);
    }
    update(id, updatePageDto) {
        return this.pagesService.update(id, updatePageDto);
    }
    remove(id) {
        return this.pagesService.remove(id);
    }
    reorder(newOrder) {
        return this.pagesService.reorder(newOrder);
    }
    findBySection(section) {
        return this.pagesService.findBySection(section);
    }
};
exports.PagesController = PagesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_page_dto_1.CreatePageDto]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_page_dto_1.UpdatePageDto]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "reorder", null);
__decorate([
    (0, common_1.Get)('section/:section'),
    __param(0, (0, common_1.Param)('section')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "findBySection", null);
exports.PagesController = PagesController = __decorate([
    (0, common_1.Controller)('pages'),
    __metadata("design:paramtypes", [page_service_1.PagesService])
], PagesController);
//# sourceMappingURL=page.controller.js.map
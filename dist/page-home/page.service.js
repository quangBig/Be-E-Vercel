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
exports.PagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const page_schema_1 = require("./schemas/page.schema");
let PagesService = class PagesService {
    pageModel;
    constructor(pageModel) {
        this.pageModel = pageModel;
    }
    async create(createPageDto) {
        const lastPage = await this.pageModel.findOne().sort({ position: -1 });
        const existingTille = await this.pageModel.findOne({ title: createPageDto.title });
        if (existingTille) {
            throw new common_1.NotFoundException('Title already exists');
        }
        const newPage = new this.pageModel({
            ...createPageDto,
            position: lastPage ? lastPage.position + 1 : 1,
        });
        return newPage.save();
    }
    async findAll() {
        return this.pageModel.find().sort({ position: 1 }).exec();
    }
    async findOne(id) {
        const page = await this.pageModel.findById(id).exec();
        if (!page)
            throw new common_1.NotFoundException('Page not found');
        return page;
    }
    async update(id, updatePageDto) {
        const existingPage = await this.pageModel.findById(id).exec();
        if (!existingPage)
            throw new common_1.NotFoundException('Page not found');
        if (updatePageDto.title && updatePageDto.title !== existingPage.title) {
            const titleExists = await this.pageModel.findOne({ title: updatePageDto.title }).exec();
            if (titleExists)
                throw new common_1.NotFoundException('Title already exists');
        }
        const updated = await this.pageModel
            .findByIdAndUpdate(id, updatePageDto, { new: true })
            .exec();
        if (!updated)
            throw new common_1.NotFoundException('Page not found');
        return updated;
    }
    async remove(id) {
        const deleted = await this.pageModel.findByIdAndDelete(id).exec();
        if (!deleted)
            throw new common_1.NotFoundException('Page not found');
        return deleted;
    }
    async reorder(newOrder) {
        try {
            const bulkOps = newOrder.map((p) => ({
                updateOne: {
                    filter: { _id: p.id },
                    update: { $set: { position: Number(p.position) } },
                },
            }));
            await this.pageModel.bulkWrite(bulkOps);
            return this.findAll();
        }
        catch (error) {
            console.error("🔥 Reorder error:");
        }
    }
    async findBySection(section) {
        return this.pageModel.find({ section }).sort({ position: 1 }).exec();
    }
};
exports.PagesService = PagesService;
exports.PagesService = PagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(page_schema_1.Page.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PagesService);
//# sourceMappingURL=page.service.js.map
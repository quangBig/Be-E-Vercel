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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const products_schema_1 = require("./schemas/products.schema");
const mongoose_2 = require("mongoose");
let ProductsService = class ProductsService {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(dto) {
        const existingName = await this.productModel.findOne({ name: dto.name }).exec();
        if (existingName) {
            throw new common_1.NotFoundException(`Product with name ${dto.name} already exists`);
        }
        const createdProduct = new this.productModel(dto);
        return createdProduct.save();
    }
    async findAll() {
        return this.productModel.find().exec();
    }
    async findOne(_id) {
        const product = await this.productModel.findById(_id).exec();
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${_id} not found`);
        }
        return product;
    }
    async update(_id, dto) {
        const existingProduct = await this.productModel.findOne({ name: dto.name }).exec();
        if (existingProduct &&
            existingProduct._id.toString() !== _id) {
            throw new common_1.NotFoundException(`Product with name ${dto.name} already exists`);
        }
        const updated = await this.productModel.findByIdAndUpdate(_id, dto, { new: true }).exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Product with id ${_id} not found`);
        }
        return updated;
    }
    async delete(_id) {
        const deleted = await this.productModel.findByIdAndDelete(_id).exec();
        if (!deleted) {
            throw new common_1.NotFoundException(`Product with id ${_id} not found`);
        }
        return { message: `Deleted product ${_id} successfully` };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(products_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map
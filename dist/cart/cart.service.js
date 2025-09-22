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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cart_schemas_1 = require("./schemas/cart.schemas");
const mongoose_2 = require("mongoose");
const products_schema_1 = require("../products/schemas/products.schema");
let CartService = class CartService {
    cartModel;
    productModel;
    constructor(cartModel, productModel) {
        this.cartModel = cartModel;
        this.productModel = productModel;
    }
    async getCart(userId) {
        return this.cartModel.findOne({ userId }).exec();
    }
    async addToCart(userId, dto) {
        const { productId, variantName, color, quantity } = dto;
        const product = await this.productModel.findById(productId);
        if (!product)
            throw new common_1.NotFoundException("Product not found");
        const variant = product.variants.find(v => v.name === variantName);
        if (!variant)
            throw new common_1.NotFoundException("Variant not found");
        const selectedColor = variant.colors.find(c => c.name === color);
        if (!selectedColor)
            throw new common_1.NotFoundException("Color not found");
        const price = selectedColor.discountedPrice
            ? Number(selectedColor.discountedPrice)
            : Number(selectedColor.price);
        const originalPrice = Number(selectedColor.price);
        const image = selectedColor.image || product.images[0];
        let cart = await this.cartModel.findOne({ userId });
        if (!cart) {
            cart = new this.cartModel({ userId, items: [] });
        }
        const existingItem = cart.items.find(item => item.productId.toString() === productId &&
            item.variantName === variantName &&
            item.color === color);
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            cart.items.push({
                productId,
                variantName,
                color,
                quantity,
                price,
                originalPrice,
                image,
            });
        }
        await cart.save();
        return cart;
    }
    async updateQuantity(userId, productId, dto) {
        const cart = await this.cartModel.findOne({ userId });
        if (!cart)
            throw new common_1.NotFoundException("Cart not found");
        console.log("Cart items:", cart.items.map(i => i.productId.toString()));
        const item = cart.items.find((i) => i.productId.toString() === productId);
        if (!item)
            throw new common_1.NotFoundException("Item not found");
        item.quantity = dto.quantity;
        return cart.save();
    }
    async removeItem(userId, productId) {
        const cart = await this.cartModel.findOne({ userId });
        if (!cart)
            throw new common_1.NotFoundException("Cart not found");
        cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
        return cart.save();
    }
    async clearCart(userId) {
        return this.cartModel.findOneAndUpdate({ userId }, { items: [] }, { new: true });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schemas_1.Cart.name)),
    __param(1, (0, mongoose_1.InjectModel)(products_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map
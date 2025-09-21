import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cart, CartDocument } from "./schemas/cart.schemas";
import { Model, Types } from "mongoose";
import { AddToCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { Product, ProductDocument } from "src/products/schemas/products.schema";

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>,
        @InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    // Lấy giỏ hàng của User
    async getCart(userId: string) {
        return this.cartModel.findOne({ userId }).exec();
    }
    // Thêm sản phẩm vào giỏ hàng
    async addToCart(userId: string, dto: AddToCartDto) {
        const { productId, variantName, color, quantity } = dto;

        // Lấy sản phẩm từ DB
        const product = await this.productModel.findById(productId);
        if (!product) throw new NotFoundException("Product not found");

        // Tìm variant
        const variant = product.variants.find(v => v.name === variantName);
        if (!variant) throw new NotFoundException("Variant not found");

        // Tìm màu
        const selectedColor = variant.colors.find(c => c.name === color);
        if (!selectedColor) throw new NotFoundException("Color not found");

        // Xác định giá (ưu tiên discountedPrice nếu có)
        const price = selectedColor.discountedPrice
            ? Number(selectedColor.discountedPrice)
            : Number(selectedColor.price);

        const originalPrice = Number(selectedColor.price);

        // Lấy ảnh (ưu tiên ảnh màu, fallback variant hoặc product)
        const image = selectedColor.image || product.images[0];

        // Tìm giỏ hàng của user
        let cart = await this.cartModel.findOne({ userId });
        if (!cart) {
            cart = new this.cartModel({ userId, items: [] });
        }

        // Check xem sp đã có trong giỏ chưa
        const existingItem = cart.items.find(
            item =>
                item.productId.toString() === productId &&
                item.variantName === variantName &&
                item.color === color
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
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


    // Cập nhật lại số lượng sản phẩm

    async updateQuantity(userId: string, productId: string, dto: UpdateCartDto) {
        const cart = await this.cartModel.findOne({ userId });
        if (!cart) throw new NotFoundException("Cart not found");

        console.log("Cart items:", cart.items.map(i => i.productId.toString()));

        const item = cart.items.find(
            (i) => i.productId.toString() === productId
        );

        if (!item) throw new NotFoundException("Item not found");

        item.quantity = dto.quantity;

        return cart.save();
    }


    // Xóa item
    async removeItem(userId: string, productId: string) {
        const cart = await this.cartModel.findOne({ userId });
        if (!cart) throw new NotFoundException("Cart not found");

        cart.items = cart.items.filter(
            (i) => i.productId.toString() !== productId
        );

        return cart.save();
    }

    // Xóa cả giỏ
    async clearCart(userId: string) {
        return this.cartModel.findOneAndUpdate(
            { userId },
            { items: [] },
            { new: true }
        );
    }
}
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./schemas/products.schema";
import { Model, Types } from "mongoose";
import { CreateProductDto } from "./dto/create-products.dto";
import { UpdateProductDto } from "./dto/update-products.dto";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) { }

    async create(dto: CreateProductDto): Promise<Product> {
        const existingName = await this.productModel.findOne({ name: dto.name }).exec();
        if (existingName) {
            throw new NotFoundException(`Product with name ${dto.name} already exists`);
        }
        const createdProduct = new this.productModel(dto);
        return createdProduct.save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findOne(_id: string): Promise<Product> {
        const product = await this.productModel.findById(_id).exec();
        if (!product) {
            throw new NotFoundException(`Product with id ${_id} not found`);
        }
        return product;
    }

    async update(_id: string, dto: UpdateProductDto): Promise<Product> {
        const existingProduct = await this.productModel.findOne({ name: dto.name }).exec();
        if (
            existingProduct &&
            (existingProduct._id as Types.ObjectId).toString() !== _id
        ) {
            throw new NotFoundException(`Product with name ${dto.name} already exists`);
        }
        const updated = await this.productModel.findByIdAndUpdate(_id, dto, { new: true }).exec();
        if (!updated) {
            throw new NotFoundException(`Product with id ${_id} not found`);
        }
        return updated;
    }

    async delete(_id: string): Promise<{ message: string }> {
        const deleted = await this.productModel.findByIdAndDelete(_id).exec();
        if (!deleted) {
            throw new NotFoundException(`Product with id ${_id} not found`);
        }
        return { message: `Deleted product ${_id} successfully` };
    }
}

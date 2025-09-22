import { Product, ProductDocument } from "./schemas/products.schema";
import { Model } from "mongoose";
import { CreateProductDto } from "./dto/create-products.dto";
import { UpdateProductDto } from "./dto/update-products.dto";
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    create(dto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(_id: string): Promise<Product>;
    update(_id: string, dto: UpdateProductDto): Promise<Product>;
    delete(_id: string): Promise<{
        message: string;
    }>;
}

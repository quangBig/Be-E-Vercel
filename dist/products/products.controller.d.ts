import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-products.dto";
import { UpdateProductDto } from "./dto/update-products.dto";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(dto: CreateProductDto): Promise<import("./schemas/products.schema").Product>;
    findAll(): Promise<import("./schemas/products.schema").Product[]>;
    findOne(id: string): Promise<import("./schemas/products.schema").Product>;
    update(id: string, dto: UpdateProductDto): Promise<import("./schemas/products.schema").Product>;
    delete(id: string): Promise<{
        message: string;
    }>;
}

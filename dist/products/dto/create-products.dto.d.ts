declare class ProductColorDto {
    name?: string;
    value?: string;
    hex?: string;
    image?: string;
    price?: string;
    discountedPrice?: string;
}
declare class ProductVariantDto {
    name: string;
    price: string;
    discountedPrice?: string;
    config?: string;
    colors: ProductColorDto[];
}
export declare class CreateProductDto {
    name: string;
    description?: string;
    Outstandingfeatures?: string;
    category?: string;
    images?: string[];
    variants: ProductVariantDto[];
}
export {};

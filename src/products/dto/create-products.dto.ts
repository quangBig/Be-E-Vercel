import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductColorDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    value?: string;

    @IsOptional()
    @IsString()
    hex?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    price?: string;  // Giá gốc

    @IsOptional()
    @IsString()
    discountedPrice?: string; // ✅ Giá sau khi giảm
}

class ProductVariantDto {
    @IsString()
    name: string;

    @IsString()
    price: string; // Giá gốc

    @IsOptional()
    @IsString()
    discountedPrice?: string; // ✅ Giá sau khi giảm

    @IsOptional()
    @IsString()
    config?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductColorDto)
    colors: ProductColorDto[];
}

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    Outstandingfeatures?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductVariantDto)
    variants: ProductVariantDto[];
}

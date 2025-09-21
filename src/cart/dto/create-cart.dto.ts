import { IsMongoId, IsNotEmpty, IsOptional, IsString, IsInt, Min } from "class-validator";

export class AddToCartDto {
    @IsMongoId()
    @IsNotEmpty()
    productId: string;

    @IsString()
    @IsNotEmpty()
    variantName: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsInt()
    @Min(1)
    quantity: number;
}

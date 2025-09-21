import { IsNotEmpty, IsOptional, IsString, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateBannerContentDto {
    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    // @IsOptional()
    // @IsString()
    // titleColor?: string;          // thêm

    // @IsOptional()
    // @IsString()
    // descriptionColor?: string;    // thêm
}


export class CreateBannerConnect {
    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsString()
    mainContent?: string;

}
export class CreateBannerVideoDto {
    @IsNotEmpty()
    @IsString()
    url: string;   // ✅ đúng với schema { url: string }
}

export class CreatePageProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    slug: string;

    @IsNotEmpty()
    @IsString()
    image: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateBannerVideoDto)
    bannerVideo?: CreateBannerVideoDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateBannerContentDto)
    bannerContent?: CreateBannerContentDto[];  // ✅ array thay vì object
}

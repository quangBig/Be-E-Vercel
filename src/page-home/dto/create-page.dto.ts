// create-page.dto.ts
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreatePageDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    decs?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    link?: string;

    @IsOptional()
    @IsString()
    price?: string;


    @IsOptional()
    @IsBoolean()
    reverse?: boolean;

    @IsOptional()
    @IsNumber()
    position?: number;

    @IsString()
    section: string; // bắt buộc

    @IsOptional()
    @IsString()
    bannerTitle?: string;
}

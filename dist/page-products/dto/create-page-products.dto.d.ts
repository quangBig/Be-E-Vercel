export declare class CreateBannerContentDto {
    image?: string;
    title?: string;
    description?: string;
}
export declare class CreateBannerConnect {
    image?: string;
    content?: string;
    mainContent?: string;
}
export declare class CreateBannerVideoDto {
    url: string;
}
export declare class CreatePageProductDto {
    name: string;
    slug: string;
    image: string;
    bannerVideo?: CreateBannerVideoDto;
    bannerContent?: CreateBannerContentDto[];
}

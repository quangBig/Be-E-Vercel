import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PageProductsDocument = PageProducts & Document;

@Schema({ timestamps: true })
export class PageProducts {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    slug: string;

    @Prop({ required: true })
    image: string;

    @Prop(
        raw({
            url: { type: String },
        })
    )
    bannerVideo?: { url: string };

    @Prop([
        raw({
            image: { type: String },
            title: { type: String },
            description: { type: String }
        }),
    ])
    bannerContent?: {
        image?: string;
        title?: string;
        description?: string;
    }[];

    @Prop([
        raw({
            image: { type: String },
            content: { type: String },
            mainContent: { type: String }
        }),
    ])
    bannerConnect?: {
        image?: string;
        content?: string;
        mainContent?: string;
    }[];

}

export const PageProductsSchema = SchemaFactory.createForClass(PageProducts);

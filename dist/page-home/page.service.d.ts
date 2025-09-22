import { Model } from 'mongoose';
import { Page, PageDocument } from './schemas/page.schema';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
export declare class PagesService {
    private pageModel;
    constructor(pageModel: Model<PageDocument>);
    create(createPageDto: CreatePageDto): Promise<Page>;
    findAll(): Promise<Page[]>;
    findOne(id: string): Promise<Page>;
    update(id: string, updatePageDto: UpdatePageDto): Promise<Page>;
    remove(id: string): Promise<Page>;
    reorder(newOrder: {
        id: string;
        position: number;
    }[]): Promise<Page[] | undefined>;
    findBySection(section: string): Promise<Page[]>;
}

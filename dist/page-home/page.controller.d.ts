import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PagesService } from './page.service';
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    create(createPageDto: CreatePageDto): Promise<import("./schemas/page.schema").Page>;
    findAll(): Promise<import("./schemas/page.schema").Page[]>;
    findOne(id: string): Promise<import("./schemas/page.schema").Page>;
    update(id: string, updatePageDto: UpdatePageDto): Promise<import("./schemas/page.schema").Page>;
    remove(id: string): Promise<import("./schemas/page.schema").Page>;
    reorder(newOrder: {
        id: string;
        position: number;
    }[]): Promise<import("./schemas/page.schema").Page[] | undefined>;
    findBySection(section: string): Promise<import("./schemas/page.schema").Page[]>;
}

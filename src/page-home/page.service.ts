import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from './schemas/page.schema';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
    constructor(
        @InjectModel(Page.name) private pageModel: Model<PageDocument>,
    ) { }
    // Page
    async create(createPageDto: CreatePageDto): Promise<Page> {
        const lastPage = await this.pageModel.findOne().sort({ position: -1 });
        const existingTille = await this.pageModel.findOne({ title: createPageDto.title });
        if (existingTille) {
            throw new NotFoundException('Title already exists');
        }
        const newPage = new this.pageModel({
            ...createPageDto,
            position: lastPage ? lastPage.position + 1 : 1,
        });
        return newPage.save();
    }

    async findAll(): Promise<Page[]> {
        return this.pageModel.find().sort({ position: 1 }).exec();
    }

    async findOne(id: string): Promise<Page> {
        const page = await this.pageModel.findById(id).exec();
        if (!page) throw new NotFoundException('Page not found');
        return page;
    }

    async update(id: string, updatePageDto: UpdatePageDto): Promise<Page> {
        const existingPage = await this.pageModel.findById(id).exec();
        if (!existingPage) throw new NotFoundException('Page not found');
        if (updatePageDto.title && updatePageDto.title !== existingPage.title) {
            const titleExists = await this.pageModel.findOne({ title: updatePageDto.title }).exec();
            if (titleExists) throw new NotFoundException('Title already exists');
        }
        const updated = await this.pageModel
            .findByIdAndUpdate(id, updatePageDto, { new: true })
            .exec();
        if (!updated) throw new NotFoundException('Page not found');
        return updated;
    }

    async remove(id: string): Promise<Page> {
        const deleted = await this.pageModel.findByIdAndDelete(id).exec();
        if (!deleted) throw new NotFoundException('Page not found');
        return deleted;
    }

    async reorder(newOrder: { id: string; position: number }[]) {
        try {
            const bulkOps = newOrder.map((p) => ({
                updateOne: {
                    filter: { _id: p.id },
                    update: { $set: { position: Number(p.position) } },
                },
            }));
            await this.pageModel.bulkWrite(bulkOps);
            return this.findAll();
        } catch (error) {
            console.error("🔥 Reorder error:")
        }
    }
    async findBySection(section: string): Promise<Page[]> {
        return this.pageModel.find({ section }).sort({ position: 1 }).exec();
    }

}

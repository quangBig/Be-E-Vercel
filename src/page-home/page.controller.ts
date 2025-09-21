import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    Put,
} from '@nestjs/common';

import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PagesService } from './page.service';


@Controller('pages')
export class PagesController {
    constructor(private readonly pagesService: PagesService) { }
    // Page 
    @Post()
    create(@Body() createPageDto: CreatePageDto) {
        return this.pagesService.create(createPageDto);
    }

    @Get()
    findAll() {
        return this.pagesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pagesService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
        return this.pagesService.update(id, updatePageDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pagesService.remove(id);
    }

    // 📌 Reorder pages
    @Post('reorder')
    reorder(@Body() newOrder: { id: string; position: number }[]) {
        return this.pagesService.reorder(newOrder);
    }
    @Get('section/:section')
    findBySection(@Param('section') section: string) {
        return this.pagesService.findBySection(section);
    }


}

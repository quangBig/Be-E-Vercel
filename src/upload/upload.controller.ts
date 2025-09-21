import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import * as multer from 'multer';
import { CloudinaryService } from 'src/products/cloudinary/cloudinary.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly cloudinaryService: CloudinaryService) { }

    @Post('video')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: multer.memoryStorage(), // lưu file trong RAM
            limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
        }),
    )
    async uploadVideo(@UploadedFile() file: Express.Multer.File) {
        const url = await this.cloudinaryService.uploadImage(file);
        return {
            url,
            filename: file.originalname,
        };
    }
}

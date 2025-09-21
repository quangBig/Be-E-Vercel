// src/modules/upload/upload.controller.ts
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
    @Post('video')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads/videos', // thư mục lưu file
                filename: (req, file, callback) => {
                    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
                    callback(null, uniqueName);
                },
            }),
            limits: { fileSize: 50 * 1024 * 1024 }, // giới hạn 50MB
        }),
    )
    uploadVideo(@UploadedFile() file: Express.Multer.File) {
        return {
            url: `/uploads/videos/${file.filename}`, // trả về URL thật
            filename: file.filename,
        };
    }
}

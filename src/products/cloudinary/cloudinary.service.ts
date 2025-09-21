import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
    async uploadImage(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'products', resource_type: 'auto' }, // auto để nhận cả ảnh & video
                (error, result: UploadApiResponse | undefined) => {
                    if (error || !result) return reject(error || new Error('Upload failed'));
                    resolve(result.secure_url);
                },
            );

            Readable.from(file.buffer).pipe(stream);
        });
    }
}

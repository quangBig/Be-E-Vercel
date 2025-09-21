import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
    async uploadImage(file: any): Promise<string> {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'products' },
                (error, result: UploadApiResponse | undefined) => {
                    if (error || !result) return reject(error || new Error('No result'));
                    return resolve(result.secure_url);
                },
            );

            // convert file.buffer into a readable stream without using buffer-to-stream
            Readable.from(file.buffer).pipe(stream);
        });
    }
}

import { CloudinaryService } from 'src/products/cloudinary/cloudinary.service';
export declare class UploadController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadVideo(file: Express.Multer.File): Promise<{
        url: string;
        filename: string;
    }>;
}

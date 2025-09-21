import { Module } from '@nestjs/common';

import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from './cloudnary.provider';

@Module({
    providers: [CloudinaryProvider, CloudinaryService],
    exports: [CloudinaryService],
})
export class CloudinaryModule { }

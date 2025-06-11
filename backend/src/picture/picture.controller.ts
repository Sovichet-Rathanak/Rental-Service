import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PictureService } from './picture.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('picture')
export class PictureController {
    constructor(private readonly pictureService: PictureService) { }

    @Post('/upload/:listingId')
    @UseInterceptors(FileInterceptor('file'))
    async uploadPicture(
        @Param('listingId') listingId: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.pictureService.uploadPicture(listingId, file);
    }

    @Delete('/:pictureId')
    async deletePicture(@Param('pictureId') pictureId: string) {
        return this.pictureService.deletePicture(pictureId);
    }

    @Get('/:listingId')
    async getPictures(@Param('listingId') listingId: string) {
        return this.pictureService.getPicturesByListing(listingId);
    }
}
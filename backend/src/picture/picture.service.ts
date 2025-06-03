import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Picture } from './picture.entity';
import { Repository } from 'typeorm';
import { MinioService } from 'nestjs-minio-client';
import { Listing } from 'src/listing/listing.entity';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PictureService {
    constructor(
        @InjectRepository(Picture)
        private pictureRepo: Repository<Picture>,
        private readonly minioClient: MinioService,

        @InjectRepository(Listing)
        private listingRepo: Repository<Listing>
    ) { };

    async uploadPicture(listingId: string, file: Express.Multer.File) {
        const bucket = 'romdoul';
        const fileExtension = file.originalname.split('.').pop();
        const filename = `${uuidv4()}.${fileExtension}`;
        const ogFile = "original/" + filename;
        const thumbnailFile = `thumbnail/thumb-${filename}`;

        //Original image
        await this.minioClient.client.putObject(
            bucket,
            ogFile,
            file.buffer,
            file.buffer.length,
            {
                "Content-Type": file.mimetype
            }
        )

        //Thumb nail
        const resizedImageBuffer = await sharp(file.buffer).resize({ width: 300, height: 240, withoutEnlargement: true }).toBuffer();
        await this.minioClient.client.putObject(
            bucket,
            thumbnailFile,
            resizedImageBuffer,
            resizedImageBuffer.length,
            {
                'Content-type': file.mimetype,
            }
        );

        const listing = await this.listingRepo.findOne({ where: { id: listingId } });
        if (!listing) throw new Error('Listing not found');

        //Set thumbnail
        const isFirst = (await this.pictureRepo.count({ where: { listing: { id: listingId } } })) === 0;

        const picture = this.pictureRepo.create({
            original_url: filename,
            thumbnail_url: thumbnailFile,
            isThumbnail: isFirst,
            listing: listing
        })

        await this.pictureRepo.save(picture);
        return picture;
    }

    async updatePictures(pictureId: string, file: Express.Multer.File) {
        const picture = await this.pictureRepo.findOne({ where: { id: pictureId }, relations: ['listing'] });
        if (!picture) throw new Error('Picture not found');

        const bucketName = 'romdoul';

        //Delete from Minio
        await this.minioClient.client.removeObject(bucketName, picture.original_url);
        await this.minioClient.client.removeObject(bucketName, picture.thumbnail_url);

        const fileExtension = file.originalname.split('.').pop();
        const newFile = `${uuidv4()}.${fileExtension}`;
        const newOgFile = "original/" + newFile;
        const newThumbnailFile = `thumbnail/thumb-${newFile}`;

        //Upload new file
        await this.minioClient.client.putObject(
            bucketName,
            newOgFile,
            file.buffer,
            file.buffer.length,
            {
                'Content-Type': file.mimetype,
            }
        );

        //Upload new file
        const resizedImage = await sharp(file.buffer).resize({ width: 300, height: 240, withoutEnlargement: true }).toBuffer();

        await this.minioClient.client.putObject(
            bucketName,
            newThumbnailFile,
            resizedImage,
            resizedImage.length,
            {
                'Content-Type': file.mimetype
            }
        );

        picture.original_url = newFile;
        picture.thumbnail_url = newThumbnailFile;

        return this.pictureRepo.save(picture);
    }

    async deletePicture(pictureId: string) {
        const picture = await this.pictureRepo.findOne({ where: { id: pictureId }, relations: ['listing'] });
        if (!picture) throw new Error('Picture not found');

        const listingId = picture.listing.id;
        const bucketName = 'romdoul';

        //Delete from Minio
        await this.minioClient.client.removeObject(bucketName, picture.original_url);
        await this.minioClient.client.removeObject(bucketName, picture.thumbnail_url);

        if (picture.isThumbnail) {
            const remainingPic = await this.pictureRepo.find({
                where: { listing: { id: listingId } },
                order: { created_at: "ASC" }
            });

            if (remainingPic.length > 0) {
                remainingPic[0].isThumbnail = true;
                await this.pictureRepo.save(remainingPic[0]);
            }
        }

        //Delete from DB
        return this.pictureRepo.remove(picture);
    }

    async getPicturesByListing(listingId: string): Promise<Picture[]> {
        return this.pictureRepo.find({
            where: { listing: { id: listingId } },
        });
    }
}

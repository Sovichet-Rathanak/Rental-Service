import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { MinioModule } from 'nestjs-minio-client';
import { Listing } from 'src/listing/listing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './picture.entity';

@Module({
  controllers: [PictureController],
  imports: [
    TypeOrmModule.forFeature([Picture, Listing]),
    MinioModule.register({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY!,
      secretKey: process.env.MINIO_SECRET_KEY!
    })
  ],
  providers: [PictureService, Listing],
})

export class PictureModule { }

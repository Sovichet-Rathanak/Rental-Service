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
      accessKey: 'XD8pQxduorLDY81wKHKe',
      secretKey: 'QKjVtGDOfYJfc3YPLqObEwiBS27iP5jpgxhQfvXJ'
    })
  ],
  providers: [PictureService, Listing],
})

export class PictureModule { }

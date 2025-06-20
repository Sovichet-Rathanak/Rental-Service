import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MinioModule } from 'nestjs-minio-client';
import { ListingsModule } from 'src/listing/listing.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  MinioModule.register({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY!,
    secretKey: process.env.MINIO_SECRET_KEY!
  })
  ],
  exports: [UserService],
  providers: [UserService, TypeOrmModule], // typeorm
  controllers: [UserController]
})
export class UserModule { }

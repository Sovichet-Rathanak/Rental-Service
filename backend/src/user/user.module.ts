import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MinioModule } from 'nestjs-minio-client';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    MinioModule.register({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'XD8pQxduorLDY81wKHKe',
      secretKey: 'QKjVtGDOfYJfc3YPLqObEwiBS27iP5jpgxhQfvXJ'
    })
  ],
  exports: [UserService],
  providers: [UserService, TypeOrmModule], // typeorm
  controllers: [UserController]
})
export class UserModule { }

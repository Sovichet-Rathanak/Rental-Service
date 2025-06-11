import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingsModule } from './listing/listing.module';
import { AmenityModule } from './amenity/amenity.module';
import { PictureModule } from './picture/picture.module';
import { RegionModule } from './region/region.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AccomReviewModule } from './accom-review/accom-review.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 2707,
      username: 'admin',
      password: 'admin',
      database: 'romdoul_database',
      autoLoadEntities: true,
      synchronize: true
    }),
    ListingsModule,
    AmenityModule,
    PictureModule,
    RegionModule,
    UserModule,
    AuthModule,
    AccomReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

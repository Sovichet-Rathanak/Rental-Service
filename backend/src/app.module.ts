import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingsModule } from './listing/listing.module';
import { AmenityModule } from './amenity/amenity.module';
import { PictureModule } from './picture/picture.module';
import { RegionModule } from './region/region.module';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    RegionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

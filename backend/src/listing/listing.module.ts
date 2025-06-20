import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './listing.entity';
import { Amenity } from 'src/amenity/amenity.entity';
import { RegionModule } from 'src/region/region.module';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Listing, Amenity, User]), RegionModule],
  controllers: [ListingController],
  providers: [ListingService],
  exports: [ListingService]
})
export class ListingsModule {}

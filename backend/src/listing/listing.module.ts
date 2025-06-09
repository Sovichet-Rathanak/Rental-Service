import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './listing.entity';
import { Amenity } from 'src/amenity/amenity.entity';
import { RegionService } from 'src/region/region.service';
import { RegionModule } from 'src/region/region.module';

@Module({
  imports: [TypeOrmModule.forFeature([Listing, Amenity]), RegionModule],
  controllers: [ListingController],
  providers: [ListingService],
  exports: [ListingService]
})
export class ListingsModule {}

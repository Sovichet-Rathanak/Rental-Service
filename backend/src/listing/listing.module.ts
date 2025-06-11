import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './listing.entity';
import { Amenity } from 'src/amenity/amenity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Listing, Amenity])],
  controllers: [ListingController],
  providers: [ListingService],
  exports: [ListingService]
})
export class ListingsModule {}

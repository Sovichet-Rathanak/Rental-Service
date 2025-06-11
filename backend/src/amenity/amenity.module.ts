import { Module } from '@nestjs/common';
import { AmenityController } from './amenity.controller';
import { AmenityService } from './amenity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amenity } from './amenity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Amenity])],
  controllers: [AmenityController],
  providers: [AmenityService],
  exports: [AmenityService]
})
export class AmenityModule {}

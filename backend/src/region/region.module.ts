import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './region.entity';
import { RegionController } from './region.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  providers: [RegionService],
  exports: [RegionService],
  controllers: [RegionController],
})
export class RegionModule {}

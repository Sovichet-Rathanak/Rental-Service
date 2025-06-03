import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionService {
    constructor(
        @InjectRepository(Region)
        private regionRepo: Repository<Region>
    ){ };

    async getAllRegion(): Promise<Region[]>{
        return this.regionRepo.find();
    }
}

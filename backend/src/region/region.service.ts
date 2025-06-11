import { Injectable, NotFoundException } from '@nestjs/common';
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

    async findOne(id: string){
        const region = await this.regionRepo.findOne({where: {id}});
        
        if(!region){
            throw new NotFoundException('region not found');
        }

        return region;
    }
}

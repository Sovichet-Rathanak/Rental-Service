import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Amenity } from './amenity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AmenityService {
    constructor(
        @InjectRepository(Amenity)
        private amenityRepo: Repository<Amenity>
    ){}

    async getAllAmenity(): Promise<Amenity[]>{
        return this.amenityRepo.find()
    }
}

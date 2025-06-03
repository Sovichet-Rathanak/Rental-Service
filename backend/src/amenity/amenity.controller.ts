import { Controller, Get } from '@nestjs/common';
import { AmenityService } from './amenity.service';
import { Amenity } from './amenity.entity';

@Controller('amenity')
export class AmenityController {
    constructor(private amenityService:AmenityService){}
    @Get('/')
    async getAllAmenity(): Promise<Amenity[]>{
        return this.amenityService.getAllAmenity()
    }
}

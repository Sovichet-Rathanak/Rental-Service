import { Controller, Get } from '@nestjs/common';
import { RegionService } from './region.service';
import { Region } from './region.entity';

@Controller('region')
export class RegionController {
    constructor (private readonly regionService: RegionService){}

    @Get()
    async getAllRegion(): Promise<Region[]>{
        return this.regionService.getAllRegion()
    }
}

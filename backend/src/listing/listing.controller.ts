import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ListingService } from './listing.service';
import { createListingDTO } from './dto/create-listing.dto';
import { Listing } from './listing.entity';

@Controller('listing')
export class ListingController {
    constructor(private listingService: ListingService){}
    @Get('/')
    async getAllListing(): Promise<Listing[]>{
        return this.listingService.getAllListing();
    }

    @Post('/')
    async createListing(@Body() body: createListingDTO): Promise<Listing>{
        return this.listingService.createListing(body);
    }

    @Delete('/:id')
    async deleteListing(@Param('id') id:string): Promise<{message: string}>{
        await this.listingService.deleteListingByID(id);
        return { message: 'Lisiting deleted successfuly'}
    }

    @Get('/:id')
    async findOneById(@Param('id') id: string): Promise<Listing>{
        return this.listingService.findOne(id);
    }
}

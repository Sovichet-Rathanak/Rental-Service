import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ListingService } from './listing.service';
import { createListingDTO } from './dto/create-listing.dto';
import { Listing } from './listing.entity';
import { FilterListingDto } from './dto/filter-listing.dto';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Controller('listing')
export class ListingController {
  constructor(private listingService: ListingService) { }
  @Get('filter')
  async filterListings(@Query() rawQuery: any) {
    const filterDto = plainToInstance(FilterListingDto, rawQuery, {
      enableImplicitConversion: true,
    });

    await validateOrReject(filterDto); 
    return this.listingService.filterListings(filterDto);
  }
  
  @Get('/')
  async getAllListing(): Promise<Listing[]> {
    return this.listingService.getAllListing();
  }

  @Post('/')
  async createListing(@Body() body: createListingDTO): Promise<Listing> {
    return this.listingService.createListing(body);
  }

  @Delete('/:id')
  async deleteListing(@Param('id') id: string): Promise<{ message: string }> {
    await this.listingService.deleteListingByID(id);
    return { message: 'Lisiting deleted successfuly' };
  }

  @Get('/:id')
  async findOneById(@Param('id') id: string): Promise<Listing> {
    return this.listingService.findOne(id);
  }
}

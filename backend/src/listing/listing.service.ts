import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './listing.entity';
import { In, Repository } from 'typeorm';
import { createListingDTO } from './dto/create-listing.dto';
import { updateListingDTO } from './dto/update-listing.dto';
import { Amenity } from 'src/amenity/amenity.entity';
import { RegionService } from 'src/region/region.service';
import { FilterListingDto } from './dto/filter-listing.dto';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private listingRepo: Repository<Listing>,

    @InjectRepository(Amenity)
    private amenityRepo: Repository<Amenity>,

    private regionService: RegionService,
  ) { }

  async getAllListing(): Promise<Listing[]> {
    return this.listingRepo.find();
  }

  async createListing(dto: createListingDTO): Promise<Listing> {
    const listing = this.listingRepo.create(dto);

    if (dto.amenity_id && dto.amenity_id.length > 0) {
      //check if amenities is provided
      const amenities = await this.amenityRepo.findBy({
        id: In(dto.amenity_id), //find it in the database
      });
      listing.amenities = amenities; //attach it to the listing
      console.log(amenities);
    }

    const region = await this.regionService.findOne(dto.region_id);
    listing.region = region;

    return this.listingRepo.save(listing);
  }

  async updateListing(id: string, dto: updateListingDTO): Promise<Listing> {
    const listing = await this.listingRepo.findOne({ where: { id } });
    if (!listing) throw new NotFoundException('Listing could not be found');

    Object.assign(listing, dto);
    return this.listingRepo.save(listing);
  }

  async findOne(id: string): Promise<Listing> {
    const listing = await this.listingRepo.findOne({ where: { id } });
    if (!listing) throw new NotFoundException('Listing could not be found');
    return listing;
  }

  async deleteListingByID(id: string) {
    const found = await this.findOne(id);
    this.listingRepo.remove(found);
  }

  async filterListings(filterListingDto: FilterListingDto): Promise<Listing[]> {
    //destructuring FilterListingDto
    const {
      regions,
      guests,
      furnishing,
      minMonthlyPrice,
      maxMonthlyPrice,
    } = filterListingDto;

    const query = this.listingRepo
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.region', 'region')
      .leftJoinAndSelect('listing.amenities', 'amenity')
      .leftJoinAndSelect('listing.pictures', 'picture');

    if (regions) {
      if (Array.isArray(regions) && regions.length > 0) { query.andWhere('region.id IN (:...regions)', { regions }) }
      else {
        query.andWhere('region.id = :regions', { regions });
      }
    }


    if (furnishing !== undefined) {
      query.andWhere('listing.furnishing = :furnishing', { furnishing });
    }

    if (guests) {
      query.andWhere('listing.guests >= :guests', { guests })
    }

    if (minMonthlyPrice) {
      query.andWhere('listing.price_monthly >= :minMonthlyPrice', { minMonthlyPrice })
    }

    if (maxMonthlyPrice) {
      query.andWhere('listing.price_monthly <= :maxMonthlyPrice', { maxMonthlyPrice })
    }

    return await query.getMany();
  }
}

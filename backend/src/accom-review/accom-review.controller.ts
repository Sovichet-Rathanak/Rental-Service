import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccomReviewService } from './accom-review.service';
import { CreateAccomReviewDto } from './dto/create-review.dto';
import { AccomReview } from './accom-review.entity';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('reviews')
export class AccomReviewController {
  constructor(private readonly reviewService: AccomReviewService) {}

  @Post()
  create(@Body() dto: CreateAccomReviewDto): Promise<AccomReview> {
    return this.reviewService.createReview(dto);
  }

  @Get()
  findAll(): Promise<AccomReview[]> {
    return this.reviewService.findAll();
  }

  @Get('overall/:listing')
  getOverall(@Param('listing') id: string) {
    return this.reviewService.getOverall(id);
  }

  @Get('listing/:listingId')
  findByListing(@Param('listing') listing: string): Promise<AccomReview[]> {
    return this.reviewService.findByListing(listing);
  }
}

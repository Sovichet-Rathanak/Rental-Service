import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccomReviewService } from './accom-review.service';
import { AccomReviewController } from './accom-review.controller';
import { AccomReview } from './accom-review.entity';
import { User } from '../user/user.entity'; 
import { Listing } from '../listing/listing.entity'; 
import { UserModule } from '../user/user.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([AccomReview, User, Listing]), // register all entities
    UserModule, // make sure this module exports the UserRepository
  ],
  providers: [AccomReviewService],
  controllers: [AccomReviewController],
  exports: [AccomReviewService],
})
export class AccomReviewModule {}

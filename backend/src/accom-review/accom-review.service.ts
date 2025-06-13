import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccomReview } from './accom-review.entity';
import { CreateAccomReviewDto } from './dto/create-review.dto';
import { User } from 'src/user/user.entity';
import { Listing } from 'src/listing/listing.entity';
import { ReviewCategory } from './review_category.enum';

@Injectable()
export class AccomReviewService {
    constructor(
        @InjectRepository(AccomReview)
        private reviewRepo: Repository<AccomReview>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(Listing)
        private listingRepo: Repository<Listing>,
    ) { }

    async createReview(dto: CreateAccomReviewDto) {
        const user = await this.userRepo.findOneBy({ id: dto.user });
        const listing = await this.listingRepo.findOneBy({ id: dto.listing });

        if (!user || !listing) throw new NotFoundException('Reviewer or listing not found');

        const review = this.reviewRepo.create({
            ...dto,
            user,
            listing,
        });

        return this.reviewRepo.save(review);
    }

    async findAll() {
        return this.reviewRepo.find({
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }

    async getOverall(listing: string) {
        const reviews = await this.reviewRepo.find({ where: { listing: { id: listing } } });

        const count = reviews.length;
        const ratingBar = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        // refactor use enum instead
        const categories = Object.values(ReviewCategory);
        const sums = categories.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});

        for (const review of reviews) {
            const avg = Math.round(
                (review.priceRating + review.comfortRating + review.locationRating + review.cleanlinessRating + review.communicationRating) / 5
            );
            ratingBar[avg]++;
            categories.forEach(cat => sums[cat] += review[cat]);
        }

        const perCategory = {};
        categories.forEach(cat => {
            perCategory[cat.replace('Rating', '')] = count > 0 ? +(sums[cat] / count).toFixed(1) : 0;
        });

        return { ratingBar, perCategory };
    }
}



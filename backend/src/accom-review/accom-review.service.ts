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
        const reviews = await this.reviewRepo.find({
            where: { listing: { id: listing } },
        });

        const count = reviews.length;
        const ratingBar: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        const categories = Object.values(ReviewCategory);

        // Initialize sums with 0
        const sums: Record<ReviewCategory, number> = categories.reduce((acc, key) => {
            acc[key] = 0;
            return acc;
        }, {} as Record<ReviewCategory, number>);

        // Calculate totals
        for (const review of reviews) {
            const ratings = categories.map((cat) => review[cat]);
            const avg = Math.round(ratings.reduce((sum, val) => sum + val, 0) / categories.length);
            ratingBar[avg]++;
            categories.forEach((cat) => {
                sums[cat] += review[cat];
            });
        }

        // Calculate average per category
        const perCategory: Record<string, number> = {};
        categories.forEach((cat) => {
            const label = cat.replace('Rating', '').toLowerCase(); //calculate each category
            perCategory[label] = count > 0 ? +(sums[cat] / count).toFixed(1) : 0;
        });

        return { ratingBar, perCategory };
    }
}

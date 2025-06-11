import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccomReview } from './accom-review.entity';
import { CreateAccomReviewDto } from './dto/create-review.dto';
import { User } from 'src/user/user.entity';
import { Listing } from 'src/listing/listing.entity';

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
        const reviewer = await this.userRepo.findOneBy({ id: dto.reviewerId });
        const listing = await this.listingRepo.findOneBy({ id: dto.listingId });

        if (!reviewer || !listing) throw new NotFoundException('Reviewer or listing not found');

        const review = this.reviewRepo.create({
            ...dto,
            reviewer,
            listing,
        });

        return this.reviewRepo.save(review);
    }

    async findAll() {
        return this.reviewRepo.find({
            relations: ['reviewer'],
            order: { createdAt: 'DESC' },
        });
    }

    async getSummary(listingId: string) {
        const reviews = await this.reviewRepo.find({ where: { listing: { id: listingId } } });

        const count = reviews.length;
        const ratingBar = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        const categories = ['priceRating', 'comfortRating', 'locationRating', 'cleanlinessRating', 'communicationRating'];

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


// async findOne(id: number): Promise<AccomReview> {
//     const review = await this.reviewRepo.findOne({
//         where: { id },
//         relations: ['listing']
//     });
//     if (!review) {
//         throw new NotFoundException(`Review with ID ${id} not found`);
//     }
//     return review;
// }

// async findByListingId(listingId: number): Promise<AccomReview[]> {
//     return this.reviewRepo.find({
//         where: {
//             listing: {
//                 id: listingId,
//             } as any,
//         },
//         relations: ['listing', 'reviewer'],
//     });
// }

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Listing } from '../listing/listing.entity';

@Entity()
export class AccomReview {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    priceRating: number;

    @Column('int')
    comfortRating: number;

    @Column('int')
    locationRating: number;

    @Column('int')
    cleanlinessRating: number;

    @Column('int')
    communicationRating: number;

    @Column({ type: 'text' })
    comment: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.accomReviews, { onDelete: 'CASCADE' })
    reviewer: User;

    @ManyToOne(() => Listing, (listing) => listing.accomReviews, { onDelete: 'CASCADE' })
    listing: Listing;
}

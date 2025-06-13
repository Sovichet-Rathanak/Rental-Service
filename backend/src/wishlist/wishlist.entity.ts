import { Listing } from 'src/listing/listing.entity';
import { User } from 'src/user/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (tenant) => tenant.wishlist, {
    eager: true,
    onDelete: 'CASCADE',
  })
  tenant: User;

  @ManyToOne(() => Listing, (listing) => listing.wishlist, {
    eager: true,
    onDelete: 'CASCADE',
  })
  listing: Listing;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

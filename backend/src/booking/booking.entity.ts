import { Listing } from 'src/listing/listing.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BookingStatus } from './enum/booking-status.enum';
import { RentalDuration } from './enum/rental-duration.enum';
import { RentalDecision } from 'src/rental-decision/rental-decision.entity';

@Entity()
@Unique(['tenant', 'listing', 'tourDate'])
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (tenant) => tenant.booking, { onDelete: 'CASCADE' })
  tenant: User;

  @ManyToOne(() => Listing, (listing) => listing.booking, {
    onDelete: 'CASCADE',
  })
  listing: Listing;

  @Column({ type: 'timestamptz' })
  tourDate: Date;

  @Column({ type: 'date' })
  moveInDate: string;

  @Column({ type: 'date' })
  moveOutDate: string;

  @Column()
  rentalDuration: RentalDuration;

  @Column()
  numbTenant: number;

  @Column({ default: 'pending' })
  status: BookingStatus;

  @Column({ type: 'timestamp', nullable: true })
  decisionAt: Date;

  @OneToOne(() => RentalDecision, (rentalDecision) => rentalDecision.booking, {
    nullable: true,
  })
  rentalDecision: RentalDecision;

  @CreateDateColumn()
  createdAt: Date;
}

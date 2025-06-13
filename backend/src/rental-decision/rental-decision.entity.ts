import { Booking } from 'src/booking/booking.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LandlordDecision } from './enum/landlord-decision.enum';
import { TenantResponse } from './enum/tenant-response.enum';

@Entity()
export class RentalDecision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Booking, (booking) => booking.rentalDecision)
  @JoinColumn()
  booking: Booking;

  @Column({ default: 'pending' })
  landlordDecision: LandlordDecision;

  @Column({ type: 'timestamp', nullable: true })
  landlordDecisionAt: Date;

  @Column({ default: 'waiting' })
  tenantResponse: TenantResponse;

  @Column({ type: 'timestamp', nullable: true })
  tenantResponseAt: Date;
}

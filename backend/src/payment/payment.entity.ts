import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Listing } from 'src/listing/listing.entity';
import { Booking } from 'src/booking/booking.entity';
import { PaymentStatus } from './enum/payment-status.enum';
import { PaymentMethod } from './enum/payment-method.enum';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.payment, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Listing, { nullable: true })
  listing: Listing;

  @ManyToOne(() => Booking, { nullable: true })
  booking: Booking;

  @Column({ nullable: true })
  paymentInfoId: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CREDIT_CARD,
  })
  paymentMethod: PaymentMethod;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Column({ type: 'varchar', nullable: true })
  transactionId: string;

  @CreateDateColumn()
  paymentDate: Date;
}

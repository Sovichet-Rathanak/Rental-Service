import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user_role.enum';
import { AccomReview } from 'src/accom-review/accom-review.entity';
import { Wishlist } from 'src/wishlist/wishlist.entity';
import { Booking } from 'src/booking/booking.entity';
import { Payment } from 'src/payment/payment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'tenant' })
  role: UserRole;

  @OneToMany(() => AccomReview, (review) => review.user)
  accomReviews: AccomReview[];

  @Column({ nullable: true })
  pfp_original_url: string;

  @Column({ nullable: true })
  pfp_thumbnail_url: string;

  @OneToMany(() => Booking, (booking) => booking.tenant)
  booking: Booking[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.tenant)
  wishlist: Wishlist[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payment: Payment[];
}

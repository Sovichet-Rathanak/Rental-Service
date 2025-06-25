import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';
@Entity()
export class PaymentInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  paymentDate: Date;

  @Column({ length: 16, nullable: true })
  cardNumber: string;

  @Column({ length: 5, nullable: true })
  expiryDate: string;

  @Column({ length: 3, nullable: true })
  cvv: string;

  @Column({ nullable: true })
  streetAddress: string;

  @Column({ nullable: true })
  aptSuiteUnit: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { NotificationType } from './enum/notification-type.enum';
import { NotificationStatus } from './enum/notification-status.enum';
import { NotificationRole } from './enum/notification-role.enum';
import { User } from 'src/user/user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  senderId?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'senderId' })
  sender?: User;

  @Column()
  message: string;

  @Column({ nullable: true })
  bookingId?: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
    nullable: true,
  })
  type: NotificationType;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.PENDING,
  })
  status: NotificationStatus;

  @Column({
    type: 'enum',
    enum: NotificationRole,
    default: NotificationRole.TENANT,
  })
  role: NotificationRole;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { NotificationService } from './notification.service';
import { Notification } from './notification.entity';
import { NotificationController } from './notification.controller';
import { Booking } from 'src/booking/booking.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, User, Booking]),
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
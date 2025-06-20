import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './paymentInfo.entity';
import { PaymentService } from './paymentInfo.service';
import { PaymentController } from './paymentInfo.controller';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentInfoModule {}

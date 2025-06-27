import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentInfo } from './paymentInfo.entity';
import { PaymentInfoService } from './paymentInfo.service';
import { PaymentInfoController } from './paymentInfo.controller';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentInfo, User])],
  controllers: [PaymentInfoController],
  providers: [PaymentInfoService],
})
export class PaymentInfoModule {}

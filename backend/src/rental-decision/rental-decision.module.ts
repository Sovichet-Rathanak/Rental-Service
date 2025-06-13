import { Module } from '@nestjs/common';
import { RentalDecisionController } from './rental-decision.controller';
import { RentalDecisionService } from './rental-decision.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/booking/booking.entity';
import { RentalDecision } from './rental-decision.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentalDecision, Booking])],
  controllers: [RentalDecisionController],
  providers: [RentalDecisionService],
  exports: [RentalDecisionService],
})
export class RentalDecisionModule {}

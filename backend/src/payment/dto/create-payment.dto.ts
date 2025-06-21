import {
  IsUUID,
  IsEnum,
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { PaymentMethod } from '../enum/payment-method.enum';
import { PaymentStatus } from '../enum/payment-status.enum';

export class CreatePaymentDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  listingId?: string;

  @IsOptional()
  @IsUUID()
  bookingId?: string;

  @IsOptional()
  @IsUUID()
  paymentInfoId?: string;

  @IsNumber()
  amount: number;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;

  @IsString()
  @IsNotEmpty()
  transactionId: string;
}

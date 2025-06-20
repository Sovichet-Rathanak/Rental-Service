import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { PaymentStatus } from '../paymentInfo.entity';

export class CreatePaymentDto {
  @IsString()
  userId: string;

  @IsString()
  @Matches(/^\d{16}$/, { message: 'Card number must be exactly 16 digits' })
  cardNumber: string;

  @IsString()
  @Matches(/^\d{2}\/\d{2}$/, { message: 'Expiry date must be in MM/YY format' })
  expiryDate: string;

  @IsString()
  @Matches(/^\d{3}$/, { message: 'CVV must be exactly 3 digits' })
  cvv: string;

  @IsString()
  streetAddress: string;

  @IsOptional()
  @IsString()
  aptSuiteUnit: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zipCode: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}

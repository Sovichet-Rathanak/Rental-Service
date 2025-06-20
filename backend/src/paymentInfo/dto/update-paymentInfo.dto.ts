import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-paymentInfo.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}

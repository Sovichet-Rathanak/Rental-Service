import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentInfoDto } from './create-paymentInfo.dto';

export class UpdatePaymentInfoDto extends PartialType(CreatePaymentInfoDto) {}

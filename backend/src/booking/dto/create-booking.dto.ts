import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  // IsUUID,
} from 'class-validator';
import { RentalDuration } from '../enum/rental-duration.enum';

export class CreateBookingDto {
  // @IsUUID()
  tenantId: string;

  // @IsUUID()
  listingId: string;

  @IsDateString()
  @IsNotEmpty()
  tourDate: string;

  @IsString()
  @IsNotEmpty()
  tourTime: string;

  @IsDateString()
  moveInDate: string;

  @IsEnum(RentalDuration)
  rentalDuration: RentalDuration;
}

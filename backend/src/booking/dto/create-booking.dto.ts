import { IsDateString, IsEnum, IsInt, IsUUID, Min } from 'class-validator';
import { RentalDuration } from '../enum/rental-duration.enum';

export class CreateBookingDto {
  @IsUUID()
  tenantId: string;

  @IsUUID()
  listingId: string;

  @IsDateString()
  tourDate: string;

  @IsDateString()
  moveInDate: string;

  @IsEnum(RentalDuration)
  rentalDuration: RentalDuration;

  @IsInt()
  @Min(1)
  numbTenant: number;
}

import { IsEnum, IsString, IsOptional } from 'class-validator';
import { NotificationType } from '../enum/notification-type.enum';

export class NotifyBookingActionDto {

  @IsString()
  tenantUserId: string;

  @IsString()
  landlordUserId: string;

  @IsEnum(['approve', 'decline', 'cancel', 'pay'])
  action: 'approve' | 'decline' | 'cancel' | 'pay';

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsOptional()
  @IsString()
  bookingId?: string;
}

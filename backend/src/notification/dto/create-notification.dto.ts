import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { NotificationStatus } from '../enum/notification-status.enum';
import { NotificationType } from '../enum/notification-type.enum';

export class CreateNotificationDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsString()
  listingId?: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsEnum(NotificationStatus)
  status: NotificationStatus;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}

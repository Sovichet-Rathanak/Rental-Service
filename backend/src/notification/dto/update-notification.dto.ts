// src/notification/dto/update-notification.dto.ts
import { IsEnum, IsOptional } from 'class-validator';
import { NotificationStatus } from '../enum/notification-status.enum';

export class UpdateNotificationDto {
  @IsOptional()
  @IsEnum(NotificationStatus)
  status?: NotificationStatus;
}

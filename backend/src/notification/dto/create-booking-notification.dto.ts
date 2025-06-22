import { IsString, IsEnum } from 'class-validator';

export class CreateBookingNotificationDto {
    @IsString()
    senderId: string;
    
    @IsString()
    receiverId: string; 

    @IsEnum(['rent', 'tour'])
    type: 'rent' | 'tour';

    @IsString()
    bookingId: string;

    @IsString()
    tenantName: string; // to personalize messages for landlord
}

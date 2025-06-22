import { Controller, Post, Body, Get, Query, Req, Patch, Param, BadRequestException, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationStatus } from './enum/notification-status.enum';
import { NotifyBookingActionDto } from './dto/notify-booking-action.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateBookingNotificationDto } from './dto/create-booking-notification.dto';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  // Create a single notification manually (optional, for testing or admin)
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  /**
   * Create booking notifications for tenant and landlord
   * Called when tenant initiates a booking request (e.g., clicks "Check availability")
   */
  @Post('booking/request')
  async createBookingNotifications(@Body() dto: CreateBookingNotificationDto, @Req() req) {
    const senderId = req.user.id;
    return this.notificationService.createBookingNotifications({
      senderId,
      receiverId: dto.receiverId, // landlord ID
      type: dto.type,
      bookingId: dto.bookingId,
      tenantName: dto.tenantName,
    });
  }

  /**
   * Notify booking actions - approve, decline, cancel, pay
   * Called when landlord or tenant performs an action on a booking
   */
  @Post('booking/action')
  async notifyBookingAction(@Body() dto: NotifyBookingActionDto, @Req() req) {
    const actorUserId = req.user.id;
    return this.notificationService.notifyBookingAction(
      actorUserId,
      dto.tenantUserId,
      dto.landlordUserId,
      dto.action,
      dto.type,
      dto.bookingId,
    );
  }

  // Get all notifications by userId query param
  @Get()
  findAll(@Query('userId') userId: string) {
    return this.notificationService.findAll(userId);
  }

  // Get notification by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(id);
  }

  // Get notifications by userId param
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.notificationService.findByUserId(userId);
  }

  // Update notification partially (status, isRead, etc.)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateNotificationDto) {
    return this.notificationService.update(id, updateDto);
  }

  // Separate patch for updating status with validation
  @Patch(':id/status')
  updateNotificationStatus(
    @Param('id') id: string,
    @Body('status') status: string
  ) {
    if (!Object.values(NotificationStatus).includes(status as NotificationStatus)) {
      throw new BadRequestException('Invalid status value');
    }
    return this.notificationService.updateStatus(id, status as NotificationStatus);
  }

  /**
   * Perform action on notification (approve, decline, cancel, pay)
   * Typically called from frontend actions on notification UI
   */
  @Post(':id/action')
  async performAction(
    @Param('id') id: string,
    @Body('action') action: 'approve' | 'decline' | 'cancel' | 'pay',
    @Req() req
  ) {
    const userId = req.user.id; // Use 'id' instead of 'userId' for consistency
    return this.notificationService.handleAction(id, userId, action);
  }
}

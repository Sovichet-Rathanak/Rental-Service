import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { NotificationType } from './enum/notification-type.enum';
import { NotificationStatus } from './enum/notification-status.enum';
import { NotificationRole } from './enum/notification-role.enum';
import { Booking } from 'src/booking/booking.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,

    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create a single notification
  async createNotification(data: Partial<Notification>): Promise<Notification> {
    const notification = this.notificationRepository.create(data);
    return this.notificationRepository.save(notification);
  }

  // Handle booking actions and create notifications for tenant and landlord
  async notifyBookingAction(
    actorUserId: string,
    tenantUserId: string,
    landlordUserId: string,
    action: 'approve' | 'decline' | 'cancel' | 'pay',
    type: NotificationType,
    bookingId?: string,
  ): Promise<Notification[]> {
    const actor = await this.userRepository.findOneBy({ id: actorUserId });
    const tenant = await this.userRepository.findOneBy({ id: tenantUserId });
    const landlord = await this.userRepository.findOneBy({ id: landlordUserId });

    if (!actor || !tenant || !landlord) {
      throw new NotFoundException('Invalid users provided.');
    }

    const messages = {
      approve: {
        tenant: `Your ${type} request was approved by the landlord.`,
        landlord: `You approved the tenant’s ${type} request.`,
        status: NotificationStatus.APPROVED,
      },
      decline: {
        tenant: `Your ${type} request was declined by the landlord.`,
        landlord: `You declined the tenant’s ${type} request.`,
        status: NotificationStatus.DECLINED,
      },
      cancel: {
        tenant: `You cancelled your ${type} request.`,
        landlord: `${type.charAt(0).toUpperCase() + type.slice(1)} request was cancelled by the tenant.`,
        status: NotificationStatus.CANCELLED,
      },
      pay: {
        tenant: `You have successfully paid for the ${type}.`,
        landlord: `Tenant has paid for the ${type}.`,
        status: NotificationStatus.PAID,
      },
    };

    const current = messages[action];

    const notifications: Partial<Notification>[] = [
      {
        userId: tenant.id,
        senderId: actor.id,
        message: current.tenant,
        bookingId,
        type,
        role: NotificationRole.TENANT,
        status: current.status,
      },
      {
        userId: landlord.id,
        senderId: actor.id,
        message: current.landlord,
        bookingId,
        type,
        role: NotificationRole.LANDLORD,
        status: current.status,
      },
    ];

    const savedNotifications = await Promise.all(
      notifications.map((notif) => this.createNotification(notif)),
    );

    return savedNotifications;
  }

  // Find all notifications by userId, ordered by newest first
  async findAll(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  // Find one notification by its ID
  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOneBy({ id });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  // Alias for findAll — find notifications by user ID
  async findByUserId(userId: string): Promise<Notification[]> {
    return this.findAll(userId);
  }

  // Partial update for notification (e.g. status, isRead)
  async update(id: string, updateDto: Partial<Notification>): Promise<Notification> {
    const notification = await this.notificationRepository.findOneBy({ id });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    Object.assign(notification, updateDto);
    return this.notificationRepository.save(notification);
  }

  // Specifically update only the status field (optional)
  async updateStatus(id: string, status: NotificationStatus): Promise<Notification> {
    const notification = await this.notificationRepository.findOneBy({ id });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.status = status;
    return this.notificationRepository.save(notification);
  }

  async handleAction(notificationId: string, userId: string, action: 'approve' | 'decline' | 'cancel' | 'pay') {
    const notification = await this.notificationRepository.findOneBy({ id: notificationId });
    if (!notification) throw new NotFoundException('Notification not found');

    // Verify that the user has rights to perform this action (e.g. is tenant or landlord related to notification)
    if (notification.userId !== userId) {
      throw new ForbiddenException('You are not allowed to perform this action');
    }

    // Update notification status accordingly
    const validStatuses = {
      approve: NotificationStatus.APPROVED,
      decline: NotificationStatus.DECLINED,
      cancel: NotificationStatus.CANCELLED,
      pay: NotificationStatus.PAID,
    };

    if (!validStatuses[action]) {
      throw new BadRequestException('Invalid action');
    }

    notification.status = validStatuses[action];
    await this.notificationRepository.save(notification);

    // Optionally: notify other user or update related booking status here

    return notification;
  }

  async createBookingNotifications({
    senderId,
    receiverId,
    type,
    bookingId,
    tenantName,
  }: {
    senderId: string;
    receiverId: string;
    type: 'rent' | 'tour';
    bookingId: string;
    tenantName: string;
  }) {
    if (!senderId || !receiverId) {
      throw new BadRequestException('Sender and receiver user IDs must be provided');
    }

    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
      relations: ['listing', 'listing.owner', 'tenant'],  // <- important!
    });

    if (!booking) throw new NotFoundException('Booking not found');

    const houseTitle = booking.listing?.title || 'a listing';

    const tenantMessage = `You have requested a ${type} to ${houseTitle}`;
    const landlordMessage = `${tenantName} has requested a ${type} of ${houseTitle}`;

    const tenantNotification = this.notificationRepository.create({
      userId: senderId,
      bookingId: bookingId,
      type: type === 'rent' ? NotificationType.RENT : NotificationType.TOUR,
      message: tenantMessage,
      status: NotificationStatus.PENDING,
    });

    const landlordNotification = this.notificationRepository.create({
      userId: receiverId,
      bookingId: bookingId,
      type: type === 'rent' ? NotificationType.RENT : NotificationType.TOUR,
      message: landlordMessage,
      status: NotificationStatus.PENDING,
    });

    await this.notificationRepository.save([tenantNotification, landlordNotification]);

    return { tenantNotification, landlordNotification };
  }


}

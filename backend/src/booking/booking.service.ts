import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from 'src/listing/listing.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingStatus } from './enum/booking-status.enum';
import { RentalDuration } from './enum/rental-duration.enum';
import { RentingStatus } from './enum/reting-status.enum';
import { RentingListItem } from './dto/get-renting-list.dto';

@Injectable()
export class BookingService {
  private readonly CAMBODIA_OFFSET = 7 * 60 * 60 * 1000; // UTC+7 in milliseconds

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,

    @InjectRepository(Listing)
    private readonly listingRepo: Repository<Listing>,
  ) {}

  async getAll(): Promise<Booking[]> {
    return this.bookingRepo.find({});
  }

  async createBooking(dto: CreateBookingDto) {
    console.log('Recieve booking data:', dto);
    const listing = await this.listingRepo.findOne({
      where: { id: dto.listingId },
    });
    if (!listing) {
      console.log('Listing not found:', dto.listingId);
      throw new NotFoundException('Listing not found');
    }

    // Combine date and time (treat as local Cambodia time)
    const tourDateTime = this.combineDateAndTime(dto.tourDate, dto.tourTime);
    const tourTime = this.formatTime(tourDateTime);

    // For storage and comparison, use UTC date at midnight
    const tourDate = new Date(tourDateTime);
    tourDate.setUTCHours(0, 0, 0, 0);

    const existing = await this.bookingRepo.findOne({
      where: {
        listing: { id: dto.listingId },
        tourDate: tourDate,
        tourTime: tourTime,
      },
    });

    if (existing) {
      throw new BadRequestException('This time slot is already booked');
    }

    const moveInDate = this.convertToCambodiaTime(new Date(dto.moveInDate));
    let moveOutDate: Date;

    if (dto.rentalDuration === RentalDuration.MONTHLY) {
      moveOutDate = this.addMonths(moveInDate, 1);
    } else if (dto.rentalDuration === RentalDuration.YEARLY) {
      moveOutDate = this.addYears(moveInDate, 1);
    } else {
      throw new BadRequestException('Invalid rental duration');
    }

    const booking = this.bookingRepo.create({
      listing: { id: dto.listingId },
      tenant: { id: dto.tenantId },
      tourDate: this.formatDateOnly(tourDate),
      tourTime: tourTime,
      moveInDate: this.formatDateOnly(moveInDate),
      moveOutDate: this.formatDateOnly(moveOutDate),
      rentalDuration: dto.rentalDuration,
    });
    const savedBooking = await this.bookingRepo.save(booking);
      return this.bookingRepo.findOne({
    where: { id: savedBooking.id },
    relations: ['listing', 'listing.owner', 'tenant'],
  });
  }

  async cancelBooking(id: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['tenant'],
    });

    if (!booking) throw new NotFoundException('Booking not found');

    if (booking.status !== BookingStatus.PENDING)
      throw new BadRequestException(
        'Cannot cancel after decision from landlord',
      );

    booking.status = BookingStatus.CANCEL;
    return this.bookingRepo.save(booking);
  }

  async acceptBooking(id: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['listing'],
    });

    if (!booking) throw new NotFoundException('Booking not found');

    booking.status = BookingStatus.TOUR_ACCEPTED;
    booking.decisionAt = this.getCurrentCambodiaTime();
    return this.bookingRepo.save(booking);
  }

  async rejectBooking(id: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['listing'],
    });
    if (!booking) throw new NotFoundException('Booking not found');

    booking.status = BookingStatus.TOUR_REJECTED;
    booking.decisionAt = this.getCurrentCambodiaTime();
    return this.bookingRepo.save(booking);
  }

  //Renting list
  async getRentingList(tenantId: string): Promise<RentingListItem[]> {
    const bookings = await this.bookingRepo.find({
      where: {
        tenant: { id: tenantId },
        status: BookingStatus.ACCEPT,
      },
      relations: ['listing', 'listing.pictures', 'listing.region'],
      order: { moveInDate: 'ASC' },
    });

    const today = new Date();

    const rentingList: RentingListItem[] = bookings.map((booking) => {
      const moveIn = new Date(booking.moveInDate);
      const moveOut = new Date(booking.moveOutDate);

      let rentingStatus: RentingStatus;
      if (moveOut < today) {
        rentingStatus = RentingStatus.PAST;
      } else if (moveIn > today) {
        rentingStatus = RentingStatus.UPCOMMING;
      } else {
        rentingStatus = RentingStatus.CURRENT;
      }

      return {
        id: booking.id,
        moveInDate: booking.moveInDate,
        moveOutDate: booking.moveOutDate,
        retalDuration: booking.rentalDuration,
        listing: {
          id: booking.listing.id,
          title: booking.listing.title,
          price_monthly: booking.listing.price_monthly,
          region: booking.listing.region,
          songkat: booking.listing.songkat,
          street_address: booking.listing.street_address,
          pictures: booking.listing.pictures,
        },
        rentingStatus,
      };
    });

    return rentingList;
  }

  async getLandlordInvoices(): Promise<any[]> {
    const bookings = await this.bookingRepo.find({
      relations: ['tenant', 'listing', 'listing.owner'],
    });

    const invoices = bookings.map((booking) => {
      return {
        id: booking.id,
        landlordName: `${booking.listing.owner.firstname} ${booking.listing.owner.lastname}`,
        tenantName: `${booking.tenant.firstname} ${booking.tenant.lastname}`,
        properties: booking.listing.title ?? 'Unknown Property',
        address: `${booking.listing.street_address}, ${booking.listing.songkat}`,
        totalPayment: '$500',
        dueDate: booking.moveOutDate,
        duration: `${booking.moveInDate} - ${booking.moveOutDate}`,
        status: 'Paid',
      };
    });

    return invoices;
  }

  async getTenantInvoices(tenantId: string): Promise<any[]> {
    const bookings = await this.bookingRepo.find({
      where: { tenant: { id: tenantId } },
      relations: ['listing', 'listing.owner'],
    });

    const invoices = bookings.map((booking) => {
      return {
        id: booking.id,
        landlordName: `${booking.listing.owner.firstname} ${booking.listing.owner.lastname}`,
        properties: booking.listing.title ?? 'Unknown Property',
        address: `${booking.listing.street_address}, ${booking.listing.songkat}`,
        totalPayment: '$400',
        dueDate: booking.moveOutDate,
        duration: `${booking.moveInDate} - ${booking.moveOutDate}`,
        status: 'Pending',
        action: 'Download',
        icon: 'mi:share',
      };
    });

    return invoices;
  }

  async getBookedDates(listingId: string) {
    const bookings = await this.bookingRepo.find({
      where: { listing: { id: listingId } },
      select: ['tourDate', 'tourTime'],
    });

    return {
      bookedDates: bookings.map((b) => this.formatDateOnly(b.tourDate)),
      bookedTimes: bookings.map((b) => ({
        date: this.formatDateOnly(b.tourDate),
        time: b.tourTime, // Use stored time directly
      })),
    };
  }

  private getCurrentCambodiaTime(): Date {
    return new Date(Date.now() + this.CAMBODIA_OFFSET);
  }

  private convertToCambodiaTime(date: Date): Date {
    return new Date(date.getTime() + this.CAMBODIA_OFFSET);
  }

  private formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

  private formatDateOnly(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private combineDateAndTime(dateStr: string, timeStr: string): Date {
    const date = new Date(dateStr);
    // eslint-disable-next-line prefer-const
    let [time, period] = timeStr.split(' ');
    // eslint-disable-next-line prefer-const
    let [hours, minutes] = time.split(':').map(Number);

    // Convert 12-hour format to 24-hour
    if (period) {
      period = period.toUpperCase();
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
    }

    // Set local time components (no UTC conversion)
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  private addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    if (result.getDate() !== date.getDate()) {
      result.setDate(0);
    }
    return result;
  }

  private addYears(date: Date, years: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
  }
  async updateStatus(id: string, status: BookingStatus): Promise<Booking> {
    const booking = await this.bookingRepo.findOne({ where: { id } });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    booking.status = status;
    return this.bookingRepo.save(booking);
  }

}

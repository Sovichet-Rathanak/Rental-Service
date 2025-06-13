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
@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,

    @InjectRepository(Listing)
    private readonly listingRepo: Repository<Listing>,
  ) {}

  //Get all listing
  async getAll(): Promise<Booking[]> {
    return this.bookingRepo.find({});
  }

  //create booking
  async createBooking(dto: CreateBookingDto) {
    const listing = await this.listingRepo.findOne({
      where: { id: dto.listingId },
    });
    if (!listing) throw new NotFoundException('Listing not found');

    const existing = await this.bookingRepo.findOne({
      where: {
        listing: { id: dto.listingId },
        tourDate: new Date(dto.tourDate),
      },
    });

    if (existing) {
      throw new BadRequestException(
        'Only one tour per day for a listing is allowed',
      );
    }

    const moveInDate = new Date(dto.moveInDate);
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
      tourDate: new Date(dto.tourDate).toISOString(),
      moveInDate: new Date(dto.moveInDate).toISOString().split('T')[0],
      moveOutDate: moveOutDate.toISOString().split('T')[0],
      rentalDuration: dto.rentalDuration,
      numbTenant: dto.numbTenant,
    });
    return this.bookingRepo.save(booking);
  }

  //cancel booking
  async cancelBooking(id: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['tenant'],
    });

    if (!booking) throw new NotFoundException('Booking not found');

    // if (booking.tenant.id !== user.id)
    //   throw new ForbiddenException('Access denial');

    if (booking.status !== BookingStatus.PENDING)
      throw new BadRequestException(
        'Cannot cancel after dicision from landlord',
      );

    booking.status = BookingStatus.CANCEL;
    return this.bookingRepo.save(booking);
  }

  //landlord accept request
  async acceptBooking(id: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['listing'],
    });

    if (!booking) throw new NotFoundException('Booking not found');

    booking.status = BookingStatus.ACCEPT;
    booking.decisionAt = new Date();
    return this.bookingRepo.save(booking);
  }

  //landlord reject request
  async rejectBooking(id: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['listing'],
    });
    if (!booking) throw new NotFoundException('Booking not found');
    // if (booking.listing.ownerId !== landlord.id)
    //   throw new ForbiddenException('Not your listing');

    booking.status = BookingStatus.REJECT;
    booking.decisionAt = new Date();
    return this.bookingRepo.save(booking);
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
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RentingListItem } from './dto/get-renting-list.dto';
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async getAll() {
    return this.bookingService.getAll();
  }

  @Post()
  async create(@Body() dto: CreateBookingDto) {
    try {
      return await this.bookingService.createBooking(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    return this.bookingService.cancelBooking(id);
  }

  @Patch(':id/accept')
  async accept(@Param('id') id: string) {
    return this.bookingService.acceptBooking(id);
  }

  @Patch(':id/reject')
  async reject(@Param('id') id: string) {
    return this.bookingService.rejectBooking(id);
  }

  // booking.controller.ts
  @Get('availability/:listingId')
  async getBookedDates(@Param('listingId') listingId: string) {
    return this.bookingService.getBookedDates(listingId);
  }

  @Get('renting-list/:tenantId')
  async getRentingList(
    @Param('tenantId') tenantId: string,
  ): Promise<RentingListItem[]> {
    return this.bookingService.getRentingList(tenantId);
  }

  @Get('/landlord-invoices')
  async getLandlordInvoices() {
    return this.bookingService.getLandlordInvoices();
  }

  @Get('/tenant-invoices/:tenantId')
  async getTenantInvoices(@Param('tenantId') tenantId: string) {
    return this.bookingService.getTenantInvoices(tenantId);
  }
}

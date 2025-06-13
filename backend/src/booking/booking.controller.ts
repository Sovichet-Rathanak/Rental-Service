import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  // UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
// import { AuthGuard } from 'src/auth/guards/auth.guard';
// import { RolesGuard } from 'src/auth/guards/role.guard';
// import { Roles } from 'src/auth/decorator/roles.decorator';
// import { UserDecorator } from 'src/user/user.decorator';

@Controller('booking')
// @UseGuards(AuthGuard, RolesGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async getAll() {
    return this.bookingService.getAll();
  }

  @Post()
  // @Roles('tenant')
  async create(@Body() dto: CreateBookingDto) {
    return this.bookingService.createBooking(dto);
  }

  @Patch(':id/cancel')
  // @Roles('tenant')
  async cancel(@Param('id') id: string) {
    return this.bookingService.cancelBooking(id);
  }

  @Patch(':id/accept')
  // @Roles('landlord')
  async accept(@Param('id') id: string) {
    return this.bookingService.acceptBooking(id);
  }

  @Patch(':id/reject')
  // @Roles('landlord')
  async reject(@Param('id') id: string) {
    return this.bookingService.rejectBooking(id);
  }
}

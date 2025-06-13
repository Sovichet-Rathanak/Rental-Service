import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RentalDecisionService } from './rental-decision.service';
import {
  UpdateLandlordDecisionDto,
  UpdateTenantResponseDto,
} from './dto/update-rental-decision.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('rental-decision')
export class RentalDecisionController {
  constructor(private readonly rentalDecisionService: RentalDecisionService) {}

  @Post(':bookingId/landlord-decision')
  @Roles('landlord')
  landlordDecision(
    @Param('bookingId') bookingId: string,
    @Body() dto: UpdateLandlordDecisionDto,
    // @User() landlord: UserEntity,
  ) {
    return this.rentalDecisionService.updateLandlordDecision(
      bookingId,
      dto.landlordDecision,
    );
  }

  @Patch(':bookingId/tenant-response')
  @Roles('tenant')
  updateTenantResponse(
    @Param('bookingId') bookingId: string,
    @Body() updateDto: UpdateTenantResponseDto,
  ) {
    return this.rentalDecisionService.updateTenantResponse(
      bookingId,
      updateDto.tenantResponse,
    );
  }

  @Get(':bookingId')
  getByBookingId(@Param('bookingId') bookingId: string) {
    return this.rentalDecisionService.getByBookingId(bookingId);
  }
}

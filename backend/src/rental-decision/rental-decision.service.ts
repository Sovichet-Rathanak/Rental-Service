import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RentalDecision } from './rental-decision.entity';
import { Repository } from 'typeorm';
import { LandlordDecision } from './enum/landlord-decision.enum';
import { TenantResponse } from './enum/tenant-response.enum';

@Injectable()
export class RentalDecisionService {
  constructor(
    @InjectRepository(RentalDecision)
    private rentalDecisionRepo: Repository<RentalDecision>,
  ) {}

  async updateLandlordDecision(
    bookingId: string,
    landlordDecision: LandlordDecision,
  ): Promise<RentalDecision> {
    const decison = await this.getByBookingId(bookingId);

    if (decison.landlordDecision !== LandlordDecision.PENDING) {
      throw new BadRequestException('Landlord decison already made');
    }

    decison.landlordDecision = landlordDecision;
    decison.landlordDecisionAt = new Date();

    return this.rentalDecisionRepo.save(decison);
  }

  async updateTenantResponse(
    bookingId: string,
    tenantResponse: TenantResponse,
  ): Promise<RentalDecision> {
    const decision = await this.getByBookingId(bookingId);

    if (decision.landlordDecision !== LandlordDecision.ACCEPT) {
      throw new BadRequestException(
        'Tenant cannot response untill landlord accepted',
      );
    }

    if (decision.tenantResponse !== TenantResponse.WAITING) {
      throw new BadRequestException('Tenant response already given');
    }

    decision.tenantResponse = tenantResponse;
    decision.tenantResponseAt = new Date();

    return this.rentalDecisionRepo.save(decision);
  }

  async getByBookingId(bookingId: string): Promise<RentalDecision> {
    const decision = await this.rentalDecisionRepo.findOne({
      where: { booking: { id: bookingId } },
    });

    if (!decision) {
      throw new NotFoundException('Rental decision not found for this booking');
    }

    return decision;
  }
}

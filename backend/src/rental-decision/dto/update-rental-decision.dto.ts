import { IsEnum } from 'class-validator';
import { LandlordDecision } from '../enum/landlord-decision.enum';
import { TenantResponse } from '../enum/tenant-response.enum';

export class UpdateLandlordDecisionDto {
  @IsEnum(LandlordDecision)
  landlordDecision: LandlordDecision;
}

export class UpdateTenantResponseDto {
  @IsEnum(TenantResponse)
  tenantResponse: TenantResponse;
}

import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class FilterListingDto {
    @IsOptional()
    @IsUUID('all', { each: true })
    regions?: string[];

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    guests?: number;

    @IsOptional()
    @IsString()
    furnishing?: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    minMonthlyPrice?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    maxMonthlyPrice?: number;
}
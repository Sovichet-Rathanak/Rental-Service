import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { PropertyType } from "../property_type.enum";

export class createListingDTO {
    @IsEnum(PropertyType)
    @IsOptional()
    property_type: PropertyType;

    // @IsString()
    // @IsOptional()
    // p

    @IsString()
    @IsOptional()
    street_address: string;

    @IsString()
    @IsOptional()
    region_id: string

    @IsString()
    @IsOptional()
    songkat: string;

    @IsNumber()
    @IsOptional()
    guests: number;

    @IsOptional()
    @IsNumber()
    bedrooms: number;

    @IsOptional()
    @IsNumber()
    bathrooms: number;

    @IsOptional()
    @IsBoolean()
    furnishing: boolean;

    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    price_monthly: number;

    @IsOptional()
    @IsNumber()
    price_yearly: number;

    @IsArray()
    @IsOptional()
    amenity_id: string[];

    @IsOptional()
    status?: 'draft' | 'published';
}
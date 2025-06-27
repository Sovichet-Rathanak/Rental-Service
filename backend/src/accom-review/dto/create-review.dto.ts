import { IsInt, IsString, Min, Max, IsOptional, IsUUID } from 'class-validator';

export class CreateAccomReviewDto {
    @IsUUID()
    listing: string;

    @IsUUID()
    user: string; 

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(5)
    priceRating: number;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(5)
    comfortRating: number;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(5)
    locationRating: number;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(5)
    cleanlinessRating: number;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(5)
    communicationRating: number;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(5)
    overallRating: number;

    @IsString()
    @IsOptional()
    comment: string;
}

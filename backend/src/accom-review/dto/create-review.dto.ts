import { IsInt, IsString, Min, Max, IsOptional } from 'class-validator';

export class CreateAccomReviewDto {
    @IsString()
    listing: string;

    @IsString()
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

    @IsString()
    @IsOptional()
    comment: string;
}

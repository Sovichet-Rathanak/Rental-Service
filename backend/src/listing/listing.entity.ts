import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PropertyType } from "./property_type.enum";
import { Region } from "src/region/region.entity";
import { Amenity } from "src/amenity/amenity.entity";
import { Picture } from "src/picture/picture.entity";
import { AccomReview } from "src/accom-review/accom-review.entity";

@Entity()
export class Listing {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Column()
    // owner: FK

    @Column({ nullable: true })
    property_type: PropertyType;

    @ManyToOne(() => Region, region => region.listings, { eager: true, nullable: false })
    @JoinColumn({ name: "region_id" })
    region: Region;

    @Column({ nullable: true })
    street_address: string;

    @Column({ nullable: true })
    songkat: string;

    @Column({ nullable: true, default: 1 })
    guests: number;

    @Column({ nullable: true, default: 1 })
    bedrooms: number;

    @Column({ nullable: true, default: 1 })
    bathrooms: number;

    @Column({ nullable: true, default: false })
    furnishing: boolean;

    @ManyToMany(()=>Amenity, (amenity) => amenity.listing, {eager: true})
    @JoinTable()
    amenities: Amenity[];

    @OneToMany(()=> Picture, picture => picture.listing)
    pictures: Picture[];

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    price_monthly: number;

    @Column({ nullable: true })
    price_yearly: number;
    
    @OneToMany(() => AccomReview, (review) => review.listing) // add here
    accomReviews: AccomReview[];
}   
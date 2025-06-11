import { Listing } from "src/listing/listing.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { AmenityType } from "./amenity_type.enum";

@Entity()
export class Amenity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    icon_name: string;

    @Column({ type: 'enum', enum: AmenityType})
    type: AmenityType

    @ManyToMany(() => Listing, (listing) => listing.amenities)
    listing: Listing[]
}
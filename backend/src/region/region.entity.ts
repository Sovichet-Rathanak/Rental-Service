import { Listing } from "src/listing/listing.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Region{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({unique: true})
    region_name: string;

    @OneToMany(() => Listing, listing => listing.region_id)
    listings: Listing[];
}
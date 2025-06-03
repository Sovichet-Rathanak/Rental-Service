import { Listing } from "src/listing/listing.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Picture {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    original_url: string;

    @Column()
    thumbnail_url: string;

    @Column({ default: false })
    isThumbnail: boolean;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Listing, listing => listing.pictures, { onDelete: 'CASCADE' })
    listing: Listing;
}

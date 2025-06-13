import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user_role.enum";
import { AccomReview } from "src/accom-review/accom-review.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    firstname: string;

    @Column({ length: 50 })
    lastname: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({default: 'tenant'})
    role: UserRole;
    @OneToMany(() => AccomReview, (review) => review.user) //add here
    accomReviews: AccomReview[];


}
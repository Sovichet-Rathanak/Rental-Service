import { DataSource } from "typeorm";
import { Picture } from "./picture/picture.entity";
import { Booking } from "./booking/booking.entity";
import { Listing } from "./listing/listing.entity";
import { Payment } from "./payment/payment.entity";
import { User } from "./user/user.entity";
import { PaymentInfo } from "./paymentInfo/paymentInfo.entity";
import { Notification } from "./notification/notification.entity";
import { RentalDecision } from "./rental-decision/rental-decision.entity";
import { AccomReview } from "./accom-review/accom-review.entity";
import { Region } from "./region/region.entity";
import { Amenity } from "./amenity/amenity.entity";
import { Wishlist } from "./wishlist/wishlist.entity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 2707,
    username: 'admin',
    password: 'admin',
    database: 'romdoul_database',
    entities: [
        Picture,
        Booking,
        Listing,
        Payment,
        User,
        PaymentInfo,
        Notification,
        RentalDecision,
        AccomReview,
        Region,
        Amenity,
        Wishlist,
    ],
    synchronize: false,
    logging: false
});
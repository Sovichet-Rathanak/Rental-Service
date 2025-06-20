import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingsModule } from './listing/listing.module';
import { AmenityModule } from './amenity/amenity.module';
import { PictureModule } from './picture/picture.module';
import { RegionModule } from './region/region.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AccomReviewModule } from './accom-review/accom-review.module';
import { BookingModule } from './booking/booking.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { RentalDecisionModule } from './rental-decision/rental-decision.module';
import { ConfigModule } from '@nestjs/config';
import { PaymentInfoModule } from './paymentInfo/paymentInfo.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 2707,
      username: 'admin',
      password: 'admin',
      database: 'romdoul_database',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ListingsModule,
    AmenityModule,
    PictureModule,
    RegionModule,
    UserModule,
    AuthModule,
    AccomReviewModule,
    BookingModule,
    WishlistModule,
    RentalDecisionModule,
    PaymentInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

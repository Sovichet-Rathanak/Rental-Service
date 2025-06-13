import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.entity';
import { User } from 'src/user/user.entity';
import { Listing } from 'src/listing/listing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, User, Listing])],
  providers: [WishlistService],
  controllers: [WishlistController],
  exports: [WishlistService],
})
export class WishlistModule {}

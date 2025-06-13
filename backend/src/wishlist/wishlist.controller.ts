import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
// import { AuthGuard } from 'src/auth/guards/auth.guard';
// import { RolesGuard } from 'src/auth/guards/role.guard';
// import { Roles } from 'src/auth/decorator/roles.decorator';
// import { UserDecorator } from 'src/user/user.decorator';
// import { User } from 'src/user/user.entity';

@Controller('wishlist')
// @UseGuards(AuthGuard, RolesGuard)
// @Roles('tenant')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  getAll() {
    return this.wishlistService.findAlll();
  }

  @Post()
  toggleWishlist(@Body('listingId') listingId: string, userId: string) {
    return this.wishlistService.createWishlist(userId, listingId);
  }

  @Get('/user/:userId')
  getUserWishlist(@Param('userId') userId: string) {
    return this.wishlistService.getUserWishlist(userId);
  }

  @Delete(':id')
  deleteWishlist(@Param('id') id: string) {
    return this.wishlistService.deleteWishlist(id);
  }
}

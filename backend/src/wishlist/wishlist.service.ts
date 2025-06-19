import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from 'src/listing/listing.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  async findAlll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find();
  }

  async deleteWishlist(id: string): Promise<{ message: string }> {
    const foundWishlist = await this.wishlistRepository.delete(id);
    if (!foundWishlist) {
      throw new NotFoundException('Wishlist with this id is not found');
    }

    return { message: 'Wishlist item successfully delete' };
  }

  async createWishlist(userId: string, listingId: string): Promise<Wishlist> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const listing = await this.listingRepository.findOne({
      where: { id: listingId },
    });
    if (!listing) {
      throw new NotFoundException(`Listing with ID ${listingId} not found`);
    }

    const existingWishlist = await this.wishlistRepository.findOne({
      where: { tenant: { id: userId }, listing: { id: listingId } },
    });

    if (existingWishlist) {
      throw new ConflictException("This lisitng is already in user's wishlist");
    }

    const wishlist = this.wishlistRepository.create({
      tenant: user,
      listing,
    });

    return this.wishlistRepository.save(wishlist);
  }

  async getUserWishlist(userId: string): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      where: { tenant: { id: userId } },
      relations: ['tenant', 'listing'],
    });
  }
}

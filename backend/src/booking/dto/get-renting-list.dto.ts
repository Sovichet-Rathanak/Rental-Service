import { Picture } from 'src/picture/picture.entity';
import { RentingStatus } from '../enum/reting-status.enum';
import { Region } from 'src/region/region.entity';

export class RentingListItem {
  id: string;
  moveInDate: string;
  moveOutDate: string;
  retalDuration: string;
  listing: {
    id: string;
    title: string;
    price_monthly: number;
    region: Region;
    songkat: string;
    street_address: string;
    pictures: Picture[];
    // rating: boolean;
  };
  rentingStatus: RentingStatus;
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentInfoDto } from './dto/create-paymentInfo.dto';
import { UpdatePaymentInfoDto } from './dto/update-paymentInfo.dto';
import { User } from 'src/user/user.entity';
import { PaymentInfo } from './paymentInfo.entity';

@Injectable()
export class PaymentInfoService {
  constructor(
    @InjectRepository(PaymentInfo)
    private readonly paymentInfoRepo: Repository<PaymentInfo>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreatePaymentInfoDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const paymentInfo = this.paymentInfoRepo.create({
      user,
      cardNumber: dto.cardNumber,
      expiryDate: dto.expiryDate,
      cvv: dto.cvv,
      streetAddress: dto.streetAddress,
      aptSuiteUnit: dto.aptSuiteUnit,
      city: dto.city,
      state: dto.state,
      zipCode: dto.zipCode,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });

    return this.paymentInfoRepo.save(paymentInfo);
  }

  async update(id: string, dto: UpdatePaymentInfoDto) {
    const paymentInfo = await this.paymentInfoRepo.findOne({ where: { id } });
    if (!paymentInfo) throw new NotFoundException('Payment info not found');

    Object.assign(paymentInfo, dto); // Merge the updated fields
    return this.paymentInfoRepo.save(paymentInfo);
  }

  async findAll() {
    return this.paymentInfoRepo.find({ relations: ['user'] });
  }

  async findOne(id: string) {
    const paymentInfo = await this.paymentInfoRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!paymentInfo) throw new NotFoundException('Payment info not found');
    return paymentInfo;
  }

  async remove(id: string) {
    const paymentInfo = await this.findOne(id);
    return this.paymentInfoRepo.remove(paymentInfo);
  }
}

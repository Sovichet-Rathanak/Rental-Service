import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment, PaymentStatus } from './paymentInfo.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-paymentInfo.dto';
import { UpdatePaymentDto } from './dto/update-paymentInfo.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreatePaymentDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const payment = this.paymentRepo.create({
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
      status: dto.status ?? PaymentStatus.PENDING,
    });

    return this.paymentRepo.save(payment);
  }

  async update(id: string, dto: UpdatePaymentDto) {
    const payment = await this.paymentRepo.findOne({ where: { id } });
    if (!payment) throw new NotFoundException('Payment not found');

    Object.assign(payment, dto); // Merge the updated fields
    return this.paymentRepo.save(payment);
  }

  async findAll() {
    return this.paymentRepo.find({ relations: ['user'] });
  }

  async findOne(id: string) {
    const payment = await this.paymentRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async remove(id: string) {
    const payment = await this.findOne(id);
    return this.paymentRepo.remove(payment);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async create(dto: CreatePaymentDto) {
    const payment = this.paymentRepo.create(dto);
    return this.paymentRepo.save(payment);
  }

  async update(id: string, dto: UpdatePaymentDto) {
    const payment = await this.paymentRepo.findOne({ where: { id } });
    if (!payment) throw new NotFoundException('Payment not found');
    Object.assign(payment, dto);
    return this.paymentRepo.save(payment);
  }

  async findAll() {
    return this.paymentRepo.find();
  }

  async findOne(id: string) {
    const payment = await this.paymentRepo.findOne({ where: { id } });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async remove(id: string) {
    const payment = await this.findOne(id);
    return this.paymentRepo.remove(payment);
  }

  // integrate with Total Payment Summary Chart
  async getMonthlySummary() {
    return this.paymentRepo
      .createQueryBuilder('payment')
      .select(`TO_CHAR(payment.paymentDate, 'YYYY-MM')`, 'month')
      .addSelect(
        `SUM(CASE WHEN payment.status = 'paid' THEN payment.amount ELSE 0 END)`,
        'received',
      )
      .addSelect(
        `SUM(CASE WHEN payment.status = 'pending' THEN payment.amount ELSE 0 END)`,
        'expected',
      )
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();
  }
}

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentInfoService } from './paymentInfo.service';
import { CreatePaymentInfoDto } from './dto/create-paymentInfo.dto';
import { UpdatePaymentInfoDto } from './dto/update-paymentInfo.dto';

@Controller('payments-info')
export class PaymentInfoController {
  constructor(private readonly paymentInfoService: PaymentInfoService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreatePaymentInfoDto) {
    return this.paymentInfoService.create(dto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() dto: UpdatePaymentInfoDto) {
    return this.paymentInfoService.update(id, dto);
  }

  @Get()
  findAll() {
    return this.paymentInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentInfoService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentInfoService.remove(id);
  }
}

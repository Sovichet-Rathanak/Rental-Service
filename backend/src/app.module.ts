import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingsModule } from './listings/listings.module';

@Module({
  imports: [ListingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

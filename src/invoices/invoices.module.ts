import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { InvoiceEntity } from './entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceDetailEntity } from './entities/invoice-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity, InvoiceDetailEntity])],
  controllers: [InvoicesController],
  exports: [InvoicesService],
  providers: [InvoicesService],
})
export class InvoicesModule {}

import { IsDate, IsNumber } from 'class-validator';

export class CreateInvoiceDto {
  @IsNumber()
  customerId: number;

  @IsDate()
  invoiceDate: Date;
}

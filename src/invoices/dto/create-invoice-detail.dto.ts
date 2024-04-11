import { IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDetailDto {
  @IsString()
  producName: string;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  quantity: number;
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CreateInvoiceDetailDto } from './dto/create-invoice-detail.dto';
import { UpdateInvoiceDetailDto } from './dto/update-invoice-detail.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Post(':id/details')
  createDetail(
    @Param('id') id: string,
    @Body() createInvoiceDetailDto: CreateInvoiceDetailDto[],
  ) {
    return this.invoicesService.createDetail(+id, createInvoiceDetailDto);
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(+id, updateInvoiceDto);
  }

  @Patch(':id/details')
  updateDetail(
    @Param('id') id: string,
    @Body() updateInvoiceDetailDto: UpdateInvoiceDetailDto[],
  ) {
    return this.invoicesService.updateDetail(+id, updateInvoiceDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(+id);
  }

  @Delete(':id/details/:detailId')
  removeDetail(@Param('detailId') id: string) {
    return this.invoicesService.removeDetail(+id);
  }
}

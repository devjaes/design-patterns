import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceEntity } from './entities/invoice.entity';
import { CreateInvoiceDetailDto } from './dto/create-invoice-detail.dto';
import { InvoiceDetailEntity } from './entities/invoice-detail.entity';
import { UpdateInvoiceDetailDto } from './dto/update-invoice-detail.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,

    @InjectRepository(InvoiceDetailEntity)
    private readonly invoiceDetailRepository: Repository<InvoiceDetailEntity>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const invoice = await this.invoiceRepository.create({
      ...createInvoiceDto,
      customer: { id: createInvoiceDto.customerId },
    });
    return await this.invoiceRepository.save(invoice);
  }

  async createDetail(
    id: number,
    createInvoiceDetailDtos: CreateInvoiceDetailDto[],
  ) {
    const invoice = await this.invoiceRepository.findOneBy({
      id,
    });
    if (!invoice) {
      throw new Error('Invoice not found');
    }

    const details = createInvoiceDetailDtos.map((detail) =>
      this.invoiceDetailRepository.create({
        ...detail,
        invoice: { id },
      }),
    );

    return await this.invoiceDetailRepository.save(details);
  }

  async findAll() {
    return await this.invoiceRepository.find();
  }

  async findOne(id: number) {
    return await this.invoiceRepository.findOne({
      relationLoadStrategy: 'join',
      where: { id },
    });
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    const invoice = await this.invoiceRepository.findOneBy({ id });
    if (!invoice) {
      throw new Error('Invoice not found');
    }

    const updated = await this.invoiceRepository.merge(invoice, {
      ...updateInvoiceDto,
      customer: {
        id: updateInvoiceDto.customerId
          ? updateInvoiceDto.customerId
          : invoice.customer.id,
      },
    });

    return await this.invoiceRepository.save(updated);
  }

  async updateDetail(
    id: number,
    updateInvoiceDetailDtos: UpdateInvoiceDetailDto[],
  ) {
    const invoice = await this.invoiceRepository.findOneBy({ id });
    if (!invoice) {
      throw new Error('Invoice not found');
    }

    const details = await this.invoiceDetailRepository.find({
      where: { invoice: { id } },
    });

    const updatedDetails = details.map((detail, index) => {
      const updateDetailDto = updateInvoiceDetailDtos[index];
      return this.invoiceDetailRepository.merge(detail, {
        ...updateDetailDto,
      });
    });

    return await this.invoiceDetailRepository.save(updatedDetails);
  }

  async remove(id: number) {
    const invoice = await this.invoiceRepository.findOneBy({ id });
    if (!invoice) {
      throw new Error('Invoice not found');
    }

    invoice.isDeleted = true;

    return await this.invoiceRepository.save(invoice);
  }

  async removeDetail(id: number) {
    const detail = await this.invoiceDetailRepository.findOneBy({ id });
    if (!detail) {
      throw new Error('Detail not found');
    }

    return await this.invoiceDetailRepository.softRemove(detail);
  }
}

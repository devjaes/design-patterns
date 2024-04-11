import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  async findAll() {
    return this.customerRepository.find();
  }

  async findOne(dni: string) {
    const customer = await this.customerRepository.findOneBy({ dni });
    if (!customer) {
      throw new Error('Customer not found');
    }

    return customer;
  }

  async update(dni: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOneBy({ dni });

    if (!customer) {
      throw new Error('Customer not found');
    }

    const updatedCustomer = await this.customerRepository.merge(
      customer,
      updateCustomerDto,
    );

    return await this.customerRepository.save(updatedCustomer);
  }

  async remove(dni: string) {
    const customer = await this.customerRepository.findOneBy({ dni });

    if (!customer) {
      throw new Error('Customer not found');
    }

    customer.isActive = false;

    return await this.customerRepository.save(customer);
  }
}

import { CustomerEntity } from 'src/customers/entities/customer.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvoiceDetailEntity } from './invoice-detail.entity';

@Entity('invoices')
export class InvoiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'invoice_number'})
  date: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.invoices)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @OneToMany(() => InvoiceDetailEntity, (detail) => detail.invoice)
  details: InvoiceDetailEntity[];

  @Column({ name: 'is_deleted'})
  isDeleted: boolean;
}

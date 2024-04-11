import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvoiceEntity } from './invoice.entity';

@Entity('invoice_detail')
export class InvoiceDetailEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_name', length: 50 })
  producName: string;

  @Column({name: 'unit_price'})
  unitPrice: number;

  @Column({name: 'quantity'})
  quantity: number;

  @ManyToOne(() => InvoiceEntity, (invoice) => invoice.details)
  invoice: InvoiceEntity;
}

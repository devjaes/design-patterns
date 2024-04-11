import { InvoiceEntity } from 'src/invoices/entities/invoice.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('customers')
export class CustomerEntity extends BaseEntity {
  @Column('bigint', { primary: true, name: 'id' })
  id: number;

  @Column({ name: 'dni', length: 10 })
  dni: string;

  @Column({ name: 'name', length: 30 })
  name: string;

  @Column( { name: 'last_name', length: 30 })
  lastName: string;

  @Column( { name: 'phone', length: 10 })
  phone: string;

  @Column( { name: 'address', length: 50 })
  address: string;

  @Column('boolean', { name: 'is_active' })
  isActive: boolean;

  @OneToMany(()=> InvoiceEntity, invoice => invoice.customer)
  invoices: InvoiceEntity[];
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvoiceDetail } from "./InvoiceDetail";
import { Customers } from "./Customers";

@Entity("invoices", { schema: "public" })
export class Invoices {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", { name: "invoice_number" })
  invoiceNumber: Date;

  @Column("boolean", { name: "is_deleted" })
  isDeleted: boolean;

  @OneToMany(() => InvoiceDetail, (invoiceDetail) => invoiceDetail.invoice)
  invoiceDetails: InvoiceDetail[];

  @ManyToOne(() => Customers, (customers) => customers.invoices)
  @JoinColumn([{ name: "customer_id", referencedColumnName: "id" }])
  customer: Customers;
}

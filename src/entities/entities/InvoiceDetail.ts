import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invoices } from "./Invoices";

@Entity("invoice_detail", { schema: "public" })
export class InvoiceDetail {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "product_name", length: 50 })
  productName: string;

  @Column("integer", { name: "unit_price" })
  unitPrice: number;

  @Column("integer", { name: "quantity" })
  quantity: number;

  @ManyToOne(() => Invoices, (invoices) => invoices.invoiceDetails)
  @JoinColumn([{ name: "invoiceId", referencedColumnName: "id" }])
  invoice: Invoices;
}

import { Column, Entity, OneToMany } from "typeorm";
import { Invoices } from "./Invoices";

@Entity("customers", { schema: "public" })
export class Customers {
  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "dni", length: 10 })
  dni: string;

  @Column("character varying", { name: "name", length: 30 })
  name: string;

  @Column("character varying", { name: "last_name", length: 30 })
  lastName: string;

  @Column("character varying", { name: "phone", length: 10 })
  phone: string;

  @Column("character varying", { name: "address", length: 50 })
  address: string;

  @Column("boolean", { name: "is_active" })
  isActive: boolean;

  @OneToMany(() => Invoices, (invoices) => invoices.customer)
  invoices: Invoices[];
}

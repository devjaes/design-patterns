import { CustomerEntity } from 'src/customers/entities/customer.entity';
import { InvoiceDetailEntity } from 'src/invoices/entities/invoice-detail.entity';
import { InvoiceEntity } from 'src/invoices/entities/invoice.entity';

const DEFAULT_APP_PORT = 3005;
const DEFAULT_DB_PORT = 5435;

export const rootConfig = () => ({
  port: parseInt(process.env.PORT, 10) || DEFAULT_APP_PORT,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : DEFAULT_DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
});

export const ormConfiguration = () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : DEFAULT_DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [CustomerEntity, InvoiceEntity, InvoiceDetailEntity],
  loadEntities: true,
  synchronize: true,
  keepConnectionAlive: true,
  dropSchema: false,
});

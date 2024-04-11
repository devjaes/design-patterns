import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { ormConfiguration, rootConfig } from 'config/configuration';
import { AppService } from './app.service';
import { InvoicesModule } from './invoices/invoices.module';

dotenvConfig({ path: '.env' });

const ormConfig = ormConfiguration();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rootConfig],
    }),
    TypeOrmModule.forRoot({
      ...ormConfig,
    } as TypeOrmModuleOptions),
    CustomersModule,
    InvoicesModule,
  ],
  providers: [AppService],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  await app.listen(app.get(ConfigService).get('port') || 3000);
  logger.log(
    `Application listening on port ${app.get(ConfigService).get('port')}`,
  );
}
bootstrap();

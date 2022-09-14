import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import loadDynamoseConnection from './config/dynamodb';

async function bootstrap() {
  loadDynamoseConnection();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

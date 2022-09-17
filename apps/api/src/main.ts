import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import loadDynamoseConnection from './config/dynamodb';

async function bootstrap() {
  loadDynamoseConnection();
  const app = await NestFactory.create(AppModule);
  app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false })); 
  await app.listen(3000);
}
bootstrap();

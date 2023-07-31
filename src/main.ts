import { NestFactory } from '@nestjs/core';
import { configDotenv } from 'dotenv';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  await app.listen(3000);

  configDotenv();

  console.log('Application running on port 3000!');
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { configDotenv } from 'dotenv';
import { MongoClient } from 'mongodb';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';
import { ConsumeService } from './modules/consume/consume.service';

configDotenv();

async function connectMongoDB() {
  const mongoClient = new MongoClient(process.env.MONGODBCONNECT);
  try {
    await mongoClient.connect();

    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error(error);
  } finally {
    await mongoClient.close();
  }
}
connectMongoDB();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  await app.listen(process.env.PORT);

  console.log(`Application running on port ${process.env.PORT}!`);
}
bootstrap();

async function startConsumer() {
  const consumer = new ConsumeService().consumer();

  await consumer;
}
startConsumer();

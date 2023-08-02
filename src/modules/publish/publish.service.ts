import { Injectable } from '@nestjs/common';
import { Partitioners } from 'kafkajs';
import { MongoClient } from 'mongodb';
import { kafka } from 'src/common/helpers/kafka.helper';

@Injectable()
export class PublishService {
  private readonly kafka = kafka();

  async find(): Promise<object[]> {
    const mongoClient = new MongoClient(process.env.MONGODBCONNECT);

    const result = await mongoClient.db('api_db').collection('api_collection').find().toArray();

    return result;
  }

  async publish(value: string): Promise<string> {
    const kafkaProducer = this.kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

    await kafkaProducer.connect();

    await kafkaProducer.send({
      topic: 'api',
      messages: [{ value }],
    });

    await kafkaProducer.disconnect();

    return 'Record published!';
  }
}

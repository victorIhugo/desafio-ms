import { Injectable } from '@nestjs/common';
import { Kafka, Partitioners } from 'kafkajs';

@Injectable()
export class PublishService {
  private kafka(): Kafka {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: [process.env.KAFKABROKER],
    });

    return kafka;
  }

  async publish(value: string): Promise<string> {
    const kafkaProducer = this.kafka().producer({ createPartitioner: Partitioners.DefaultPartitioner });

    await kafkaProducer.connect();

    await kafkaProducer.send({
      topic: 'test',
      messages: [{ value }],
    });

    await kafkaProducer.disconnect();

    return 'Record published!';
  }
}

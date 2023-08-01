import { Injectable } from '@nestjs/common';
import { Partitioners } from 'kafkajs';
import { kafka } from 'src/common/helpers/kafka.helper';

@Injectable()
export class PublishService {
  private readonly kafka = kafka();

  async publish(value: string): Promise<string> {
    const kafkaProducer = this.kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

    await kafkaProducer.connect();

    await kafkaProducer.send({
      topic: 'test',
      messages: [{ value }],
    });

    await kafkaProducer.disconnect();

    return 'Record published!';
  }
}

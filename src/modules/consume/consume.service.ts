import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { kafka } from 'src/common/helpers/kafka.helper';

@Injectable()
export class ConsumeService {
  private readonly kafka = kafka();

  private async createListing(newListing: Record<any, any>): Promise<void> {
    const mongoClient = new MongoClient(process.env.MONGODBCONNECT);
    const result = await mongoClient.db('test_db').collection('test_collection').insertOne(newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`);
  }

  async listRecords(topic: string): Promise<any[]> {
    const kafkaAdmin = this.kafka.admin();

    await kafkaAdmin.connect();

    return await kafkaAdmin.fetchTopicOffsets(topic);
  }

  async consumer(): Promise<void> {
    const kafkaConsumer = this.kafka.consumer({ groupId: 'test-group', heartbeatInterval: 1500 });

    await kafkaConsumer.connect();

    await kafkaConsumer.subscribe({ topic: 'test', fromBeginning: true });

    console.log('Consumer on!');

    await kafkaConsumer.run({
      eachMessage: async ({ message, heartbeat }) => {
        await heartbeat();

        await this.createListing({ value: message.value.toString() });
      },
    });
  }

  async deleteRecords(): Promise<string> {
    const kafkaAdmin = this.kafka.admin();

    await kafkaAdmin.connect();

    const topicOffsets = await kafkaAdmin.fetchTopicOffsets('test');

    await kafkaAdmin.deleteTopicRecords({
      topic: 'test',
      partitions: topicOffsets.map((el: any) => ({
        partition: el.partition,
        offset: '-1',
      })),
    });

    await kafkaAdmin.disconnect();

    return 'Records deleted!';
  }
}

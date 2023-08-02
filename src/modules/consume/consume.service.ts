import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { kafka } from 'src/common/helpers/kafka.helper';

@Injectable()
export class ConsumeService {
  private readonly kafka = kafka();

  private async createListing(newListing: Record<any, any>): Promise<void> {
    const mongoClient = new MongoClient(process.env.MONGODBCONNECT);
    const result = await mongoClient.db('api_db').collection('api_collection').insertOne(newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`);
  }

  async listRecords(): Promise<any[]> {
    const kafkaAdmin = this.kafka.admin();

    await kafkaAdmin.connect();

    return await kafkaAdmin.fetchTopicOffsets('api');
  }

  async consumer(): Promise<void> {
    const kafkaAdmin = this.kafka.admin();

    await kafkaAdmin.connect();

    const topics = await this.kafka.admin().listTopics();
    if (!topics.find((el: any) => el === 'api')) {
      await kafkaAdmin.createTopics({ topics: [{ topic: 'api' }] });
    }

    await kafkaAdmin.disconnect();

    const kafkaConsumer = this.kafka.consumer({ groupId: 'api-group', heartbeatInterval: 1500 });

    await kafkaConsumer.connect();

    await kafkaConsumer.subscribe({ topic: 'api', fromBeginning: true });

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

    const topicOffsets = await kafkaAdmin.fetchTopicOffsets('api');

    await kafkaAdmin.deleteTopicRecords({
      topic: 'api',
      partitions: topicOffsets.map((el: any) => ({
        partition: el.partition,
        offset: '-1',
      })),
    });

    await kafkaAdmin.disconnect();

    return 'Records deleted!';
  }
}

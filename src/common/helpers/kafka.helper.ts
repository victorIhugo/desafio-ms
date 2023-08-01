import { Kafka } from 'kafkajs';

export function kafka(): Kafka {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: [process.env.KAFKABROKER],
  });

  return kafka;
}

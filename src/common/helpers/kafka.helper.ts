import { Kafka, logLevel } from 'kafkajs';

export function kafka(): Kafka {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: [process.env.KAFKABROKER],
    logLevel: logLevel.INFO,
  });

  return kafka;
}

import { Kafka } from "kafkajs";
import env from "./env";

const kafka = new Kafka({
  clientId: env.KAFKA_CLIENT_ID,
  brokers: env.KAFKA_BROKERS.split(","),
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({
  groupId: env.KAFKA_GROUP_ID,
});

export const initializeKafka = async () => {
  await producer.connect();
  await consumer.connect();
};

export default kafka;

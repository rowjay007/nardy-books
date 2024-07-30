import { producer } from "../../config/kafkaConfig";

export const sendUserCreatedEvent = async (userData: any) => {
  await producer.send({
    topic: "user-created",
    messages: [{ value: JSON.stringify(userData) }],
  });
};

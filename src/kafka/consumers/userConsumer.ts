import { consumer } from "../../config/kafkaConfig";
import { register } from "../../services/userService";
import AppError from "../../utils/appError";

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-created", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        if (!message.value) {
          throw new AppError("Message value is null", 400);
        }

        const userData = JSON.parse(message.value.toString());
        const { name, username, email, password } = userData;

        await register(name, username, email, password);
        console.log(`User registered: ${email}`);
      } catch (error) {
        console.error("Error processing user-created event:", error);
        // Handle error as needed
      }
    },
  });
};

export default runConsumer;

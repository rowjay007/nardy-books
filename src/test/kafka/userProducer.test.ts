import { sendUserCreatedEvent } from "../../kafka/producers/userProducer";
import { producer } from "../../config/kafkaConfig";

jest.mock("../../config/kafkaConfig", () => ({
  producer: {
    send: jest.fn(),
  },
}));

describe("User Producer", () => {
  it("should send user created event", async () => {
    const userData = {
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      password: "password123",
    };

    await sendUserCreatedEvent(userData);

    expect(producer.send).toHaveBeenCalledWith({
      topic: "user-created",
      messages: [{ value: JSON.stringify(userData) }],
    });
  });
});

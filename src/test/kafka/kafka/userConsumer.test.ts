import { consumer } from "../../../config/kafkaConfig";
import runConsumer from "../../../kafka/consumers/userConsumer";
import { register } from "../../../services/userService";

jest.mock("../../../services/userService", () => ({
  register: jest.fn(),
}));

jest.mock("../../../config/kafkaConfig", () => ({
  consumer: {
    connect: jest.fn(),
    subscribe: jest.fn(),
    run: jest.fn(),
  },
}));

describe("User Consumer", () => {
  it("should process user-created events", async () => {
    const mockMessage = {
      topic: "user-created",
      partition: 0,
      message: {
        value: Buffer.from(
          JSON.stringify({
            name: "John Doe",
            username: "johndoe",
            email: "john@example.com",
            password: "password123",
          })
        ),
      },
    };

    (consumer.run as jest.Mock).mockImplementation(({ eachMessage }) => {
      return eachMessage(mockMessage);
    });

    await runConsumer();

    expect(register).toHaveBeenCalledWith(
      "John Doe",
      "johndoe",
      "john@example.com",
      "password123"
    );
  });
});

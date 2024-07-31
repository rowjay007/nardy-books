import { producer } from "../config/kafka";

const sendBookAddedEvent = async (book: any) => {
  await producer.send({
    topic: "book-added",
    messages: [{ value: JSON.stringify(book) }],
  });
};

const sendUserRegisteredEvent = async (user: any) => {
  await producer.send({
    topic: "user-registered",
    messages: [{ value: JSON.stringify(user) }],
  });
};

export { sendBookAddedEvent, sendUserRegisteredEvent };

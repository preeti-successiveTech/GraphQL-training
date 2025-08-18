import { messages } from "./dataSource.js";

export const messageMutationResolvers = {
  postMessage: (_, { content, author, title }) => {
    const newMessage = {
      id: String(messages.length + 1),
      content,
      author,
      title,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    return newMessage;
  },
};

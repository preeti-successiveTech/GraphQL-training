import { messages } from "./dataSource.js";

export const messageMutationResolvers = {
  postMessage: (_, { content, author, title },{pubsub}) => {
    const newMessage = {
      id: String(messages.length + 1),
      content,
      author,
      title,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    pubsub.publish("MESSAGE_POSTED",{
      postMessage : newMessage
    })
    return newMessage;
  },
};

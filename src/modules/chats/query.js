import { Message } from "../../models/message.js";
import { User } from "../../models/user.js";

export const chatQueryResolver = {
  usersChat: async () => {
    return await User.find();
  },
  messagesChat: async (_, { limit }) => {
    const query = Message.find().sort({ createdAt: -1 });
    if (limit) query.limit(limit);
    return await query.populate("author");
  },
};

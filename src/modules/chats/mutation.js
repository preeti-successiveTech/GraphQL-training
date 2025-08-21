import { Message } from "../../models/message.js";
import { User } from "../../models/user.js";
import { generateToken } from "../../utils/auth.js";

export const chatMutation = {
  register: async (_, { name, email, password }) => {
    const existing = await User.findOne({ email });
    if (existing) {
      throw new Error("User already exists");
    }
    const newUser = new User({ name, email, password, isOnline: false });
    await newUser.save();

    return newUser;
  },

  login: async (_, { name, password }, { pubsub }) => {
    const user = await User.findOne({ name });
    if (!user) throw new Error("User not found");
    if (user.password !== password) {
      throw new Error("Invalid creditional");
    }
    (user.isOnline = true), await user.save();
    const token = generateToken(user);
    pubsub.publish("User_joined", {
      UserJoined: { userMessage: `${user.name} logged in` },
    });

    return { user, token };
  },

  logout: async (_, { userId }, { pubsub }) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.isOnline = false;
    await user.save();
    pubsub.publish("User_Logout", {
      UserLogout: { userMessage: `${user.name} logout` },
    });

    return true;
  },

  sendMessage: async (_, { content }, { verifyUser, pubsub }) => {
    if (!verifyUser) throw new Error("Not authenticated");
    const newMessage = new Message({ content, author: verifyUser.id });
    await newMessage.save();

    const populatedMessage = await newMessage.populate("author");
    pubsub.publish("NEW_MESSAGE", { newMessage: populatedMessage });

    return populatedMessage;
  },
  // sendMessage: async (_, { content, author }, { verifyUser, pubsub }) => {
  //   if (!verifyUser) throw new Error("Not authenticated");
  //   if (author === verifyUser.id) {
  //     const user = await User.findById(author);
  //     if (!user) throw new Error("User not found");
  //     const newMessage = new Message({ content, author });
  //     await newMessage.save();

  //     const populatedMessage = await newMessage.populate("author");
  //     pubsub.publish("NEW_MESSAGE", { newMessage: populatedMessage });

  //     return populatedMessage;
  //   }
  //   throw new Error("You are not authenticated, Please check your id");
  // },
};

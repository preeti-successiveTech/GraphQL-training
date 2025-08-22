import { Message } from "../../models/message.js";
import { User } from "../../models/user.js";
import { generateToken } from "../../utils/auth.js";

export const chatMutation = {
  register: async (_, { name, email, role, password }) => {
    const existing = await User.findOne({ email });
    if (existing) {
      throw new Error("User already exists");
    }
    const newUser = new User({ name, email, role, password, isOnline: false });
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

  logout: async (_, {}, { verifyUser,pubsub }) => {
    if (!verifyUser) throw new Error("Not authenticated");
    const user = verifyUser;
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

  deleteUser: async(_, {userId}, {verifyUser})=>{
     if (!verifyUser) throw new Error("Not authenticated");
     if(verifyUser.role !== 'ADMIN')
     {
        throw new Error("Only admin have access for this");
     }
     const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
     await User.findByIdAndDelete(userId);
     return user;
  }
  
};

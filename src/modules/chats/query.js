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
  allUsers: async(_,{},{verifyUser})=>{
     if (!verifyUser) throw new Error("Not authenticated");
     if(verifyUser.role !== 'ADMIN')
     {
      throw new Error("You don't have access");
     }
     return await User.find();
     
  }
};

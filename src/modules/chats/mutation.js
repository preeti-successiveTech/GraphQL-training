import { User } from "../../models/user";

export const chatMutation = {
  
  register: async (_, { name, email, password }) => {
    const existing = await User.findone({ email });
    if (existing) {
      throw new Error("User already exists");
    } else {
      const newUser = new User({ name, email, password, isOnline: true });
      await newUser.save();
    }
    return newUser;
  },

  login: async (_, { name, password }) => {
    const user = await User.findOne({ name });
    if (!user) throw new Error("User not found");
    if (user.password !== password) {
      throw new Error("Invalid creditional");
    }
    (user.isOnline = true), await user.save();
    return user;
  },

  logout: async (_, { userId }) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    user.isOnline = false;
    await user.save();
    return true;
  },
};

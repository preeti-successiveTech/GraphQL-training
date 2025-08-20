export const chatQueryResolver = {
  users: async () => {
    return await User.find();
  },
  messages: async (_, { limit }) => {
    const query = Message.find().sort({ createdAt: -1 });
    if (limit) query.limit(limit);
    return await query.populate("authorId");
  },
}
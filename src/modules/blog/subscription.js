import { pubsub } from "../../server/pubsub.js";

export const blogSubscriptionResolvers = {
  addComment: {
    subscribe: () => pubsub.asyncIterableIterator(["Comment_Added"]),
  },
};

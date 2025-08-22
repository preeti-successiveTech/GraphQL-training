import { pubsub } from "../../server/pubsub.js";

export const messageSubscriptionResolvers = {
  postMessage: {
    subscribe: () => pubsub.asyncIterableIterator(["MESSAGE_POSTED"]),
  },
};
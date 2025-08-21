import { pubsub } from "../../server/pubsub.js";

export const chatSubscriptionResolvers = {
  UserJoined: {
    subscribe: () => pubsub.asyncIterableIterator(["User_joined"]),
  },
  UserLogout: {
    subscribe: () => pubsub.asyncIterableIterator(["User_Logout"]),
  },
};

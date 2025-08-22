import { chatMutation } from "./mutation.js";
import { chatQueryResolver } from "./query.js";
import { chatSubscriptionResolvers } from "./subscription.js";

export const chatModule = {
  Query: chatQueryResolver,
  Mutation: chatMutation,
  Subscription: chatSubscriptionResolvers,
};

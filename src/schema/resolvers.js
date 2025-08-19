import { comments, posts, users } from "../modules/blog/dataSource.js";
import { blogModule } from "../modules/blog/index.js";
import { messageModule } from "../modules/message/index.js";

export const resolvers = {
  Query: {
    ...blogModule.Query,
    ...messageModule.Query,
  },
  Mutation: {
    ...blogModule.Mutation,
    ...messageModule.Mutation,
  },
  UserResult: {
    __resolveType(obj) {
      console.log("calling resolver type", obj);
      if (obj.code) {
        console.log("calling custom error");
        return "customError";
      }
      if (obj.name) {
        console.log("calling User");
        return "User";
      }
    },
  },

  User: {
    posts: (parent) => {
      console.log("222222222222");
      return posts.filter((post) => post.authorId === parent.id);
    },
    comments: (parent) => {
      return comments.filter((comment) => comment.userId === parent.id);
    },
  },

  Post: {
    author: (parent) => users.find((user) => user.id === parent.authorId),
    comments: (parent) =>
      comments.filter((comment) => comment.postId === parent.id),
  },

  Comment: {
    user: (parent) => users.find((user) => user.id === parent.userId),
    post: (parent) => posts.find((post) => post.id === parent.postId),
  },
};

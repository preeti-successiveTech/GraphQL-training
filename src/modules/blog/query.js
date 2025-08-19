import { posts, users } from "./dataSource.js";

export const blogQueryResolvers = {
  getUsers: () => {
    console.log("111111111111");
    return users;
  },

  getUserById: async (_, { id }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("calling query by id");
    const user = users.find((user) => user.id === id);

    if (!user) {
      return {
        message: "User not found",
        code: "404",
      };
    }

    return user;
  },

  getPosts: (_, { page, limit, sortOrder = "ASC" }) => {
    if (page < 1 || limit < 1) {
      throw new Error("Invalid page or limit");
    }

    const sorted = [...posts].sort((a, b) => {
      const idA = parseInt(a.id);
      const idB = parseInt(b.id);
      return sortOrder === "DESC" ? idB - idA : idA - idB;
    });
    const skip = (page - 1) * limit;
    return sorted.slice(skip, skip + limit);
  },

  getPostById: (_, { id }) => posts.find((post) => post.id === id),

  getPostsByUserId: (_, { userId }) =>
    posts.filter((post) => post.authorId === userId),

  getComments: () => comments,

  getCommentsByPostId: (_, { postId }) =>
    comments.filter((comment) => comment.postId === postId),

  getUserByComment: (_, { comment }) =>
    users.find((user) => user.id === comment.userId),

  getAuthorOfPost: (_, { post }) =>
    users.find((user) => user.id === post.authorId),
};

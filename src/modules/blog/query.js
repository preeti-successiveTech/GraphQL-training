import { posts, users } from "./dataSource.js";

export const blogQueryResolvers = {
  getUsers: () => users,

  getUserById: (_, { id }) => users.find((user) => user.id === id),

  getPosts: () => posts,

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

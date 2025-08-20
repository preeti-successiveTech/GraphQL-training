import { comments, posts, users } from "./dataSource.js";
export const blogMutation = {
  createPost: (_, { title, content, authorId }) => {
    const newPost = {
      id: String(posts.length + 1),
      title,
      content,
      authorId,
    };
    posts.push(newPost);
    return newPost;
  },

  updateUser: (_, { id, name }) => {
    const user = users.find((u) => u.id === id);
    if (!user) throw new Error("User not found");
    user.name = name;
    return user;
  },

  addComment: (_, { text, postId, userId }) => {
    const post = posts.find((p) => p.id === postId);
    const user = users.find((u) => u.id === userId);
    if (!post || !user) throw new Error("Post or User not found");

    const newComment = {
      id: String(comments.length + 1),
      text,
      postId,
      userId,
    };
    comments.push(newComment);
    return newComment;
  },

  deleteComment: (_, { id }) => {
    const index = comments.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Comment not found");
    comments.splice(index, 1);
    return true;
  },
};

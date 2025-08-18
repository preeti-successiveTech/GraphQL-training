import { posts } from "./dataSource.js";
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
};

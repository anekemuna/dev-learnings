export interface Post {
  postId: string;
  title: string;
  summary: string;
  content: string;
}

// Mock blog post data
export const posts: Post[] = [
  {
    postId: "first-post",
    title: "My First Post",
    summary: "Preview Text ...",
    content: "This is the content of the first post.",
  },
  {
    postId: "second-post",
    title: "My Second Post",
    summary: "Preview Text ...",
    content: "This is the content of the second post.",
  },
  {
    postId: "third-post",
    title: "My Third Post",
    summary: "Preview Text ...",
    content: "This is the content of the third post.",
  },
];

export function getPostById(postId: string) {
  return posts.find((post) => post.postId === postId);
}

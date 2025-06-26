// Mock blog post data
export const posts = [
  {
    postId: 'my-first-post',
    title: 'My First Post',
    content: 'This is the content of the first post.',
  },
  {
    postId: 'nextjs-routing',
    title: 'Understanding Next.js Routing',
    content: 'Let’s talk about file-based routing in Next.js 15...',
  },
]

export function getPostByPostId(postId: string) {
  return posts.find(post => post.postId === postId)
}

import Link from 'next/link';
import { posts } from '../../../lib/posts';

export default function PostsList() {
  return (
    <main style={{ padding: '1rem' }}>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.postId}>
            <Link href={`/posts/${post.postId}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

import Link from "next/link";

interface Post {
  id: string;
  title: string;
  summary: string;
}

export default function PostCard({ post }: {post: Post}) {
  return (
    <article>
      <h2>
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p>{post.summary}</p>
    </article>
  );
}

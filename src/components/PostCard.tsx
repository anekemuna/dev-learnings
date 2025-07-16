import Link from "next/link";

interface Post {
  id: string;
  title: string;
  summary: string;
}

/**
 * Renders a clickable card based on the post
 *
 * @param post: takes a post data from the database
 * @returns : rendered JSX.Element
 */
export default function PostCard({ post }: { post: Post }) {
  return (
    <article>
      <h2>
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p>{post.summary}</p>
    </article>
  );
}

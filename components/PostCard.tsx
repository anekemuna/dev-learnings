import { Post } from "../lib/posts";
import Link from "next/link";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <article>
      <h2>
        <Link href={`/posts/${post.postId}`}>{post.title}</Link>
      </h2>
      <p>{post.summary}</p>
    </article>
  );
}

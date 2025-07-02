import Link from "next/link";
import { posts } from "../../../lib/posts";
import PostCard from "../../../components/PostCard";

export default function PostsList() {
  return (
    <main style={{ padding: "1rem" }}>
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => (
          <PostCard key={post.postId} post={post} />
        ))}
      </ul>
    </main>
  );
}

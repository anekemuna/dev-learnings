import Link from "next/link";
import { getPosts } from "../../../lib/posts";
import PostCard from "../../../components/PostCard";

export default async function PostsList() {
  const posts = await getPosts();
  return (
    <main style={{ padding: "1rem" }}>
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </main>
  );
}

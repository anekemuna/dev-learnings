import Link from "next/link";
import { getAllPosts } from "@/libs/posts";
import PostCard from "@/components/PostCard";

/**
 *
 * @returns JSX.Element rendering of post object into cards
 */
export default async function PostsList() {
  const posts = await getAllPosts();
  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </main>
  );
}

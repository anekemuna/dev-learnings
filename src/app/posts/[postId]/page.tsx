import { getPostById } from "@/libs/posts";
import { notFound } from "next/navigation";

type Props = {
  params: { postId: string };
};

export async function generateMetadata({ params }: Props) {
  const post = await getPostById(params.postId);
  return {
    title: post ? `${post.title} | DevLearning` : "Post not found",
  };
}

export default async function Post({ params }: Props) {
  const post = await getPostById(params.postId);

  if (!post) return notFound();

  return (
    <article className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600">{post.content}</p>
    </article>
  );
}

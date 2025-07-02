import { getPostById } from '../../../../lib/posts'
import { notFound } from 'next/navigation'

type Props = {
  params: { postId: string }
}

export async function generateMetadata({ params }: Props) {
  const post = await getPostById(params.postId)
  return {
    title: post ? `${post.title} | My Blog` : 'Post not found',
  }
}

export default async function Post({ params }: Props) {
  const post = await getPostById(params.postId)

  if (!post) return notFound()

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}

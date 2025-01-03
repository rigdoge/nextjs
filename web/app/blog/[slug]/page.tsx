import { getPost } from '@/lib/sanity'

interface PageProps {
  params: { slug: string }
}

export default async function BlogPost({ params }: PageProps) {
  const post = await getPost(params.slug)
  
  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article className="prose lg:prose-xl mx-auto">
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      <p>By {post.author}</p>
    </article>
  )
} 
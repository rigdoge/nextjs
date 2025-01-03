import { getPost } from '@/lib/sanity'
import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    return (
      <div className="container py-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold">Post not found</h1>
          <Link href="/blog" className="text-blue-500 hover:underline">
            ← Back to blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="container py-10">
      <div className="flex flex-col space-y-8">
        <Link href="/blog" className="text-blue-500 hover:underline w-fit">
          ← Back to blog
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
          
          <div className="flex flex-wrap gap-2">
            {post.categories?.map((category: any) => (
              <span 
                key={category.title}
                className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium"
              >
                {category.title}
              </span>
            ))}
          </div>

          <time className="text-sm text-muted-foreground">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>

        {post.mainImage && (
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={urlForImage(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-slate max-w-none dark:prose-invert">
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  )
} 
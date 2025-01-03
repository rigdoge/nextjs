import { getAllPosts } from '@/lib/sanity'
import { urlForImage } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="container py-10">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Blog Posts</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <Link 
            key={post._id} 
            href={`/blog/${post.slug.current}`}
            className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-shadow hover:shadow-lg"
          >
            {post.mainImage && (
              <div className="relative aspect-video overflow-hidden rounded-md">
                <Image
                  src={urlForImage(post.mainImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold tracking-tight group-hover:underline">{post.title}</h2>
              <div className="mb-2 flex flex-wrap gap-2">
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
          </Link>
        ))}
      </div>
    </div>
  )
} 
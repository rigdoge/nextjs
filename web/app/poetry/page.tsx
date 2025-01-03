import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { urlForImage } from '@/lib/sanity'

async function getPoems() {
  return await client.fetch(`
    *[_type == "poem"] {
      _id,
      title,
      slug,
      content[]{
        text,
        pinyin
      },
      backgroundImage,
      author->{
        name
      },
      tags[]->
    }
  `)
}

export default async function PoetryPage() {
  const poems = await getPoems()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-20 text-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 backdrop-blur-3xl"></div>
          <div className="meteor-shower">
            <div className="meteor"></div>
            <div className="meteor"></div>
            <div className="meteor"></div>
          </div>
        </div>
        <div className="container px-4 mx-auto relative">
          <h1 className="text-5xl font-bold text-center mb-6 hover-trigger">
            唐诗集
            <div className="glow-line h-0.5 w-32 mx-auto mt-2 hover-target"></div>
          </h1>
          <p className="text-lg text-center text-violet-100 max-w-2xl mx-auto">
            探索中国古典诗歌的瑰宝，感受千年文化的魅力
          </p>
        </div>
      </section>

      {/* Poems Grid */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {poems.map((poem: any) => (
              <Link
                key={poem._id}
                href={`/poetry/${poem.slug.current}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] hover:scale-105 transition-transform duration-300"
              >
                {poem.backgroundImage ? (
                  <Image
                    src={urlForImage(poem.backgroundImage).url()}
                    alt={poem.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-50" />
                )}
                <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:opacity-60" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{poem.title}</h2>
                    <p className="text-violet-200">{poem.author.name}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="transform translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-white/90 line-clamp-2 text-sm">
                        {Array.isArray(poem.content) && poem.content[0]?.text || ''}
                      </p>
                    </div>
                    
                    {poem.tags && poem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {poem.tags.map((tag: any) => (
                          <span
                            key={tag._id}
                            className="px-2 py-1 text-xs rounded-full bg-white/20 text-white backdrop-blur-sm"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 
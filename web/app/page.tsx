import { getAllPoems } from '@/lib/sanity'
import Link from 'next/link'

export default async function Home() {
  const poems = await getAllPoems()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute h-full w-full bg-gradient-to-t from-background to-transparent" />
        
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            古诗文鉴赏
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            探索中国古典诗词的优美意境，感受千年文化的深邃魅力
          </p>
        </div>
      </section>

      {/* Featured Poems */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              精选诗词
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {poems.map((poem: any) => (
              <Link
                key={poem.title}
                href={`/poetry/${poem.slug?.current}`}
                className="group relative overflow-hidden rounded-2xl bg-white/5 p-6 hover:bg-white/10 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <h3 className="text-xl font-bold mb-2 relative">
                  {poem.title}
                </h3>
                
                <p className="text-gray-400 mb-4 relative">
                  {poem.author?.name}
                </p>
                
                <div className="text-gray-300 line-clamp-3 relative">
                  {poem.content?.map((line: any) => line.text).join('\n')}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

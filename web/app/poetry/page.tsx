import { getAllPoems } from '@/lib/sanity'
import Link from 'next/link'

export default async function PoetryPage() {
  const poems = await getAllPoems()

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">唐诗鉴赏</h1>
      
      <div className="grid gap-6">
        {poems.map((poem: any) => (
          <Link 
            key={poem.slug}
            href={`/poetry/${poem.slug}`}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{poem.title}</h2>
            <p className="text-gray-600 mb-4">作者：{poem.author}</p>
            {poem.content && (
              <div className="text-gray-500">
                <p>{poem.content.text}</p>
                <p className="text-sm">{poem.content.pinyin}</p>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
} 
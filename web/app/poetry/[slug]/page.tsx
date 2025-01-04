import { getPoem } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { PoemLine } from '@/components/poem-line'
import { PinyinToggle } from '@/components/pinyin-toggle'

export default async function PoemPage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const poem = await getPoem(slug)

  if (!poem) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">未找到诗歌</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4 text-center">{poem.title}</h1>
      <div className="flex items-center justify-center gap-4 mb-12">
        <h2 className="text-xl text-gray-600">{poem.author.name}</h2>
        <PinyinToggle />
      </div>
      
      <div className="space-y-8 mb-12">
        {poem.content.map((line: { text: string; pinyin?: string }, index: number) => (
          <PoemLine key={index} text={line.text} pinyin={line.pinyin} />
        ))}
      </div>

      {poem.translation && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">译文</h3>
          <div className="prose prose-lg max-w-none">
            <PortableText value={poem.translation} />
          </div>
        </div>
      )}

      {poem.appreciation && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">赏析</h3>
          <div className="prose prose-lg max-w-none">
            <PortableText value={poem.appreciation} />
          </div>
        </div>
      )}
    </div>
  )
} 
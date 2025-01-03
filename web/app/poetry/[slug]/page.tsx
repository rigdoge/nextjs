import { getPoem } from '@/lib/sanity'

interface PageProps {
  params: { slug: string }
}

export default async function PoemPage({ params }: PageProps) {
  const poem = await getPoem(params.slug)
  
  if (!poem) {
    return <div>Poem not found</div>
  }

  return (
    <article className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{poem.title}</h1>
      <p className="text-gray-600 mb-8">作者：{poem.author}</p>
      
      <div className="space-y-6">
        {poem.content.map((line: { text: string; pinyin: string }, index: number) => (
          <div key={index} className="space-y-1">
            <p className="text-lg">{line.text}</p>
            <p className="text-sm text-gray-500">{line.pinyin}</p>
          </div>
        ))}
      </div>

      {poem.translation && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">译文</h2>
          <p className="text-gray-700">{poem.translation}</p>
        </div>
      )}

      {poem.appreciation && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">赏析</h2>
          <p className="text-gray-700">{poem.appreciation}</p>
        </div>
      )}
    </article>
  )
} 
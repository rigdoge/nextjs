'use client'

import { pinyin } from 'pinyin-pro'
import { PinyinToggle } from './pinyin-toggle'
import { client } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

interface Poem {
  title: string
  content: Array<{
    text: string
    pinyin?: string
  }>
  author?: {
    name: string
  }
  translation?: string
  appreciation?: any[]
}

async function getPoem(slug: string): Promise<Poem | null> {
  const query = `*[_type == "poem" && slug.current == $slug][0]{
    title,
    content[]{
      text,
      pinyin
    },
    author->{name},
    translation,
    appreciation
  }`
  
  return await client.fetch(query, { slug })
}

function PoemContent({ poem }: { poem: Poem }) {
  const getPinyin = (text: string) => {
    return pinyin(text, { toneType: 'symbol' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{poem.title}</h1>
        <div className="mb-8">
          <p className="text-gray-400">作者：{poem.author?.name}</p>
          <div className="flex justify-end mb-4">
            <PinyinToggle />
          </div>
        </div>
        <div className="space-y-4 text-center">
          {poem.content.map((line, index) => (
            <div key={index} className="text-xl leading-relaxed">
              <div className="pinyin-text hidden text-sm text-gray-400 mb-1">
                {line.pinyin || getPinyin(line.text)}
              </div>
              <div>{line.text}</div>
            </div>
          ))}
        </div>
        {poem.translation && (
          <div className="mt-12 bg-white/5 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">译文</h2>
            <p className="text-gray-300 leading-relaxed">{poem.translation}</p>
          </div>
        )}
        {poem.appreciation && (
          <div className="mt-8 bg-white/5 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">赏析</h2>
            <div className="text-gray-300 prose prose-invert max-w-none">
              <PortableText value={poem.appreciation} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default async function PoemPage({ params }: { params: { slug: string } }) {
  const poem = await getPoem(params.slug)

  if (!poem) {
    return <div>诗歌未找到</div>
  }

  return <PoemContent poem={poem} />
} 
import { getPoems } from '@/lib/sanity'
import { PoetryTimeline } from '@/components/poetry-timeline'

export default async function PoetryPage() {
  const poems = await getPoems()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-12 text-center text-4xl font-bold">诗歌长廊</h1>
      <PoetryTimeline poems={poems} />
    </div>
  )
} 
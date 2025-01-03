import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3kr99v3e',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skXOgU0gMoQ6FiQVsR3RtCD9XhQz263tTkFCnvrGSTDd00jyvUWmfVfjIK7EHq4UIw8407NNcAgrqV4OxssMqA7x9R9BVwjPsPGioSh9AWs5KSBB3lb0ctARB2EnmqeROVrJsnP3Up6Na96N0ci5LZOmPlJv0PspjvMZKLXHvhtXnoXCZmU3'
})

async function migratePoems() {
  // 获取所有诗歌
  const poems = await client.fetch(`*[_type == "poem"]`)

  for (const poem of poems) {
    // 检查 content 是否需要迁移
    if (Array.isArray(poem.content) && typeof poem.content[0] === 'string') {
      // 转换为新格式
      const newContent = poem.content.map((line: string) => ({
        _type: 'object',
        text: line,
      }))

      // 更新文档
      await client.patch(poem._id)
        .set({ content: newContent })
        .commit()
        
      console.log(`已迁移诗歌: ${poem.title}`)
    }
  }

  console.log('迁移完成')
}

migratePoems().catch(console.error) 
import { createClient } from '@sanity/client'
import pinyin from 'pinyin'

const client = createClient({
  projectId: '3kr99v3e',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skXOgU0gMoQ6FiQVsR3RtCD9XhQz263tTkFCnvrGSTDd00jyvUWmfVfjIK7EHq4UIw8407NNcAgrqV4OxssMqA7x9R9BVwjPsPGioSh9AWs5KSBB3lb0ctARB2EnmqeROVrJsnP3Up6Na96N0ci5LZOmPlJv0PspjvMZKLXHvhtXnoXCZmU3',
  useCdn: false,
})

interface PoemContent {
  _type: 'object'
  text: string
  pinyin?: string
}

async function addPinyinToPoems() {
  try {
    // 获取所有诗歌
    const poems = await client.fetch(`*[_type == "poem"]{
      _id,
      title,
      content
    }`)

    console.log(`找到 ${poems.length} 首诗歌`)

    for (const poem of poems) {
      const updatedContent = poem.content.map((line: PoemContent) => {
        if (!line.pinyin && line.text) {
          // 使用 pinyin 库生成拼音
          const pinyinArray = pinyin(line.text, {
            style: pinyin.STYLE_TONE, // 使用声调
            segment: true // 启用分词
          })

          return {
            ...line,
            pinyin: pinyinArray.map(p => p[0]).join(' ')
          }
        }
        return line
      })

      // 更新诗歌内容
      await client.patch(poem._id)
        .set({ content: updatedContent })
        .commit()

      console.log(`已为《${poem.title}》添加拼音`)
    }

    console.log('所有诗歌拼音添加完成')
  } catch (error) {
    console.error('添加拼音时出错:', error)
  }
}

// 运行脚本
addPinyinToPoems() 
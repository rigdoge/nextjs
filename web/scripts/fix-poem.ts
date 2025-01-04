import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3kr99v3e',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

async function fixPoem() {
  try {
    // 获取静夜思的文档
    const poem = await client.fetch(`*[_type == "poem" && title == "静夜思"][0]`)
    
    if (!poem) {
      console.log('未找到静夜思')
      return
    }

    // 更新文档
    await client.patch(poem._id)
      .set({
        translation: '床前明亮的月光，好像地上的霜一样。抬头看看明月，低头想起故乡。',
        appreciation: [{
          _type: 'block',
          _key: new Date().toISOString(),
          style: 'normal',
          children: [{
            _type: 'span',
            _key: new Date().toISOString() + '.1',
            text: '这首诗以月为线索，通过对月光的观察和联想，自然地引出思乡之情。诗人用简单的语言，描绘出一个安静的夜晚，表达了深深的乡愁。诗中"举头"与"低头"的动作对比，形象地展现了诗人思乡时的神态，让读者感同身受。',
            marks: []
          }],
          markDefs: []
        }]
      })
      .commit()

    console.log('更新成功')
  } catch (error) {
    console.error('更新失败:', error)
  }
}

fixPoem() 
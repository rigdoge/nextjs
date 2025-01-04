const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '3kr99v3e',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skXOgU0gMoQ6FiQVsR3RtCD9XhQz263tTkFCnvrGSTDd00jyvUWmfVfjIK7EHq4UIw8407NNcAgrqV4OxssMqA7x9R9BVwjPsPGioSh9AWs5KSBB3lb0ctARB2EnmqeROVrJsnP3Up6Na96N0ci5LZOmPlJv0PspjvMZKLXHvhtXnoXCZmU3',
  useCdn: false,
})

const query = `*[_type == "poem" && title == "静夜思"][0]`

client.fetch(query).then(poem => {
  if (!poem) {
    console.log('未找到静夜思')
    return
  }

  client
    .patch(poem._id)
    .set({
      translation: '床前明亮的月光，好像地上的霜一样。抬头看看明月，低头想起故乡。',
      appreciation: [{
        _type: 'block',
        _key: 'appreciation1',
        style: 'normal',
        children: [{
          _type: 'span',
          _key: 'appreciation1.1',
          text: '这首诗以月为线索，通过对月光的观察和联想，自然地引出思乡之情。诗人用简单的语言，描绘出一个安静的夜晚，表达了深深的乡愁。诗中"举头"与"低头"的动作对比，形象地展现了诗人思乡时的神态，让读者感同身受。',
          marks: []
        }],
        markDefs: []
      }]
    })
    .commit()
    .then(() => {
      console.log('更新成功')
    })
    .catch(err => {
      console.error('更新失败:', err)
    })
}) 
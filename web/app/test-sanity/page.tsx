import { client } from '@/lib/sanity'

export default async function TestSanity() {
  try {
    // 测试查询，这里假设您有一个 'post' 类型的文档
    const test = await client.fetch(`*[_type == "post"][0...1]`)
    
    return (
      <div className="p-4">
        <h1>Sanity 连接测试</h1>
        <pre>{JSON.stringify(test, null, 2)}</pre>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-4">
        <h1>连接错误</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    )
  }
} 
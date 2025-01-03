const { createClient } = require('next-sanity')

interface Poet {
  name: string
  slug: { _type: 'slug'; current: string }
  birthYear?: number
  deathYear?: number
  biography?: string
}

interface Tag {
  name: string
  description?: string
}

interface Poem {
  title: string
  slug: { _type: 'slug'; current: string }
  author: { _type: 'reference'; _ref: string }
  dynasty: string
  content: string[]
  translation?: string[]
  appreciation?: string[]
  tags?: { _type: 'reference'; _ref: string }[]
}

const client = createClient({
  projectId: '3kr99v3e',
  dataset: 'production',
  apiVersion: '2024-03-19',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

async function createPoet(data: Poet) {
  return await client.create({
    _type: 'poet',
    ...data
  })
}

async function createTag(data: Tag) {
  return await client.create({
    _type: 'tag',
    ...data
  })
}

async function createPoem(data: Poem) {
  return await client.create({
    _type: 'poem',
    ...data
  })
}

async function seed() {
  try {
    // 创建诗人
    console.log('Creating poets...')
    const libai = await createPoet({
      name: '李白',
      slug: { _type: 'slug', current: 'li-bai' },
      birthYear: 701,
      deathYear: 762,
      biography: '李白（701年－762年），字太白，号青莲居士，唐代伟大的浪漫主义诗人，被后人誉为"诗仙"。'
    })

    const wangzhihuan = await createPoet({
      name: '王之涣',
      slug: { _type: 'slug', current: 'wang-zhi-huan' },
      birthYear: 688,
      deathYear: 742,
      biography: '王之涣（688年－742年），唐代著名诗人，善于写景抒情。'
    })

    const menghaoran = await createPoet({
      name: '孟浩然',
      slug: { _type: 'slug', current: 'meng-hao-ran' },
      birthYear: 689,
      deathYear: 740,
      biography: '孟浩然（689年－740年），唐代著名山水田园诗人，与王维并称"王孟"。'
    })

    // 创建标签
    console.log('Creating tags...')
    const [shuqing, sixiang, denggao, xiejing, tianyuan] = await Promise.all([
      createTag({ name: '抒情', description: '表达感情的诗歌' }),
      createTag({ name: '思乡', description: '描写思念故乡的诗歌' }),
      createTag({ name: '登高', description: '登高望远的诗歌' }),
      createTag({ name: '写景', description: '描写自然景色的诗歌' }),
      createTag({ name: '田园', description: '描写田园生活的诗歌' })
    ])

    // 创建诗歌
    console.log('Creating poems...')
    await createPoem({
      title: '静夜思',
      slug: { _type: 'slug', current: 'jing-ye-si' },
      author: { _type: 'reference', _ref: libai._id },
      dynasty: 'tang',
      content: [
        '床前明月光，',
        '疑是地上霜。',
        '举头望明月，',
        '低头思故乡。'
      ],
      translation: [
        '床前明亮的月光，',
        '好像地上的霜一样。',
        '抬头看看明月，',
        '低头想起故乡。'
      ],
      appreciation: [
        '这首诗以月为线索，通过对月光的观察和联想，自然地引出思乡之情。诗人用简单的语言，描绘出一个安静的夜晚，表达了深深的乡愁。',
        '诗中"举头"与"低头"的动作对比，形象地展现了诗人思乡时的神态，让读者感同身受。'
      ],
      tags: [
        { _type: 'reference', _ref: shuqing._id },
        { _type: 'reference', _ref: sixiang._id }
      ]
    })

    await createPoem({
      title: '登鹳雀楼',
      slug: { _type: 'slug', current: 'deng-guan-que-lou' },
      author: { _type: 'reference', _ref: wangzhihuan._id },
      dynasty: 'tang',
      content: [
        '白日依山尽，',
        '黄河入海流。',
        '欲穷千里目，',
        '更上一层楼。'
      ],
      translation: [
        '夕阳依傍着山峦慢慢下山，',
        '滔滔黄河向着大海奔流。',
        '如果想要看得更远，',
        '那就要再登上一层楼。'
      ],
      appreciation: [
        '这首诗以开阔的视野，描绘了一幅雄伟的自然画卷。诗人运用"白日"、"黄河"等意象，展现了壮阔的景色。',
        '最后两句点明主旨，表达了诗人追求进取的精神，寓意深远。'
      ],
      tags: [
        { _type: 'reference', _ref: denggao._id },
        { _type: 'reference', _ref: xiejing._id }
      ]
    })

    await createPoem({
      title: '春晓',
      slug: { _type: 'slug', current: 'chun-xiao' },
      author: { _type: 'reference', _ref: menghaoran._id },
      dynasty: 'tang',
      content: [
        '春眠不觉晓，',
        '处处闻啼鸟。',
        '夜来风雨声，',
        '花落知多少。'
      ],
      translation: [
        '春天里睡觉，不知不觉天就亮了，',
        '到处都能听到鸟儿在啼叫。',
        '昨夜里刮风下雨，',
        '不知道落了多少花瓣。'
      ],
      appreciation: [
        '这首诗以细腻的笔触，描绘了一个春天清晨的景象。诗人通过听觉和视觉的感受，展现了春天特有的生机与韵味。',
        '最后一句"花落知多少"既是对自然的关注，也暗含着对时光流逝的感叹。'
      ],
      tags: [
        { _type: 'reference', _ref: xiejing._id },
        { _type: 'reference', _ref: tianyuan._id }
      ]
    })

    console.log('Seeding completed successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

seed() 
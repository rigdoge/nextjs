import { client } from '@/lib/sanity'
import { NextResponse } from 'next/server'

const poets = [
  {
    _type: 'poet',
    name: '李白',
    slug: { _type: 'slug', current: 'li-bai' },
    biography: '李白（701年—762年），字太白，号青莲居士，唐代伟大的浪漫主义诗人，被后人誉为"诗仙"。'
  },
  {
    _type: 'poet',
    name: '王之涣',
    slug: { _type: 'slug', current: 'wang-zhi-huan' },
    biography: '王之涣（688年—742年），唐代诗人，善于写边塞诗，代表作有《登鹳雀楼》等。'
  },
  {
    _type: 'poet',
    name: '孟浩然',
    slug: { _type: 'slug', current: 'meng-hao-ran' },
    biography: '孟浩然（689年—740年），唐代著名山水田园诗人，与王维并称"王孟"。'
  }
]

const tags = [
  {
    _type: 'tag',
    name: '抒情',
    description: '表达诗人内心情感的诗歌'
  },
  {
    _type: 'tag',
    name: '思乡',
    description: '描写思念故乡、亲人的诗歌'
  },
  {
    _type: 'tag',
    name: '登高',
    description: '登高望远、抒发感慨的诗歌'
  },
  {
    _type: 'tag',
    name: '写景',
    description: '描写自然景色的诗歌'
  },
  {
    _type: 'tag',
    name: '田园',
    description: '描写田园生活的诗歌'
  }
]

export async function GET() {
  try {
    // 创建诗人
    const createdPoets = await Promise.all(
      poets.map(poet => client.create(poet))
    )

    // 创建标签
    const createdTags = await Promise.all(
      tags.map(tag => client.create(tag))
    )

    // 创建诗歌
    const poems = [
      {
        _type: 'poem',
        title: '静夜思',
        slug: { _type: 'slug', current: 'jing-ye-si' },
        content: '床前明月光，\n疑是地上霜。\n举头望明月，\n低头思故乡。',
        translation: '明亮的月光照在床前的地上，好像地上落了一层霜。抬头看看天上的明月，低下头来想起远方的家乡。',
        appreciation: '这首诗以月为线索，通过对月光的观察和联想，抒发了诗人思乡之情。诗中"举头"与"低头"的动作对比，形象地表现了诗人望月思乡的心理活动。',
        author: {
          _type: 'reference',
          _ref: createdPoets[0]._id
        },
        tags: [
          {
            _type: 'reference',
            _ref: createdTags[0]._id
          },
          {
            _type: 'reference',
            _ref: createdTags[1]._id
          }
        ]
      },
      {
        _type: 'poem',
        title: '登鹳雀楼',
        slug: { _type: 'slug', current: 'deng-guan-que-lou' },
        content: '白日依山尽，\n黄河入海流。\n欲穷千里目，\n更上一层楼。',
        translation: '夕阳依傍着山峦慢慢地落下，滔滔黄河向着大海奔流。想要看到更远的地方，就要再登上一层楼。',
        appreciation: '这首诗描写了诗人登楼远望的情景，表达了诗人追求进取的精神。诗中"白日"与"黄河"的意象，既写出了雄伟的自然景色，又暗示了时光流逝的永恒主题。',
        author: {
          _type: 'reference',
          _ref: createdPoets[1]._id
        },
        tags: [
          {
            _type: 'reference',
            _ref: createdTags[2]._id
          },
          {
            _type: 'reference',
            _ref: createdTags[3]._id
          }
        ]
      },
      {
        _type: 'poem',
        title: '春晓',
        slug: { _type: 'slug', current: 'chun-xiao' },
        content: '春眠不觉晓，\n处处闻啼鸟。\n夜来风雨声，\n花落知多少。',
        translation: '春天里睡觉，不知不觉天就亮了，四处都能听到鸟儿在啼叫。昨夜里刮风下雨，不知道落了多少花瓣。',
        appreciation: '这首诗描写了一个春天清晨的景象，通过听觉和视觉的感受，展现了春天特有的生机与韵味。诗中"不觉"与"知多少"的表达，既写出了诗人与自然的亲密关系，又流露出对春光易逝的惋惜之情。',
        author: {
          _type: 'reference',
          _ref: createdPoets[2]._id
        },
        tags: [
          {
            _type: 'reference',
            _ref: createdTags[3]._id
          },
          {
            _type: 'reference',
            _ref: createdTags[4]._id
          }
        ]
      }
    ]

    await Promise.all(poems.map(poem => client.create(poem)))

    return NextResponse.json({ message: '数据添加成功' })
  } catch (error) {
    console.error('Error seeding data:', error)
    return NextResponse.json({ error: '数据添加失败' }, { status: 500 })
  }
} 
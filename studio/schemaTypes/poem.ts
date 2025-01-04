export default {
  name: 'poem',
  title: '诗歌',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '标题',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: '链接',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: '作者',
      type: 'reference',
      to: [{ type: 'poet' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: '内容',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: '原文',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'pinyin',
              title: '拼音',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'translation',
      title: '译文',
      type: 'text',
    },
    {
      name: 'appreciation',
      title: '赏析',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
    },
    prepare({ title, author }: { title: string; author: string }) {
      return {
        title,
        subtitle: author ? `作者：${author}` : '',
      }
    },
  },
} 
export default {
  name: 'poem',
  title: '唐诗',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '诗名',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
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
      name: 'dynasty',
      title: '朝代',
      type: 'string',
      options: {
        list: [
          { title: '唐朝', value: 'tang' },
        ],
      },
      initialValue: 'tang',
    },
    {
      name: 'content',
      title: '诗句',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'text',
            title: '文字',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'pinyin',
            title: '拼音',
            type: 'string',
          }
        ],
        preview: {
          select: {
            text: 'text',
            pinyin: 'pinyin'
          },
          prepare({ text, pinyin }: any) {
            return {
              title: text,
              subtitle: pinyin
            }
          }
        }
      }],
      validation: (Rule: any) => Rule.required().min(1),
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
      of: [{ 
        type: 'block',
        styles: [
          {title: '正文', value: 'normal'},
          {title: '标题', value: 'h3'}
        ],
      }],
    },
    {
      name: 'tags',
      title: '标签',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    },
    {
      name: 'backgroundImage',
      title: '配图',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'backgroundImage',
    },
    prepare({ title, author, media }: any) {
      return {
        title,
        subtitle: author,
        media,
      }
    },
  },
} 
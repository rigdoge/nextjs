export default {
  name: 'poet',
  title: '诗人',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '姓名',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'portrait',
      title: '画像',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'birthYear',
      title: '生年',
      type: 'number',
    },
    {
      name: 'deathYear',
      title: '卒年',
      type: 'number',
    },
    {
      name: 'biography',
      title: '生平简介',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'achievements',
      title: '主要成就',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
} 
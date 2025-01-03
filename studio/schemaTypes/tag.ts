export default {
  name: 'tag',
  title: '标签',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '标签名',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: '描述',
      type: 'text',
    },
  ],
} 
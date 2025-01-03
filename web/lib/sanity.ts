import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '3kr99v3e',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_WRITE_TOKEN
})

const builder = imageUrlBuilder(client)

export function urlForImage(source: any) {
  return builder.image(source)
}

export async function getAllPoems() {
  const query = `*[_type == "poem"]{
    title,
    slug,
    content[]{
      text,
      pinyin
    },
    author->{name},
    translation,
    appreciation
  }`
  
  return await client.fetch(query)
} 
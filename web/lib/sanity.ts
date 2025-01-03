import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
})

export async function getPoem(slug: string) {
  return client.fetch(
    `*[_type == "poem" && slug.current == $slug][0]{
      title,
      content[]{
        text,
        pinyin
      },
      "author": author->name,
      "slug": slug.current,
      translation,
      appreciation
    }`,
    { slug }
  )
}

export async function getAllPoems() {
  return client.fetch(
    `*[_type == "poem"] | order(_createdAt desc) {
      title,
      "author": author->name,
      "slug": slug.current,
      content[0]{
        text,
        pinyin
      }
    }`
  )
}

export async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      content,
      "author": author->name,
      "slug": slug.current
    }`,
    { slug }
  )
}

export async function getAllPosts() {
  return client.fetch(
    `*[_type == "post"]{
      title,
      "author": author->name,
      "slug": slug.current
    }`
  )
} 
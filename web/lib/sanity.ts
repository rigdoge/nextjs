import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '3kr99v3e',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function getPoems() {
  return client.fetch(`*[_type == "poem"]{
    _id,
    title,
    slug,
    author->{name},
    content[]{text, pinyin}
  }`)
}

export async function getPoem(slug: string) {
  return client.fetch(`*[_type == "poem" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    author->{name},
    content[]{text, pinyin},
    translation,
    appreciation
  }`, { slug })
}

export async function getPost(slug: string) {
  return client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    author,
    content,
    mainImage
  }`)
}

export async function getAllPosts() {
  return client.fetch(`*[_type == "post"]{
    _id,
    title,
    slug,
    author,
    content,
    mainImage
  }`)
} 
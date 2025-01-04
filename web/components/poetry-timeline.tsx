'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Poem {
  _id: string
  title: string
  slug: {
    current: string
  }
  author: {
    name: string
    dynasty: string
  }
}

interface PoemsByDynasty {
  [key: string]: Poem[]
}

const dynastyOrder = ['唐', '宋', '元', '明', '清']
const dynastyColors: { [key: string]: string } = {
  '唐': 'from-purple-500/20',
  '宋': 'from-blue-500/20',
  '元': 'from-green-500/20',
  '明': 'from-red-500/20',
  '清': 'from-yellow-500/20',
}

export function PoetryTimeline({ poems }: { poems: Poem[] }) {
  // 按朝代分组诗歌
  const poemsByDynasty = poems.reduce((acc: PoemsByDynasty, poem) => {
    const dynasty = poem.author.dynasty
    if (!acc[dynasty]) {
      acc[dynasty] = []
    }
    acc[dynasty].push(poem)
    return acc
  }, {})

  // 按预定义顺序排序朝代
  const sortedDynasties = Object.keys(poemsByDynasty).sort(
    (a, b) => dynastyOrder.indexOf(a) - dynastyOrder.indexOf(b)
  )

  return (
    <div className="relative">
      {/* 时间线中心线 */}
      <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-green-500/20" />

      <div className="space-y-24">
        {sortedDynasties.map((dynasty, dynastyIndex) => (
          <motion.div
            key={dynasty}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dynastyIndex * 0.2 }}
            className="relative"
          >
            {/* 朝代标题 */}
            <div className="mb-8 text-center">
              <motion.h2
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="inline-block rounded-full bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-2 text-2xl font-bold"
              >
                {dynasty}朝
              </motion.h2>
            </div>

            {/* 诗歌列表 */}
            <div className="grid gap-8 md:grid-cols-2">
              {poemsByDynasty[dynasty].map((poem, index) => (
                <motion.div
                  key={poem._id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: dynastyIndex * 0.2 + (index * 0.1) }}
                  className={`relative ${index % 2 === 0 ? 'md:text-right' : ''}`}
                >
                  <a href={`/poetry/${poem.slug.current}`}>
                    <div
                      className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${
                        dynastyColors[dynasty]
                      } to-gray-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl poem-card float-animation`}
                      style={{
                        animationDelay: `${index * 0.2}s`
                      }}
                    >
                      {/* 发光效果 */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      
                      <h3 className="mb-2 text-xl font-bold text-white/90">
                        {poem.title}
                      </h3>
                      <p className="text-sm text-white/70">{poem.author.name}</p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 
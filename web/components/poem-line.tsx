import React from 'react'

interface PoemLineProps {
  text: string
  pinyin?: string
}

export function PoemLine({ text, pinyin }: PoemLineProps) {
  const characters = text.split('')
  const pinyinArray = pinyin ? pinyin.split(' ') : []

  return (
    <div className="flex justify-center w-full poem-line">
      {characters.map((char, index) => (
        <div key={index} className="flex flex-col items-center w-[60px]">
          <span className="text-sm text-gray-600 min-h-[1.5em] text-center pinyin">
            {pinyinArray[index] || ''}
          </span>
          <span className="text-3xl font-song">{char}</span>
        </div>
      ))}
    </div>
  )
} 
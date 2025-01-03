'use client'

import { useState } from 'react'

export function PinyinToggle() {
  const [showPinyin, setShowPinyin] = useState(false)

  const handleToggle = () => {
    const newState = !showPinyin
    setShowPinyin(newState)
    const pinyinElements = document.querySelectorAll('.pinyin-text')
    pinyinElements.forEach(element => {
      if (newState) {
        element.classList.remove('hidden')
      } else {
        element.classList.add('hidden')
      }
    })
  }

  return (
    <button
      onClick={handleToggle}
      className="px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 text-sm font-medium transition-colors"
    >
      {showPinyin ? '隐藏拼音' : '显示拼音'}
    </button>
  )
} 
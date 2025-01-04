'use client'

import { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'

export function PinyinToggle() {
  const [showPinyin, setShowPinyin] = useState(false)

  useEffect(() => {
    // 从 localStorage 读取状态
    const savedState = localStorage.getItem('showPinyin')
    setShowPinyin(savedState === 'true')
  }, [])

  useEffect(() => {
    // 保存状态到 localStorage
    localStorage.setItem('showPinyin', String(showPinyin))
    // 更新 CSS 变量
    document.documentElement.style.setProperty(
      '--pinyin-display',
      showPinyin ? 'block' : 'none'
    )
  }, [showPinyin])

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={showPinyin}
        onCheckedChange={setShowPinyin}
        aria-label="Toggle pinyin"
      />
      <span className="text-sm text-gray-500">拼音</span>
    </div>
  )
} 
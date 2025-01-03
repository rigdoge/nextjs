import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '古诗文鉴赏',
  description: '探索中国古典诗词的优美意境，感受千年文化的深邃魅力',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="relative min-h-screen bg-background">
          <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
          <div className="absolute h-full w-full bg-gradient-to-t from-background to-transparent" />
          
          {/* Meteor Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="meteor-effect" style={{ top: '10%', left: '50%' }} />
            <div className="meteor-effect" style={{ top: '50%', left: '40%', animationDelay: '2s' }} />
            <div className="meteor-effect" style={{ top: '30%', left: '60%', animationDelay: '4s' }} />
          </div>
          
          <div className="relative">
            <SiteHeader />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

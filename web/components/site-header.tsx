import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              古诗文鉴赏
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/poetry"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              诗歌
            </Link>
            <Link
              href="/poets"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              诗人
            </Link>
            <Link
              href="/tags"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              标签
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
} 
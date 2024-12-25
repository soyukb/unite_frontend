'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false)

  // ダークモードの切り替え
  const toggleTheme = () => {
    setIsDark(!isDark)
    // documentのclassListにdarkを追加/削除
    document.documentElement.classList.toggle('dark')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  )
}


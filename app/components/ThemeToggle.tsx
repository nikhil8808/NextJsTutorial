'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="px-3 py-2 rounded-md border text-sm dark:border-gray-700"
    >
      {isDark ? 'Light mode' : 'Dark mode'}
    </button>
  )
}

export default ThemeToggle

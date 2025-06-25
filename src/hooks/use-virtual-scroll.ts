"use client"

import { useState, useMemo } from "react"

interface UseVirtualScrollProps {
  items: any[]
  itemHeight: number
  containerHeight: number
  overscan?: number
}

export function useVirtualScroll({ items, itemHeight, containerHeight, overscan = 5 }: UseVirtualScrollProps) {
  const [scrollTop, setScrollTop] = useState(0)

  const visibleRange = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
    const visibleCount = Math.ceil(containerHeight / itemHeight)
    const end = Math.min(items.length, start + visibleCount + overscan * 2)

    return { start, end }
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan])

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end).map((item, index) => ({
      ...item,
      index: visibleRange.start + index,
    }))
  }, [items, visibleRange])

  const totalHeight = items.length * itemHeight

  return {
    visibleItems,
    totalHeight,
    visibleRange,
    setScrollTop,
  }
}

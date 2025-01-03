'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const INTERSECTION_OPTIONS = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
} as const

export default function useIntersectionObserver() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const callback = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      setIsVisible(true)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(callback, INTERSECTION_OPTIONS)
    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [callback])

  return { ref, isVisible }
}


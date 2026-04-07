'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Kills all ScrollTrigger instances when navigating away from a page,
 * and refreshes positions when arriving at a new page.
 * Must be rendered inside the root layout.
 */
export default function ScrollTriggerManager() {
  const pathname = usePathname()

  useEffect(() => {
    // Recalculate all trigger positions after page content has rendered
    const id = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => {
      clearTimeout(id)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [pathname])

  return null
}

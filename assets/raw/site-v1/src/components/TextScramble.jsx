import { useState, useEffect, useCallback } from 'react'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export default function TextScramble({ words, interval = 3000, className = '' }) {
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState(words[0])
  const [isScrambling, setIsScrambling] = useState(false)

  const scramble = useCallback((target) => {
    setIsScrambling(true)
    let iteration = 0
    const length = Math.max(display.length, target.length)

    const timer = setInterval(() => {
      setDisplay(
        target
          .split('')
          .map((char, i) => {
            if (i < iteration) return char
            if (char === ' ') return ' '
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iteration >= length) {
        clearInterval(timer)
        setDisplay(target)
        setIsScrambling(false)
      }
      iteration += 1
    }, 30)

    return () => clearInterval(timer)
  }, [display])

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (index + 1) % words.length
      setIndex(nextIndex)
      scramble(words[nextIndex])
    }, interval)
    return () => clearInterval(timer)
  }, [index, words, interval, scramble])

  return <span className={className}>{display}</span>
}

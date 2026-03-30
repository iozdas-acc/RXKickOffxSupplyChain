import { useEffect, useRef, useCallback } from 'react'

export default function ParticleField({ color = '#7C3AED', count = 50, className = '' }) {
  const canvasRef = useRef(null)

  const setup = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    let resizeTimer

    // Reduce count on mobile for performance
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? Math.floor(count * 0.5) : count

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const createParticles = () => {
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.offsetWidth
        if (p.x > canvas.offsetWidth) p.x = 0
        if (p.y < 0) p.y = canvas.offsetHeight
        if (p.y > canvas.offsetHeight) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      })

      // Draw lines between nearby particles
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = color
            ctx.globalAlpha = (1 - dist / 120) * 0.15
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(draw)
    }

    resize()
    createParticles()
    draw()

    // Debounced resize handler
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resize()
        createParticles()
      }, 200)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
    }
  }, [color, count])

  useEffect(() => {
    return setup()
  }, [setup])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}

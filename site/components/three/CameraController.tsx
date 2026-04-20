'use client'

import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'

interface Props {
  chapter: number
  entered: boolean
}

// Per-chapter camera targets. Index 0 is the hero entrance; chapters 0..4
// map to indices 1..5 so `entered ? chapter + 1 : 0` selects the target.
// Scenes play centred, full-viewport during the "hero moment" transition
// (the brief between-chapter window where 3D is dominant and content is
// faded). Camera targets are the original staging positions.
const CAMERA_TARGETS: { pos: [number, number, number]; lookAt: [number, number, number] }[] = [
  { pos: [-1.2, 1.8, 12.0], lookAt: [2.2, 0.2, 0] }, // landing — storefront framed right 55%, sign above eye-line
  { pos: [0, 0.9, 7.6],     lookAt: [0, -0.1,  0] }, // Ch.1 Hero — shelf stocking, centred

  { pos: [-2, 1.2, 7], lookAt: [0, 0.5,  0] }, // Ch.2 Conveyor
  { pos: [0, 2.5, 10], lookAt: [0, 0,    0] }, // Ch.3 Pace
  { pos: [0, 3.5, 11], lookAt: [0, 0,    0] }, // Ch.4 Aisles
  { pos: [0, 2,   9],  lookAt: [0, 0.5,  0] }, // Ch.5 Basket
]

// Portrait-mode override for the landing: pulled back with a gentle tilt
// so the store reads as "a Sainsbury's across the street" — canopy doesn't
// occlude the sign, the scene sits in the lower half, text lives above.
const LANDING_PORTRAIT: { pos: [number, number, number]; lookAt: [number, number, number] } = {
  pos: [2.2, 2.6, 40.0],
  lookAt: [2.6, -1.3, 0],
}

export function CameraController({ chapter, entered }: Props) {
  const { camera } = useThree()
  const mouseTarget = useRef({ x: 0, y: 0 })
  const mouseCurrent = useRef({ x: 0, y: 0 })
  // Own portrait detection — useThree().size can be stale at mount time.
  const [isPortrait, setIsPortrait] = useState(false)

  useEffect(() => {
    const compute = () => setIsPortrait(window.innerWidth < window.innerHeight)
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  const resolveTarget = () => {
    if (!entered && isPortrait) return LANDING_PORTRAIT
    const idx = !entered ? 0 : chapter + 1
    return CAMERA_TARGETS[idx] ?? CAMERA_TARGETS[1]
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const t = resolveTarget()
    gsap.to(camera.position, {
      x: t.pos[0],
      y: t.pos[1],
      z: t.pos[2],
      duration: 1.8,
      ease: 'expo.inOut',
      overwrite: 'auto',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, entered, camera, isPortrait])

  useFrame(() => {
    mouseCurrent.current.x +=
      (mouseTarget.current.x - mouseCurrent.current.x) * 0.03
    mouseCurrent.current.y +=
      (mouseTarget.current.y - mouseCurrent.current.y) * 0.03

    const t = resolveTarget()
    camera.position.x =
      camera.position.x * 0.95 +
      (t.pos[0] + mouseCurrent.current.x * 0.4) * 0.05
    camera.position.y =
      camera.position.y * 0.95 +
      (t.pos[1] - mouseCurrent.current.y * 0.2) * 0.05
    camera.lookAt(t.lookAt[0], t.lookAt[1], t.lookAt[2])
  })

  return null
}

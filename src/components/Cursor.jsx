import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// A soft ring that trails the pointer and opens up over things you can touch.
export default function Cursor() {
  const [fine, setFine] = useState(false)
  const [mode, setMode] = useState({ grow: false, label: '' })
  const [shown, setShown] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 })

  useEffect(() => {
    const ok = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setFine(ok)
    if (!ok) return
    document.documentElement.classList.add('has-cursor')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setShown(true)
      const t = e.target instanceof Element ? e.target : null
      const tagged = t?.closest('[data-cursor]')
      const link = t?.closest('a, button')
      const label = tagged?.getAttribute('data-cursor') || ''
      setMode((m) => (m.label === label && m.grow === !!(link || tagged) ? m : { grow: !!(link || tagged), label }))
    }
    const leave = () => setShown(false)
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  if (!fine) return null
  const size = mode.label ? 92 : mode.grow ? 56 : 30
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y, opacity: shown && !mode.label ? 1 : 0 }} aria-hidden="true" />
      <motion.div className="cursor-ring" style={{ x: rx, y: ry, opacity: shown ? 1 : 0 }} aria-hidden="true">
        <motion.span
          className={'cursor-ring-in' + (mode.label ? ' filled' : '')}
          animate={{ width: size, height: size }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        >
          {mode.label}
        </motion.span>
      </motion.div>
    </>
  )
}

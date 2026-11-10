import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// The night behind everything: slow coloured light and a field of stars.
export default function Sky() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, stars, id, shoot = null
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const build = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((w * h) / 9000)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.25,
        p: Math.random() * Math.PI * 2,
        s: Math.random() * 0.8 + 0.25,
        gold: Math.random() < 0.14,
      }))
    }

    const draw = (t) => {
      const time = t / 1000
      ctx.clearRect(0, 0, w, h)
      const drift = (window.scrollY || 0) * 0.04
      for (const st of stars) {
        const a = still ? 0.5 : 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(time * st.s + st.p))
        const y = (((st.y - drift * st.r) % h) + h) % h
        ctx.beginPath()
        ctx.arc(st.x, y, st.r, 0, Math.PI * 2)
        ctx.fillStyle = st.gold ? `rgba(214,184,128,${a})` : `rgba(237,228,216,${a})`
        ctx.fill()
      }
      if (!still) {
        if (!shoot && Math.random() < 0.0018) {
          shoot = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.35, life: 0 }
        }
        if (shoot) {
          shoot.life += 0.02
          const len = 150
          const x = shoot.x + shoot.life * 420
          const y = shoot.y + shoot.life * 150
          const g = ctx.createLinearGradient(x - len, y - len * 0.36, x, y)
          const a = Math.sin(Math.min(shoot.life, 1) * Math.PI) * 0.7
          g.addColorStop(0, 'rgba(237,228,216,0)')
          g.addColorStop(1, `rgba(237,228,216,${a})`)
          ctx.strokeStyle = g
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(x - len, y - len * 0.36)
          ctx.lineTo(x, y)
          ctx.stroke()
          if (shoot.life >= 1) shoot = null
        }
        id = requestAnimationFrame(draw)
      }
    }

    build()
    id = requestAnimationFrame(draw)
    const onResize = () => {
      build()
      if (still) requestAnimationFrame(draw)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="sky" aria-hidden="true">
      <motion.div
        className="glow glow-rose"
        animate={{ x: ['-6%', '8%', '-6%'], y: ['0%', '10%', '0%'], scale: [1, 1.15, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="glow glow-lav"
        animate={{ x: ['5%', '-10%', '5%'], y: ['4%', '-8%', '4%'], scale: [1.1, 0.95, 1.1] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="glow glow-gold"
        animate={{ x: ['0%', '12%', '0%'], y: ['0%', '-12%', '0%'] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
      />
      <canvas ref={ref} className="stars" />
    </div>
  )
}

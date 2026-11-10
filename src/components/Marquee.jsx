import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { marquee } from '../content.js'

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

function Row({ base, items }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 })
  const factor = useTransform(velocity, [0, 1200], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)
  const skew = useTransform(velocity, [-2500, 2500], [6, -6])
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    let move = dir.current * base * (delta / 1000)
    move += dir.current * move * Math.abs(f)
    baseX.set(baseX.get() + move)
  })

  return (
    <div className="marquee-row">
      <motion.div className="marquee-track" style={{ x, skewX: skew }}>
        {[0, 1, 2, 3].map((k) => (
          <span className="marquee-set" key={k} aria-hidden={k > 0}>
            {items.map((w, i) => (
              <span key={i} className={i % 2 ? 'marquee-word outline' : 'marquee-word'}>
                {w}
                <b>✦</b>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="marquee" aria-label="What I make">
      <Row base={-1.6} items={marquee} />
      <Row base={1.3} items={[...marquee].reverse()} />
    </section>
  )
}

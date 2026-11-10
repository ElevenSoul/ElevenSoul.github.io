import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import Heading from './Heading.jsx'
import { me } from '../content.js'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const blur = useTransform(progress, range, [3, 0])
  const filter = useTransform(blur, (b) => `blur(${b}px)`)
  return (
    <motion.span className="about-word" style={{ opacity, filter }}>
      {children}{' '}
    </motion.span>
  )
}

function Vinyl() {
  const rotate = useMotionValue(0)
  const { scrollY } = useScroll()
  const v = useSpring(useVelocity(scrollY), { damping: 40, stiffness: 200 })
  useAnimationFrame((_, delta) => {
    // 33 and a third turns a minute, plus a push from scrolling.
    rotate.set(rotate.get() + (delta / 1000) * 200 * 0.3 + v.get() * 0.004)
  })
  return (
    <div className="vinyl" aria-hidden="true">
      <motion.svg viewBox="-100 -100 200 200" style={{ rotate }}>
        <defs>
          <radialGradient id="vinyl-sheen" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2b2633" />
            <stop offset="100%" stopColor="#100e14" />
          </radialGradient>
          <linearGradient id="vinyl-light" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ede4d8" stopOpacity="0.16" />
            <stop offset="50%" stopColor="#ede4d8" stopOpacity="0" />
            <stop offset="100%" stopColor="#ede4d8" stopOpacity="0.1" />
          </linearGradient>
          <path id="label-arc" d="M -24 0 A 24 24 0 1 1 24 0" fill="none" />
        </defs>
        <circle r="98" fill="url(#vinyl-sheen)" />
        {Array.from({ length: 22 }).map((_, i) => (
          <circle key={i} r={42 + i * 2.5} fill="none" stroke="#ede4d8" strokeOpacity={i % 5 === 0 ? 0.1 : 0.04} strokeWidth="0.4" />
        ))}
        <circle r="98" fill="url(#vinyl-light)" />
        <circle r="34" fill="#c9a96e" />
        <circle r="34" fill="none" stroke="#17141c" strokeOpacity="0.35" strokeWidth="0.5" />
        <circle r="30" fill="none" stroke="#17141c" strokeOpacity="0.25" strokeWidth="0.3" />
        <text className="vinyl-arc" fill="#17141c">
          <textPath href="#label-arc" startOffset="50%" textAnchor="middle">ELEVEN · SIDE A · 33⅓</textPath>
        </text>
        <text className="vinyl-xi" y="17" textAnchor="middle" fill="#17141c">XI</text>
        <circle r="2.4" fill="#17141c" />
      </motion.svg>
      <div className="vinyl-arm" />
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const words = me.about.split(' ')
  const facts = [
    ['Name', me.name],
    ['Age', me.age],
    ['From', me.from],
    ['Instruments', me.instruments.join(', ')],
  ]

  return (
    <section className="section about" aria-labelledby="about">
      <div className="wrap">
        <Heading num="I" label="Liner notes" title="About the artist" id="about" />
        <div className="about-grid">
          <p className="about-text" ref={ref}>
            {words.map((w, i) => {
              const start = i / words.length
              return (
                <Word key={i} progress={scrollYProgress} range={[start, Math.min(1, start + 6 / words.length)]}>
                  {w}
                </Word>
              )
            })}
          </p>
          <div className="about-side">
            <Vinyl />
            <dl className="facts">
              {facts.map(([k, v], i) => (
                <motion.div
                  className="fact"
                  key={k}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{ duration: 0.9, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                >
                  <dt className="eyebrow">{k}</dt>
                  <dd>{v}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

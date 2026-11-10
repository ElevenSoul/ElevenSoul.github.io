import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { me } from '../content.js'

const EASE = [0.22, 1, 0.36, 1]

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '38%'])
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.86])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const moonY = useTransform(scrollYProgress, [0, 1], ['0%', '-45%'])

  // The moon leans a little toward the pointer.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 18 })
  const sy = useSpring(my, { stiffness: 40, damping: 18 })
  const moonX = useTransform(sx, (v) => v * -34)
  const moonTilt = useTransform(sy, (v) => v * -24)
  const wordX = useTransform(sx, (v) => v * 14)

  useEffect(() => {
    const move = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  const letters = me.name.split('')
  const show = ready ? 'show' : 'hide'

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="moon-wrap" style={{ y: moonY }} aria-hidden="true">
        <motion.div
          className="moon-pos"
          style={{ x: moonX, y: moonTilt }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2.6, ease: EASE }}
        >
          {/* A dial of twelve marks. The eleventh one is lit. */}
          <motion.svg
            className="dial"
            viewBox="-100 -100 200 200"
            animate={{ rotate: 360 }}
            transition={{ duration: 240, repeat: Infinity, ease: 'linear' }}
          >
            <circle r="96" className="dial-ring" />
            <circle r="80" className="dial-ring faint" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="0"
                y1="-96"
                x2="0"
                y2={i === 10 ? -84 : -90}
                className={i === 10 ? 'dial-tick lit' : 'dial-tick'}
                transform={`rotate(${(i + 1) * 30})`}
              />
            ))}
            <circle r="2.2" cy="-80" className="dial-dot" transform="rotate(330)" />
          </motion.svg>
          <div className="moon" />
        </motion.div>
      </motion.div>

      <motion.div className="hero-inner" style={{ opacity: fade }}>
        <motion.p
          className="eyebrow hero-eyebrow"
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={ready ? { opacity: 1, letterSpacing: '0.34em' } : {}}
          transition={{ duration: 1.8, delay: 0.5, ease: EASE }}
        >
          Portfolio <span className="star">✦</span> Vol. I <span className="star">✦</span> MMXXVI
        </motion.p>

        <motion.div className="title-wrap" style={{ y: titleY, scale: titleScale, x: wordX }}>
          <motion.span
            className="script hero-script"
            initial={{ opacity: 0, x: -20, rotate: -10 }}
            animate={ready ? { opacity: 1, x: 0, rotate: -7 } : {}}
            transition={{ duration: 1.6, delay: 1.25, ease: EASE }}
            aria-hidden="true"
          >
            the works of
          </motion.span>
          <motion.h1
            className="title"
            aria-label={me.name}
            initial="hide"
            animate={show}
            variants={{ show: { transition: { staggerChildren: 0.085, delayChildren: 0.15 } } }}
          >
            {letters.map((ch, i) => (
              <span className="title-clip" key={i} aria-hidden="true">
                <motion.span
                  className="title-letter"
                  variants={{
                    hide: { y: '115%', rotate: 9, opacity: 0, filter: 'blur(10px)' },
                    show: {
                      y: '0%',
                      rotate: 0,
                      opacity: 1,
                      filter: 'blur(0px)',
                      transition: { duration: 1.5, ease: EASE },
                    },
                  }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </motion.h1>
          <motion.span
            className="arabic hero-arabic"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 2, delay: 1.5 }}
            aria-hidden="true"
          >
            ١١
          </motion.span>
        </motion.div>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 1.35, ease: EASE }}
        >
          {me.tagline}
        </motion.p>
      </motion.div>

      <motion.div className="hero-foot-wrap" style={{ opacity: fade }}>
      <motion.div
        className="hero-foot"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1.6, delay: 1.9 }}
      >
        <span className="eyebrow">Sultanate of Oman · 21° N 57° E</span>
        <span className="scroll-hint" aria-hidden="true">
          <motion.i animate={{ scaleY: [0, 1, 1], y: ['0%', '0%', '100%'] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
        </span>
        <span className="eyebrow right">Scripts · Sites · Bots</span>
      </motion.div>
      </motion.div>
    </section>
  )
}

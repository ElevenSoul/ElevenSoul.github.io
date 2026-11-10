import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']
const EASE = [0.76, 0, 0.24, 1]

// The curtain. It counts to eleven, then lifts.
export default function Loader({ onDone }) {
  const [n, setN] = useState(0)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (n < 11) {
      const t = setTimeout(() => setN(n + 1), n === 0 ? 350 : 120)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setOpen(false), 520)
    return () => clearTimeout(t)
  }, [n])

  useEffect(() => {
    if (!open) {
      const t = setTimeout(onDone, 450)
      return () => clearTimeout(t)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="loader"
          exit={{ y: '-100%', transition: { duration: 1.1, ease: EASE } }}
          aria-hidden="true"
        >
          <div className="loader-dial">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className={'loader-tick' + (i < n ? ' on' : '') + (i === 10 && n === 11 ? ' gold' : '')}
                style={{ transform: `rotate(${(i + 1) * 30}deg) translateY(calc(var(--dial) * -0.5))` }}
              />
            ))}
            <motion.span
              key={n}
              className="loader-num"
              initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.28 }}
            >
              {ROMAN[n] || '·'}
            </motion.span>
          </div>
          <motion.p
            className="loader-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            the lights go down
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

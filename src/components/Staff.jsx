import { motion } from 'framer-motion'

// A line of sheet music that draws itself as it comes into view.
const NOTES = [
  [90, 4], [150, 2], [205, 5], [270, 3], [330, 1], [395, 4], [455, 6], [520, 3], [585, 5], [650, 2], [715, 4],
]

export default function Staff({ flip }) {
  return (
    <div className={'staff' + (flip ? ' flip' : '')} aria-hidden="true">
      <motion.svg viewBox="0 0 800 70" preserveAspectRatio="none" initial="hide" whileInView="show" viewport={{ once: true, margin: '-12% 0px' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.line
            key={i}
            x1="0"
            x2="800"
            y1={15 + i * 10}
            y2={15 + i * 10}
            className="staff-line"
            variants={{ hide: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { duration: 2, delay: i * 0.12, ease: [0.65, 0, 0.35, 1] } } }}
          />
        ))}
      </motion.svg>
      <motion.div className="staff-notes" initial="hide" whileInView="show" viewport={{ once: true, margin: '-12% 0px' }} variants={{ show: { transition: { staggerChildren: 0.11, delayChildren: 0.7 } } }}>
        {NOTES.map(([x, step], i) => (
          <motion.span
            key={i}
            className={'note' + (i === 10 ? ' gold' : '')}
            style={{ left: `${(x / 800) * 100}%`, top: `${15 + step * 5}px` }}
            variants={{ hide: { opacity: 0, y: 12, scale: 0.4 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 14 } } }}
          />
        ))}
      </motion.div>
    </div>
  )
}

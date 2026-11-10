import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// The pictures inside the gallery frames.

function Photos({ images, title }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (images.length < 2) return
    const t = setInterval(() => setI((v) => (v + 1) % images.length), 3400)
    return () => clearInterval(t)
  }, [images.length])
  return (
    <div className="art art-photos">
      <AnimatePresence mode="sync" initial={false}>
        <motion.img
          key={i}
          src={images[i]}
          alt={`${title}, screen ${i + 1} of ${images.length}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          draggable="false"
        />
      </AnimatePresence>
      <div className="art-dots" aria-hidden="true">
        {images.map((_, k) => (
          <span key={k} className={k === i ? 'on' : ''} />
        ))}
      </div>
    </div>
  )
}

// A single brush circle, drawn in one breath.
function Enso() {
  return (
    <div className="art art-enso">
      <svg viewBox="0 0 400 300" role="img" aria-label="An ink circle, drawn in one stroke">
        <defs>
          <filter id="ink" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035 0.06" numOctaves="3" seed="11" />
            <feDisplacementMap in="SourceGraphic" scale="9" />
          </filter>
          <linearGradient id="ink-fade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ede4d8" />
            <stop offset="100%" stopColor="#d4a5a5" />
          </linearGradient>
        </defs>
        <g filter="url(#ink)">
          <motion.path
            d="M 262 82 C 222 48, 150 52, 122 104 C 94 158, 122 226, 188 236 C 256 246, 300 190, 286 128"
            fill="none"
            stroke="url(#ink-fade)"
            strokeWidth="17"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.92 }}
            viewport={{ once: false, margin: '-15% 0px' }}
            transition={{ duration: 2.6, ease: [0.65, 0, 0.2, 1] }}
          />
          <motion.path
            d="M 255 90 C 220 62, 160 66, 136 110"
            fill="none"
            stroke="#ede4d8"
            strokeOpacity="0.35"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false, margin: '-15% 0px' }}
            transition={{ duration: 1.8, delay: 0.5 }}
          />
        </g>
        <motion.g initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ delay: 2.2, type: 'spring', stiffness: 200, damping: 12 }} style={{ transformOrigin: '322px 238px' }}>
          <rect x="310" y="226" width="24" height="24" rx="2" fill="#b86a6a" />
          <text x="322" y="243" textAnchor="middle" className="seal">XI</text>
        </motion.g>
      </svg>
    </div>
  )
}

// A constellation that spells XI.
const STARS = [
  [96, 78], [150, 150], [204, 224], [202, 80], [98, 222], // X
  [282, 76], [284, 150], [286, 226], // I
  [56, 150], [336, 118], [246, 40], [330, 250],
]
const LINES = [[0, 1], [1, 2], [3, 1], [1, 4], [5, 6], [6, 7], [8, 4], [3, 10], [5, 9], [7, 11]]

function Constellation() {
  return (
    <div className="art art-constellation">
      <svg viewBox="0 0 400 300" role="img" aria-label="A constellation in the shape of the numeral eleven">
        {LINES.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={STARS[a][0]}
            y1={STARS[a][1]}
            x2={STARS[b][0]}
            y2={STARS[b][1]}
            stroke={i < 6 ? '#c9a96e' : '#a39bae'}
            strokeOpacity={i < 6 ? 0.75 : 0.3}
            strokeWidth="0.8"
            strokeDasharray={i < 6 ? undefined : '2 4'}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false, margin: '-15% 0px' }}
            transition={{ duration: 1.1, delay: 0.3 + i * 0.16, ease: 'easeInOut' }}
          />
        ))}
        {STARS.map(([x, y], i) => (
          <motion.g key={i} animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 2.4 + (i % 4) * 0.7, repeat: Infinity, delay: i * 0.3 }}>
            <circle cx={x} cy={y} r={i < 8 ? 7 : 4} fill="#ede4d8" opacity="0.1" />
            <circle cx={x} cy={y} r={i < 8 ? 2.4 : 1.4} fill={i === 5 ? '#c9a96e' : '#ede4d8'} />
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

// Layers of slow water, the colour of dusk over the Gulf of Oman.
function wave(y, amp, phase) {
  let d = `M -20 ${y}`
  for (let x = -20; x <= 420; x += 20) {
    d += ` L ${x} ${(y + Math.sin(x / 46 + phase) * amp + Math.sin(x / 19 + phase * 2) * amp * 0.25).toFixed(1)}`
  }
  return d + ' L 420 320 L -20 320 Z'
}
const TINTS = ['#9d8fc2', '#b497b8', '#d4a5a5', '#d9b08c', '#c9a96e']

function Waves() {
  return (
    <div className="art art-waves">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Layered waves under a small sun">
        <motion.circle cx="290" cy="92" r="26" fill="#ede4d8" opacity="0.9" animate={{ cy: [92, 86, 92] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
        <circle cx="290" cy="92" r="52" fill="#ede4d8" opacity="0.07" />
        {TINTS.map((c, i) => (
          <motion.path
            key={i}
            fill={c}
            fillOpacity={0.28 + i * 0.1}
            animate={{ d: [wave(128 + i * 32, 12 - i, i * 1.3), wave(128 + i * 32, 12 - i, i * 1.3 + Math.PI), wave(128 + i * 32, 12 - i, i * 1.3 + Math.PI * 2)] }}
            transition={{ duration: 9 + i * 2.2, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function Art({ work }) {
  if (work.art === 'photos') return <Photos images={work.images} title={work.title} />
  if (work.art === 'enso') return <Enso />
  if (work.art === 'constellation') return <Constellation />
  return <Waves />
}

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Heading from './Heading.jsx'
import { repertoire } from '../content.js'

const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi']
const EASE = [0.22, 1, 0.36, 1]

export default function Repertoire() {
  const [active, setActive] = useState(0)
  return (
    <section className="section repertoire" aria-labelledby="repertoire">
      <div className="wrap">
        <Heading num="III" label="Repertoire" title="What I play" id="repertoire" />
        <ul className="rep-list" onPointerLeave={() => {}}>
          {repertoire.map((r, i) => {
            const on = active === i
            return (
              <motion.li
                key={r.title}
                className={'rep' + (on ? ' on' : '')}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 1, delay: i * 0.08, ease: EASE }}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
              >
                <button type="button" className="rep-head" onClick={() => setActive(i)} aria-expanded={on}>
                  <i className="rep-num">{ROMAN[i]}.</i>
                  <motion.span className="rep-title" animate={{ x: on ? 18 : 0 }} transition={{ duration: 0.7, ease: EASE }}>
                    {r.title}
                  </motion.span>
                  <motion.span className="rep-star" animate={{ rotate: on ? 180 : 0, scale: on ? 1 : 0.6, opacity: on ? 1 : 0.35 }} transition={{ duration: 0.8, ease: EASE }} aria-hidden="true">
                    ✦
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div className="rep-body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.7, ease: EASE }}>
                      <div className="rep-body-in">
                        <p>{r.text}</p>
                        <ul className="rep-notes">
                          {r.notes.map((n) => (
                            <li key={n}>{n}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {on && <motion.span className="rep-line" layoutId="rep-line" transition={{ duration: 0.8, ease: EASE }} />}
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

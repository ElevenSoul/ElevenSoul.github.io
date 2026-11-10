import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Magnetic from './Magnetic.jsx'
import { me } from '../content.js'
import { go } from './Nav.jsx'

const EASE = [0.22, 1, 0.36, 1]
const LINES = ["Let's make", 'something', 'beautiful.']

function Copy({ label, value }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    } catch {
      setDone(false)
    }
  }
  return (
    <Magnetic>
      <button type="button" className="pill" onClick={copy}>
        <span className="eyebrow">{label}</span>
        <span className="pill-value">{done ? 'Copied' : value}</span>
      </button>
    </Magnetic>
  )
}

export default function Coda() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const numY = useTransform(scrollYProgress, [0, 1], ['30%', '0%'])
  const numO = useTransform(scrollYProgress, [0.2, 1], [0, 0.09])
  const { github, discord, email } = me.links

  return (
    <section className="coda" ref={ref} aria-labelledby="contact">
      <motion.span className="arabic coda-num" style={{ y: numY, opacity: numO }} aria-hidden="true">
        ١١
      </motion.span>
      <div className="wrap coda-in">
        <p className="eyebrow heading-eyebrow">
          <i>IV</i>
          <span className="rule" />
          Coda
        </p>
        <h2 className="coda-title" id="contact" aria-label={LINES.join(' ')}>
          {LINES.map((line, i) => (
            <span className="clip" key={i} aria-hidden="true">
              <motion.span
                className={i === 2 ? 'accent' : ''}
                initial={{ y: '112%', rotate: 3 }}
                whileInView={{ y: '0%', rotate: 0 }}
                viewport={{ once: true, margin: '-12% 0px' }}
                transition={{ duration: 1.4, delay: i * 0.13, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
        <motion.p className="coda-text" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.4, ease: EASE }}>
          A script for your server, a site that feels like you, a bot with manners. Tell me the wish and I will tell you how I would build it.
        </motion.p>
        <motion.div className="coda-links" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.55, ease: EASE }}>
          {github && (
            <Magnetic>
              <a className="pill gold" href={github} target="_blank" rel="noreferrer">
                <span className="eyebrow">GitHub</span>
                <span className="pill-value">{github.replace('https://github.com/', '@')} ↗</span>
              </a>
            </Magnetic>
          )}
          {discord && <Copy label="Discord" value={discord} />}
          {email && <Copy label="Email" value={email} />}
        </motion.div>
      </div>
      <footer className="foot">
        <div className="wrap foot-in">
          <span className="eyebrow">© MMXXVI {me.name}</span>
          <span className="script foot-script">made at night, in {me.from}</span>
          <a className="eyebrow foot-top" href="#top" onClick={(e) => go(e, '#top')}>
            Back to the top ↑
          </a>
        </div>
      </footer>
    </section>
  )
}

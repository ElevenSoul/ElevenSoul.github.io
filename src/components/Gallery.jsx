import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import Heading from './Heading.jsx'
import Art from './Art.jsx'
import { works } from '../content.js'

const EASE = [0.22, 1, 0.36, 1]

function useWide() {
  const q = '(min-width: 900px) and (min-height: 560px)'
  const [wide, setWide] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = () => setWide(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return wide
}

// A framed picture that tilts toward the pointer and catches the light.
function Frame({ work, onOpen }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 120, damping: 16 })
  const sy = useSpring(py, { stiffness: 120, damping: 16 })
  const rotateY = useTransform(sx, [0, 1], [-9, 9])
  const rotateX = useTransform(sy, [0, 1], [7, -7])
  const gx = useTransform(sx, (v) => `${v * 100}%`)
  const gy = useTransform(sy, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(237,228,216,0.16), rgba(237,228,216,0) 55%)`

  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const leave = () => {
    px.set(0.5)
    py.set(0.5)
  }
  const canOpen = work.art === 'photos'
  const Tag = canOpen ? motion.button : motion.div

  return (
    <Tag
      ref={ref}
      type={canOpen ? 'button' : undefined}
      className="frame"
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={move}
      onPointerLeave={leave}
      onClick={canOpen ? onOpen : undefined}
      data-cursor={canOpen ? 'view' : undefined}
      aria-label={canOpen ? `Open ${work.title} pictures` : undefined}
      whileTap={canOpen ? { scale: 0.985 } : undefined}
    >
      <span className="frame-mat">
        <Art work={work} />
        <motion.span className="frame-glare" style={{ background: glare }} aria-hidden="true" />
      </span>
    </Tag>
  )
}

function Piece({ work, index, onOpen }) {
  return (
    <motion.article
      className={'piece' + (index % 2 ? ' low' : '')}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px -8% 0px -8%' }}
      transition={{ duration: 1.3, ease: EASE }}
    >
      <Frame work={work} onOpen={onOpen} />
      <div className="plaque">
        <p className="eyebrow plaque-no">
          No. {String(index + 1).padStart(2, '0')} <span className="rule" /> {work.kind}
        </p>
        <h3 className="plaque-title">{work.title}</h3>
        <p className="plaque-medium">
          {work.medium}, {work.year}
        </p>
        <p className="plaque-text">{work.text}</p>
        {work.link && (
          <a className="text-link" href={work.link} target="_blank" rel="noreferrer">
            View the code <span aria-hidden="true">↗</span>
          </a>
        )}
        {work.art === 'photos' && (
          <button type="button" className="text-link" onClick={onOpen}>
            See the pictures <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </motion.article>
  )
}

function Lightbox({ work, onClose }) {
  const [i, setI] = useState(0)
  const n = work.images.length
  useEffect(() => {
    window.__lenis?.stop()
    const key = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setI((v) => (v + 1) % n)
      if (e.key === 'ArrowLeft') setI((v) => (v - 1 + n) % n)
    }
    window.addEventListener('keydown', key)
    return () => {
      window.__lenis?.start()
      window.removeEventListener('keydown', key)
    }
  }, [])
  return (
    <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={`${work.title} pictures`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} onClick={onClose}>
      <motion.div className="lightbox-stage" initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 20 }} transition={{ duration: 0.7, ease: EASE }} onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img key={i} src={work.images[i]} alt={`${work.title}, screen ${i + 1} of ${n}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4, ease: EASE }} />
        </AnimatePresence>
        <div className="lightbox-bar">
          <button type="button" onClick={() => setI((i - 1 + n) % n)} aria-label="Previous picture">←</button>
          <span className="eyebrow">
            {work.title} · {i + 1} / {n}
          </span>
          <button type="button" onClick={() => setI((i + 1) % n)} aria-label="Next picture">→</button>
          <button type="button" className="lightbox-close" onClick={onClose} autoFocus>
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const wide = useWide()
  const pin = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)
  const [open, setOpen] = useState(null)
  const { scrollYProgress } = useScroll({ target: pin, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  const bar = useTransform(scrollYProgress, [0, 1], [0.04, 1])

  useLayoutEffect(() => {
    if (!wide) return
    const measure = () => setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [wide])

  const pieces = works.map((w, i) => <Piece key={w.title} work={w} index={i} onOpen={() => setOpen(w)} />)

  return (
    <section className="gallery" aria-labelledby="gallery">
      {wide ? (
        <div className="gallery-pin" ref={pin} style={{ height: `calc(100vh + ${dist}px)` }}>
          <div className="gallery-sticky">
            <motion.div className="gallery-track" ref={track} style={{ x }}>
              <div className="gallery-intro">
                <Heading num="II" label="The gallery" title="Selected works" id="gallery" />
                <p className="gallery-note">Keep scrolling. The room moves sideways.</p>
              </div>
              {pieces}
              <div className="gallery-end">
                <span className="script">more on the way</span>
              </div>
            </motion.div>
            <div className="gallery-bar" aria-hidden="true">
              <motion.span style={{ scaleX: bar }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="gallery-stack">
          <div className="wrap">
            <Heading num="II" label="The gallery" title="Selected works" id="gallery" />
          </div>
          <div className="wrap gallery-list">{pieces}</div>
        </div>
      )}
      {createPortal(<AnimatePresence>{open && <Lightbox key="lightbox" work={open} onClose={() => setOpen(null)} />}</AnimatePresence>, document.body)}
    </section>
  )
}

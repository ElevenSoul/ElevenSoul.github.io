import { useEffect, useState } from 'react'
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import Loader from './components/Loader.jsx'
import Sky from './components/Sky.jsx'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Gallery from './components/Gallery.jsx'
import Repertoire from './components/Repertoire.jsx'
import Coda from './components/Coda.jsx'
import Staff from './components/Staff.jsx'

export default function App() {
  const [ready, setReady] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  // Smooth, weighted scrolling for the whole page.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 })
    window.__lenis = lenis
    let id
    const raf = (t) => {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Loader onDone={() => setReady(true)} />
      <Sky />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Staff />
        <Gallery />
        <Repertoire />
        <Staff flip />
        <Coda />
      </main>
    </MotionConfig>
  )
}

import { motion } from 'framer-motion'

const LINKS = [
  ['I', 'About', '#about'],
  ['II', 'Gallery', '#gallery'],
  ['III', 'Repertoire', '#repertoire'],
  ['IV', 'Contact', '#contact'],
]

export function go(e, hash) {
  const el = document.querySelector(hash)
  if (!el) return
  e.preventDefault()
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.6 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav({ ready }) {
  return (
    <motion.header
      className="nav"
      initial={{ opacity: 0, y: -16 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="nav-mark" href="#top" onClick={(e) => go(e, '#top')} aria-label="Back to the top">
        <span>XI</span>
      </a>
      <nav className="nav-links" aria-label="Sections">
        {LINKS.map(([num, label, hash]) => (
          <a key={hash} href={hash} onClick={(e) => go(e, hash)}>
            <i>{num}</i>
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </motion.header>
  )
}

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

// Section heading: a movement number, a small label, and a large italic title.
export default function Heading({ num, label, title, id }) {
  return (
    <div className="heading">
      <motion.p
        className="eyebrow heading-eyebrow"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1, ease: EASE }}
      >
        <i>{num}</i>
        <span className="rule" />
        {label}
      </motion.p>
      <h2 className="heading-title" id={id}>
        {title.split(' ').map((w, i) => (
          <span className="clip" key={i}>
            <motion.span
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1.2, delay: i * 0.08, ease: EASE }}
            >
              {w}&nbsp;
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  )
}

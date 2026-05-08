import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const proofs = [
  { num: '247', label: 'reseñas ★★★★★' },
  { num: '4.9', label: 'puntuación media' },
  { num: '+3.000', label: 'hogares colombianos' },
  { num: '100%', label: 'natural, sin aditivos' },
  { num: '12 m', label: 'vida útil sin frío' },
]

export default function TrustBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="border-y border-gold/8 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-sans text-[10px] tracking-[0.45em] uppercase text-muted text-center mb-8"
        >
          La grasa de cocina que está cambiando hogares colombianos
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {proofs.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-serif text-2xl font-black text-gold/80">{p.num}</p>
              <p className="font-sans text-[10px] tracking-widest uppercase text-cream/30 mt-0.5">{p.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-8 border-t border-gold/8"
        >
          {[
            { label: 'INVIMA Certificado' },
            { label: 'BPM Colombia' },
            { label: 'Origen 100% colombiano' },
            { label: 'Envío a todo Colombia' },
            { label: 'Garantía de satisfacción' },
          ].map(b => (
            <div key={b.label} className="flex items-center gap-2">
              <span className="text-gold/50 text-xs">✓</span>
              <span className="font-sans text-[10px] tracking-widest uppercase text-cream/35">{b.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

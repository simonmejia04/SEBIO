import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 250, suffix: '°C', label: 'Punto de humo',     desc: 'Vs 130–160 °C de los aceites de semilla. Cocina sin oxidar la grasa.' },
  { value: 0,   suffix: '',   label: 'Aditivos',           desc: 'Cero conservantes, cero blanqueadores, cero antioxidantes artificiales.' },
  { value: 4,   suffix: '',   label: 'Vitaminas naturales', desc: 'A, D, E y K2 presentes de forma natural en cada cucharada.' },
  { value: 12,  suffix: 'm',  label: 'Vida útil',          desc: 'Meses sin refrigeración ni conservantes. Estable al calor y al aire.' },
]

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView || target === 0) return
    let start = 0
    const step = target / 60
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 20)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{target === 0 ? '0' : count}{suffix}</span>
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-20 lg:py-28 border-y border-gold/10 overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ background: 'radial-gradient(ellipse at center, #C8862A 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-sans text-xs tracking-[0.4em] uppercase text-gold text-center mb-14"
        >
          Lo que importa del sebo
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-dark p-8 lg:p-12 text-center group hover:bg-dark-2 transition-colors duration-500">
              <div className="font-serif text-5xl lg:text-7xl font-black text-gradient mb-3 leading-none">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="font-sans text-xs tracking-widest uppercase text-cream mb-2">{s.label}</div>
              <div className="font-sans text-xs text-muted leading-relaxed">{s.desc}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 text-center font-sans text-xs text-cream/30"
        >
          Los aceites de semilla llevan en tu cocina desde los años 60. El sebo, desde siempre. — <a href="#beneficios" className="text-gold/50 hover:text-gold underline transition-colors">Saber más</a>
        </motion.p>
      </div>
    </section>
  )
}

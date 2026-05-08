import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    quote: 'Llevaba años buscando algo que reemplazara el aceite de girasol. Desde que uso el sebo Sebio las papas me quedan como las de mi abuela — crujientes, sin ese olor raro que deja el aceite recalentado. No vuelvo atrás.',
    author: 'Camila Restrepo',
    role: 'Mamá, cocinera en casa',
    location: 'Medellín',
    rating: 5,
    metric: 'Cocina con sebo desde hace 4 meses',
    initial: 'CR',
  },
  {
    quote: 'Sigo dieta carnívora hace 6 meses. El sebo Sebio es parte de mi rutina diaria — lo uso para todo: carnes, huevos, hasta en el café. La calidad es constante y el envío siempre llega antes de lo que dicen.',
    author: 'Sebastián Mora',
    role: 'Atleta funcional',
    location: 'Bogotá',
    rating: 5,
    metric: 'Pedido mensual recurrente',
    initial: 'SM',
  },
  {
    quote: 'Soy nutricionista y empecé a recomendar sebo bovino a mis pacientes con resistencia a la insulina. Sebio es el único productor colombiano con información nutricional confiable y proceso artesanal verificable.',
    author: 'Dra. Lorena Patiño',
    role: 'Nutricionista clínica',
    location: 'Cali',
    rating: 5,
    metric: 'Lo recomienda a sus pacientes',
    initial: 'LP',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState(0)

  return (
    <section ref={ref} className="py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-4">
              Lo que dicen quienes ya cambiaron
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-5xl lg:text-6xl font-black text-cream leading-tight">
              Ellos ya
              <br /><em className="text-gold">volvieron.</em>
            </motion.h2>
          </div>

          {/* Stars + counter */}
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4">
            <div className="text-center">
              <p className="font-serif text-4xl font-black text-gold">4.9</p>
              <p className="font-sans text-[10px] tracking-widest uppercase text-muted">de 5 estrellas</p>
            </div>
            <div className="w-px h-12 bg-gold/20" />
            <div className="text-center">
              <p className="font-serif text-4xl font-black text-cream">247</p>
              <p className="font-sans text-[10px] tracking-widest uppercase text-muted">reseñas</p>
            </div>
            <div className="flex gap-0.5 ml-2">
              {[1,2,3,4,5].map(s => <span key={s} className="text-gold text-lg">★</span>)}
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-3 gap-px bg-gold/10">

            <div className="lg:col-span-2 bg-dark p-10 lg:p-14 relative">
              <span className="absolute top-6 left-8 font-serif text-8xl text-gold/8 leading-none select-none">"</span>
              <div className="flex mb-4">
                {Array(testimonials[active].rating).fill(0).map((_, i) => (
                  <span key={i} className="text-gold text-sm">★</span>
                ))}
              </div>
              <p className="font-serif text-xl lg:text-2xl text-cream/80 leading-relaxed mb-10 relative z-10">
                "{testimonials[active].quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center border border-gold/20 shrink-0">
                  <span className="font-serif text-sm font-bold text-gold">{testimonials[active].initial}</span>
                </div>
                <div>
                  <p className="font-serif text-base font-bold text-cream">{testimonials[active].author}</p>
                  <p className="font-sans text-xs text-muted">{testimonials[active].role} · {testimonials[active].location}</p>
                </div>
              </div>
            </div>

            <div className="bg-dark-2 p-10 lg:p-14 flex flex-col justify-between">
              <div>
                <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/40 mb-4">Contexto</p>
                <p className="font-serif text-2xl font-black text-gold leading-tight mb-4">
                  {testimonials[active].metric}
                </p>
                <div className="w-8 h-px bg-gold/30 mb-6" />
                <p className="font-sans text-xs text-cream/40 leading-relaxed">
                  Reseña verificada de cliente real. No incentivada.
                </p>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setActive(a => (a - 1 + testimonials.length) % testimonials.length)}
                  className="w-10 h-10 border border-cream/10 flex items-center justify-center text-cream/30 hover:border-gold/40 hover:text-gold transition-all duration-300">←</button>
                <button onClick={() => setActive(a => (a + 1) % testimonials.length)}
                  className="w-10 h-10 border border-cream/10 flex items-center justify-center text-cream/30 hover:border-gold/40 hover:text-gold transition-all duration-300">→</button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Selector */}
        <div className="flex justify-center gap-3 mt-6">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`h-px transition-all duration-500 ${active === i ? 'w-10 bg-gold' : 'w-5 bg-cream/20'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

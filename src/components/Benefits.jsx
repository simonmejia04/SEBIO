import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const benefits = [
  {
    num: '01',
    title: 'Punto de humo ~250 °C',
    body: 'Los aceites de semilla (girasol, maíz, canola) se oxidan entre 160–180 °C, liberando aldehídos y radicales libres. El sebo de res aguanta 250 °C sin degradarse. Fríe mejor, huele mejor, es más seguro.',
    tag: 'Ciencia de la cocina',
  },
  {
    num: '02',
    title: 'Vitaminas A, D, E y K2 naturales',
    body: 'La grasa animal transporta vitaminas liposolubles que el cuerpo absorbe directamente. La K2 regula el calcio; la D3 modula la inmunidad. Los aceites vegetales refinados no las tienen —o las destruyeron en el proceso.',
    tag: 'Nutrición',
  },
  {
    num: '03',
    title: 'Sin omega-6 proinflamatorio',
    body: 'El exceso de ácidos grasos omega-6 (común en aceites de semilla) está asociado a inflamación crónica. El sebo bovino tiene un perfil de omega-6 / omega-3 equilibrado, similar al de las grasas que consumían tus abuelos.',
    tag: 'Inflamación',
  },
  {
    num: '04',
    title: 'Sabor real, comida de verdad',
    body: 'Las papas fritas en sebo quedan crujientes afuera y suaves adentro. Las carnes sellan sin pegarse. Los huevos tienen yema brillante. No es nostalgia — es química: las grasas saturadas conducen mejor el calor y no interfieren con los sabores.',
    tag: 'Resultado en el plato',
  },
  {
    num: '05',
    title: 'Cero aditivos, cero secretos',
    body: 'Nuestro sebo tiene un ingrediente: grasa bovina. Sin antioxidantes sintéticos, sin BHA, sin BHT, sin "mezcla de aceites". Lo que lees en la etiqueta es lo que hay. Nada más.',
    tag: 'Transparencia',
  },
  {
    num: '06',
    title: 'Estable sin refrigeración',
    body: 'Las grasas saturadas no se oxidan fácilmente al contacto con el aire. Un frasco bien cerrado dura hasta 12 meses a temperatura ambiente. Sin nevera, sin conservantes, sin preocupaciones.',
    tag: 'Practicidad',
  },
]

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const itemV = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Benefits() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="beneficios" ref={ref} className="py-24 lg:py-36 bg-dark-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-4"
            >
              Por qué el sebo de res
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-5xl lg:text-7xl font-black text-cream leading-tight"
            >
              Lo que el
              <br />
              aceite vegetal
              <br />
              <em className="text-gold">no te dice.</em>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="self-end"
          >
            <p className="font-sans text-sm text-cream/50 leading-relaxed max-w-md">
              En los años 60, la industria alimentaria reemplazó las grasas animales con aceites de semilla baratos. Décadas después, la evidencia apunta en otra dirección. El sebo de res no es una moda — es volver al punto de partida.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10"
        >
          {benefits.map(b => (
            <motion.div key={b.num} variants={itemV}
              className="bg-dark-2 p-8 lg:p-10 group hover:bg-[#1F1008] transition-colors duration-500">
              <div className="flex items-start justify-between mb-6">
                <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/40 border border-gold/15 px-2 py-1">
                  {b.tag}
                </span>
                <span className="font-serif text-5xl font-black text-gold/8 group-hover:text-gold/15 transition-colors duration-500 leading-none">
                  {b.num}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-cream mb-4 group-hover:text-gold transition-colors duration-300">
                {b.title}
              </h3>
              <p className="font-sans text-sm text-cream/50 leading-relaxed">{b.body}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison callout — Anchoring: market reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid sm:grid-cols-3 gap-px bg-gold/10"
        >
          {[
            { fat: 'Aceite de girasol', smoke: '130 °C', omega6: 'Alto (65%)', vitamins: 'Ninguna', verdict: '⚠', verdictColor: 'text-orange-400' },
            { fat: 'Aceite de oliva virgen', smoke: '190 °C', omega6: 'Moderado (9%)', vitamins: 'Vitamina E', verdict: '✓', verdictColor: 'text-yellow-400' },
            { fat: 'Sebo Sebio', smoke: '~250 °C', omega6: 'Bajo (3%)', vitamins: 'A, D, E, K2', verdict: '✓✓', verdictColor: 'text-gold' },
          ].map(row => (
            <div key={row.fat} className="bg-dark p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="font-serif text-sm font-bold text-cream">{row.fat}</p>
                <span className={`font-serif text-xl font-black ${row.verdictColor}`}>{row.verdict}</span>
              </div>
              <div className="space-y-2">
                {[['Humo', row.smoke], ['Omega-6', row.omega6], ['Vitaminas', row.vitamins]].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="font-sans text-[10px] text-muted uppercase tracking-wider">{k}</span>
                    <span className="font-sans text-[10px] text-cream/70">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

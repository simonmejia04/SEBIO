import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Selección de origen',
    subtitle: 'Ganadería colombiana',
    desc: 'Seleccionamos la grasa de res de ganado bovino colombiano criado en pastizales. Sin hormonas de crecimiento, sin antibióticos de rutina. El origen importa.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <path d="M20 6C12 6 6 12 6 20s6 14 14 14 14-6 14-14S28 6 20 6z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 12v8l5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Proceso artesanal',
    subtitle: 'Temperatura controlada',
    desc: 'Fundimos la grasa a fuego lento, en pequeños lotes, sin aditivos ni solventes. Filtramos hasta obtener un sebo limpio, de color ámbar natural, con olor neutro suave.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <path d="M10 32V20a10 10 0 0120 0v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 32h28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 10v4M15 12l2 3M25 12l-2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Envasado al vacío',
    subtitle: 'Frascos de vidrio',
    desc: 'Envasamos en frascos de vidrio sellados al vacío para máxima frescura. Sin plástico en contacto con la grasa. Etiqueta clara con ingrediente único: grasa bovina.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <rect x="12" y="8" width="16" height="24" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15 8V6h10v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 18h8M16 22h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Control de calidad',
    subtitle: 'INVIMA · BPM Colombia',
    desc: 'Verificamos color, olor, textura y pureza en cada lote antes de despachar. Certificación INVIMA y Buenas Prácticas de Manufactura de Colombia.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <path d="M20 4l14 8v16l-14 8L6 28V12L20 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M13 20l5 5 9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'A tu puerta',
    subtitle: 'Todo Colombia, 2–3 días',
    desc: 'Despachamos por Servientrega e Interrapidísimo. Los frascos van protegidos con papel burbuja para que lleguen perfectos. Seguimiento en tiempo real.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <rect x="2" y="14" width="24" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M26 18h8l4 8v4h-12V18z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="9" cy="32" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="29" cy="32" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%'])

  return (
    <section id="proceso" ref={ref} className="py-24 lg:py-36 bg-dark-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-4"
            >
              De la finca a tu frasco
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-5xl lg:text-7xl font-black text-cream leading-tight"
            >
              Sin
              <br />
              <em className="text-gold">secretos.</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm text-cream/50 leading-relaxed max-w-xs"
          >
            Cinco pasos que puedes replicar en casa si quisieras. Así de simple es el proceso.
          </motion.p>
        </div>

        {/* Progress line (desktop) */}
        <div className="hidden lg:block relative mb-16">
          <div className="h-px bg-gold/15 w-full" />
          <motion.div
            style={{ width: lineWidth }}
            className="absolute top-0 left-0 h-px bg-gold origin-left"
          />
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-5 gap-px bg-gold/10">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-dark-2 p-6 lg:p-8 group hover:bg-[#1F1008] transition-colors duration-500"
            >
              {/* Step number */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif text-3xl font-black text-gold/25 group-hover:text-gold/50 transition-colors duration-300">
                  {step.num}
                </span>
                <div className="flex-1 h-px bg-gold/15 group-hover:bg-gold/30 transition-colors duration-500" />
                <div className="w-2 h-2 rounded-full border border-gold/30 group-hover:bg-gold group-hover:border-gold transition-all duration-300" />
              </div>

              {/* Icon */}
              <div className="text-gold/40 group-hover:text-gold/80 transition-colors duration-300 mb-5">
                {step.icon}
              </div>

              {/* Content */}
              <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/40 mb-2">
                {step.subtitle}
              </p>
              <h3 className="font-serif text-xl font-bold text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                {step.title}
              </h3>
              <p className="font-sans text-xs text-cream/45 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

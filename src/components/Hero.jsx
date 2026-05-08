import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section id="inicio" ref={ref} className="relative min-h-screen flex flex-col justify-end pb-16 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D1508] via-dark to-dark" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-[60vw] h-[70vh] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, #C8862A 0%, transparent 70%)' }} />
      <div className="absolute top-0 bottom-0 left-[8vw] w-px bg-gold/8" />
      <div className="absolute top-0 bottom-0 right-[8vw] w-px bg-gold/8" />

      {/* Top labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="absolute top-24 lg:top-28 left-0 right-0 px-8 lg:px-16 flex justify-between"
      >
        <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/40">Colombia · 100% Natural</span>
        <span className="font-serif font-black text-4xl lg:text-6xl text-cream/5 tracking-widest select-none">SEBIO.</span>
      </motion.div>

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-end">

          {/* Headline */}
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-sans text-xs tracking-[0.45em] uppercase text-gold mb-6"
            >
              Grasa bovina pura · Sin aceites de semilla
            </motion.p>

            <h1 className="font-serif leading-[0.88] mb-6">
              {[
                { text: 'La grasa con',    style: 'text-cream',      delay: 0.3  },
                { text: 'la que cocinaban', style: 'text-cream',     delay: 0.42 },
                { text: 'tus abuelos.',    style: 'italic text-gold', delay: 0.54 },
              ].map(({ text, style, delay }) => (
                <div key={text} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`text-[11vw] lg:text-[8.5vw] font-black ${style}`}
                  >
                    {text}
                  </motion.div>
                </div>
              ))}
            </h1>

            {/* Trust proof above fold */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="flex flex-wrap items-center gap-5 mb-8"
            >
              {[
                { num: '100%', label: 'Sin aditivos' },
                { num: '250°C', label: 'Punto de humo' },
                { num: 'A·D·E·K2', label: 'Vitaminas naturales' },
                { num: '0', label: 'Aceites de semilla' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2 border-l border-gold/20 pl-4 first:border-0 first:pl-0">
                  <span className="font-serif text-base font-black text-gold">{s.num}</span>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-cream/40">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Side */}
          <div className="lg:col-span-4 lg:pb-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.7 }}
              className="border-l border-gold/25 pl-6 mb-8"
            >
              <p className="font-sans text-sm leading-relaxed text-cream/60 mb-3">
                El sebo de res fue la grasa de cocina por siglos. La industria la reemplazó con aceites vegetales baratos. Nosotros la traemos de vuelta — pura, colombiana y llena de nutrientes reales.
              </p>
              <p className="font-sans text-[10px] tracking-widest uppercase text-gold/50">
                Envío a todo Colombia · Desde $19.900
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-col gap-3"
            >
              <a href="#productos"
                className="px-6 py-3.5 bg-gold text-dark font-sans text-xs tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors duration-300 text-center">
                Ver productos →
              </a>
              <a href="#beneficios"
                className="px-6 py-3.5 border border-cream/15 text-cream font-sans text-xs tracking-widest uppercase hover:border-gold/50 hover:text-gold transition-all duration-300 text-center">
                ¿Por qué sebo?
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="mt-4 font-sans text-[10px] tracking-widest uppercase text-cream/25"
            >
              🎁 Guía de recetas gratis con tu primer pedido
            </motion.p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-cream/20">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent" />
      </motion.div>
    </section>
  )
}

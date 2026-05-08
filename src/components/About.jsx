import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const values = [
  { label: 'Un ingrediente', desc: 'Grasa bovina colombiana. Nada más. Lee la etiqueta — no encontrarás nada raro.' },
  { label: 'Proceso artesanal', desc: 'Pequeños lotes, temperatura controlada, sin aditivos ni blanqueadores químicos.' },
  { label: 'Origen verificable', desc: 'Sabemos exactamente de qué finca viene cada lote. Colombia de principio a fin.' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="nosotros" ref={ref} className="py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image column */}
          <div className="relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-[3/4] bg-dark-2 overflow-hidden"
            >
              <motion.div
                style={{ y: imgY }}
                className="absolute inset-[-10%] w-[120%] h-[120%]"
              >
                <div className="w-full h-full"
                  style={{
                    background: 'linear-gradient(135deg, #4A2A10 0%, #1A0F06 40%, #2A1508 70%, #5A3415 100%)',
                  }}
                />
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-px bg-gold/5"
                    style={{ top: `${10 + i * 12}%`, left: 0, right: 0 }}
                  />
                ))}
              </motion.div>

              {/* Overlay text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="font-serif text-7xl font-black text-gold/10 leading-none mb-2">🫙</div>
                  <div className="font-sans text-xs tracking-[0.4em] uppercase text-gold/20 leading-relaxed">
                    Pequeños lotes<br />Colombia
                  </div>
                </div>
              </div>

              {/* Corner badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-6 left-6 bg-dark/90 border border-gold/20 px-4 py-3 backdrop-blur-sm"
              >
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/70">Certificado</p>
                <p className="font-serif text-sm text-cream font-semibold">INVIMA · BPM Colombia</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute -right-6 -bottom-6 w-32 h-32 border border-gold/20 -z-10"
            />
          </div>

          {/* Text column */}
          <div className="order-1 lg:order-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-6"
            >
              Quiénes somos
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-5xl lg:text-6xl font-black text-cream leading-tight mb-8"
            >
              La grasa de
              <br />
              <em className="text-gold">siempre.</em>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-4 mb-10"
            >
              <p className="font-sans text-sm leading-relaxed text-cream/60">
                Antes de los aceites vegetales industriales, la grasa bovina era la grasa de cocina.
                En Colombia, en España, en toda América: frituras, guisos, panes. Era lo normal.
                Después llegaron las campañas de los años 60 contra la grasa saturada —basadas
                en estudios que hoy sabemos eran financiados por la industria azucarera— y
                desapareció de la cocina.
              </p>
              <p className="font-sans text-sm leading-relaxed text-cream/60">
                Sebio nació para devolverle al sebo su lugar en la cocina colombiana. Procesamos
                grasa bovina de manera artesanal, en pequeños lotes, sin aditivos ni trucos.
                Lo que llega a tu frasco es exactamente lo que era antes: grasa real, limpia,
                con sabor y propiedades que ningún aceite industrializado puede replicar.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              {values.map((v, i) => (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                  className="flex gap-5 items-start"
                >
                  <div className="w-px h-12 bg-gold/30 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-base font-bold text-cream mb-1">{v.label}</h4>
                    <p className="font-sans text-xs text-cream/50 leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

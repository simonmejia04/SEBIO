import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: '¿El sebo de res es saludable? ¿No tiene demasiada grasa saturada?',
    a: 'La relación entre grasa saturada y enfermedades cardiovasculares fue propuesta en los años 60 y ha sido revisada extensamente. Estudios recientes (PURE Study, meta-análisis de Siri-Tarino) no encuentran asociación entre grasa saturada y enfermedad cardíaca. El sebo bovino tiene además ácido esteárico, que el hígado convierte en ácido oleico (el mismo del aceite de oliva). Lo que sí causa inflamación documentada es el exceso de omega-6 de los aceites de semilla industriales.',
  },
  {
    q: '¿Para qué puedo usar el sebo en la cocina?',
    a: 'Para casi todo: freír papas, sellar carnes, saltear verduras, hornear (reemplaza mantequilla o aceite en recetas), preparar huevos, hacer popcorn, hornados. Su punto de humo de ~250 °C lo hace ideal para altas temperaturas. También se puede usar en sartén, horno y freidora. En menor escala: como crema corporal natural (es el mismo sebo que usan las cremas "tallow balm" importadas).',
  },
  {
    q: '¿A qué sabe y a qué huele?',
    a: 'El Sebo Puro tiene sabor neutro suave, sin el olor fuerte que tiene la manteca de cerdo o la grasa sin procesar. No le da sabor dominante a los alimentos. El Sebo Artesanal Premium tiene un leve aroma lácteo natural que desaparece al cocinar. La Manteca de Res tiene sabor suave con toque de sal.',
  },
  {
    q: '¿Cómo se almacena? ¿Necesita refrigeración?',
    a: 'No necesita refrigeración. Guárdalo en un lugar fresco y oscuro, bien tapado. En climas cálidos (Cali, Barranquilla, Medellín clima medio) puede ablandarse — es normal, no pierde propiedades. La vida útil es de hasta 12 meses cerrado. Una vez abierto, 3–6 meses a temperatura ambiente. Si lo refrigeras se endurece más pero también dura más.',
  },
  {
    q: '¿Es apto para dieta keto / carnívora / paleo?',
    a: 'Sí. El sebo bovino es 100% grasa animal, cero carbohidratos, sin aditivos. Es uno de los alimentos base en dietas carnívoras y cetogénicas. Es compatible con ayuno intermitente (igual que el aceite de coco o el ghee). También es libre de lácteos, gluten, nueces y soya.',
  },
  {
    q: '¿Cuánto dura un frasco de 500 g?',
    a: 'Depende de cuánto cocinas. En una familia de 4 personas cocinando diario, rinde entre 3 y 5 semanas. Si cocinas solo o alternas con otras grasas, puede durar 2 meses. Se usa igual que cualquier aceite: una cucharada sopera (≈15 g) para un sartén promedio.',
  },
  {
    q: '¿Cómo es el envío? ¿Llega a todo Colombia?',
    a: 'Enviamos a toda Colombia vía transportadora (Servientrega / Interrapidísimo según la ciudad). El tiempo de entrega es 2–3 días hábiles en ciudades principales, 4–5 días en municipios. Envío gratis en pedidos superiores a $80.000. Los frascos van sellados al vacío y empacados para proteger el vidrio.',
  },
  {
    q: '¿Puedo devolver el producto si no me gusta?',
    a: 'Sí. Si tu primer frasco no te convence — por sabor, textura o cualquier razón — te hacemos el reembolso completo o te enviamos otro producto. Sin preguntas, sin burocracia. Solo escríbenos al WhatsApp o al correo y lo resolvemos en 24 horas.',
  },
]

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" ref={ref} className="py-24 lg:py-32 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-5 gap-16">

          <div className="lg:col-span-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-4">
              Dudas frecuentes
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-5xl lg:text-6xl font-black text-cream leading-tight mb-6">
              Resolvemos
              <br /><em className="text-gold">todo.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-sans text-sm text-cream/50 leading-relaxed mb-8">
              Sabemos que el sebo bovino genera preguntas. Las respondemos sin rodeos.
            </motion.p>

            {/* Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border border-gold/20 p-6 bg-gold/5 mb-6">
              <p className="font-serif text-base font-bold text-gold mb-2">Garantía de satisfacción</p>
              <p className="font-sans text-xs text-cream/60 leading-relaxed">
                Si no te gusta tu primer frasco por cualquier razón, te devolvemos el dinero completo. Sin preguntas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}>
              <a href="#productos"
                className="inline-block px-6 py-3 bg-gold text-dark font-sans text-xs tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors duration-300">
                Comprar ahora →
              </a>
            </motion.div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-3 divide-y divide-gold/10">
            {faqs.map((faq, i) => (
              <motion.div key={faq.q}
                initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-5 text-left group">
                  <span className={`font-serif text-base font-semibold transition-colors duration-300 leading-snug ${open === i ? 'text-gold' : 'text-cream/80 group-hover:text-cream'}`}>
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                    className={`mt-1 shrink-0 text-lg font-light transition-colors duration-300 ${open === i ? 'text-gold' : 'text-cream/30 group-hover:text-cream/60'}`}>
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="overflow-hidden">
                      <p className="font-sans text-sm text-cream/55 leading-relaxed pb-5">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

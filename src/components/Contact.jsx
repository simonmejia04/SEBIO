import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const info = [
  {
    label: 'Dirección',
    value: 'Zona Industrial Acopi, Yumbo\nValle del Cauca, Colombia',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    label: 'Teléfono',
    value: '+57 (2) 668 4000\n+57 310 000 0000',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M3 4a1 1 0 011-1h2.5l1 3-1.5 1.5a11 11 0 004.5 4.5L12 10.5l3 1V14a1 1 0 01-1 1C7 15 3 9 3 4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Correo',
    value: 'comercial@sebio.com.co\nventas@sebio.com.co',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <rect x="2" y="5" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ nombre: '', empresa: '', email: '', mensaje: '' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => { setStatus('sent'); setForm({ nombre: '', empresa: '', email: '', mensaje: '' }) }, 1200)
  }

  return (
    <section id="contacto" ref={ref} className="py-24 lg:py-36 border-t border-gold/10">
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
              Hablemos
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-5xl lg:text-7xl font-black text-cream leading-tight"
            >
              Solicita
              <br />
              tu <em className="text-gold">cotización.</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm text-cream/50 leading-relaxed self-end max-w-sm"
          >
            Cuéntanos tus necesidades y nuestro equipo comercial te responderá
            en menos de 24 horas con una propuesta personalizada.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-3"
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-gold/20 p-10 text-center"
              >
                <div className="font-serif text-5xl font-black text-gold mb-4">✓</div>
                <h3 className="font-serif text-2xl text-cream mb-2">Mensaje enviado</h3>
                <p className="font-sans text-sm text-cream/50">
                  Nos pondremos en contacto contigo pronto.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { name: 'nombre', label: 'Nombre completo', type: 'text', required: true },
                    { name: 'empresa', label: 'Empresa', type: 'text', required: false },
                  ].map(f => (
                    <div key={f.name} className="group">
                      <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/50 mb-2">
                        {f.label} {f.required && <span className="text-gold">*</span>}
                      </label>
                      <input
                        type={f.type}
                        name={f.name}
                        value={form[f.name]}
                        onChange={handleChange}
                        required={f.required}
                        className="w-full bg-transparent border-b border-cream/15 focus:border-gold pb-3 text-cream font-sans text-sm outline-none transition-colors duration-300 placeholder:text-cream/20"
                        placeholder={f.label}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/50 mb-2">
                    Correo electrónico <span className="text-gold">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-cream/15 focus:border-gold pb-3 text-cream font-sans text-sm outline-none transition-colors duration-300 placeholder:text-cream/20"
                    placeholder="correo@empresa.com"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/50 mb-2">
                    Mensaje <span className="text-gold">*</span>
                  </label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-transparent border-b border-cream/15 focus:border-gold pb-3 text-cream font-sans text-sm outline-none transition-colors duration-300 resize-none placeholder:text-cream/20"
                    placeholder="Cuéntanos sobre tus necesidades, volúmenes requeridos o productos de interés..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'sending'}
                  className="px-10 py-4 bg-gold text-dark font-sans text-xs tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors duration-300 disabled:opacity-50"
                >
                  {status === 'sending' ? 'Enviando...' : 'Enviar solicitud'}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {info.map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="text-gold/50 mt-0.5 shrink-0">{item.icon}</div>
                <div>
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/40 mb-1">
                    {item.label}
                  </p>
                  <p className="font-sans text-sm text-cream/70 whitespace-pre-line leading-relaxed">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Hours */}
            <div className="pt-6 border-t border-gold/10">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/40 mb-3">
                Horario de atención
              </p>
              <p className="font-sans text-sm text-cream/70">Lun – Vie: 7:00 am – 5:00 pm</p>
              <p className="font-sans text-sm text-cream/70">Sábado: 8:00 am – 12:00 pm</p>
            </div>

            {/* Map placeholder */}
            <div className="mt-4 border border-gold/10 h-32 flex items-center justify-center bg-dark-2">
              <p className="font-sans text-xs text-muted tracking-widest uppercase">
                Yumbo, Valle del Cauca
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

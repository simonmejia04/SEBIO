import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Productos',  href: '#productos' },
  { label: 'Nosotros',  href: '#nosotros' },
  { label: 'Proceso',   href: '#proceso' },
  { label: 'FAQ',       href: '#faq' },
]

const legal = [
  { label: 'Política de privacidad', href: '#' },
  { label: 'Términos de uso',        href: '#' },
  { label: 'Política de devoluciones', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#100900] border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#inicio" className="font-serif font-black text-3xl tracking-widest text-cream inline-block mb-6">
              SEBIO<span className="text-gold">.</span>
            </a>
            <p className="font-sans text-sm text-cream/40 leading-relaxed max-w-sm mb-2">
              La grasa de res que cocinaba tu abuela, de vuelta en tu cocina.
              100% natural, procesada artesanalmente en Colombia.
            </p>
            <p className="font-sans text-xs text-gold/40 mb-6">🎁 Guía de 15 recetas colombianas gratis con tu primer pedido.</p>
            <div className="flex gap-4">
              {['Instagram', 'TikTok', 'WhatsApp'].map(sn => (
                <a
                  key={sn}
                  href="#"
                  className="font-sans text-[10px] tracking-widest uppercase text-cream/30 hover:text-gold transition-colors duration-300"
                >
                  {sn}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/50 mb-6">
              Navegación
            </p>
            <ul className="space-y-3">
              {navLinks.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-sans text-sm text-cream/50 hover:text-gold transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & guarantees */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/50 mb-6">
              Atención al cliente
            </p>
            <ul className="space-y-3">
              {[
                'WhatsApp directo',
                'Envío en 2–3 días hábiles',
                'Devolución sin preguntas',
                'INVIMA · BPM Colombia',
              ].map(c => (
                <li key={c} className="font-sans text-sm text-cream/50 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold/40 inline-block" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gold/10 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-cream/25">
            © {new Date().getFullYear()} Sebio. Colombia. Hecho con amor por cocineros de verdad.
          </p>
          <div className="flex gap-6">
            {legal.map(l => (
              <a key={l.label} href={l.href} className="font-sans text-xs text-cream/25 hover:text-gold/60 transition-colors duration-300">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Giant watermark */}
      <div className="overflow-hidden relative h-24 lg:h-32 flex items-center justify-center select-none pointer-events-none">
        <div className="font-serif font-black text-[18vw] text-cream/[0.025] leading-none tracking-widest whitespace-nowrap">
          SEBIO
        </div>
      </div>
    </footer>
  )
}

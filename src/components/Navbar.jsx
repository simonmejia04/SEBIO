import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const links = [
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Productos',  href: '#productos' },
  { label: 'Nosotros',  href: '#nosotros' },
  { label: 'FAQ',       href: '#faq' },
]

export default function Navbar({ onCartOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count } = useCart()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      animate={{
        backgroundColor: scrolled ? 'rgba(26,15,6,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'blur(0px)',
        borderBottom: scrolled ? '1px solid rgba(200,134,42,0.15)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="font-serif font-black text-xl lg:text-2xl tracking-widest text-cream">
          SEBIO<span className="text-gold">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-sm tracking-widest uppercase text-cream/60 hover:text-gold transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right: CTA + Cart */}
        <div className="flex items-center gap-3">
          <a
            href="#productos"
            className="hidden md:block px-5 py-2.5 bg-gold text-dark text-xs tracking-widest uppercase font-sans font-semibold hover:bg-gold-light transition-all duration-300"
          >
            Comprar
          </a>

          {/* Cart button */}
          <button
            onClick={onCartOpen}
            className="relative flex items-center gap-2 px-3 py-2 hover:bg-gold/10 transition-colors duration-300 group"
            aria-label="Carrito"
          >
            <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5 text-cream/70 group-hover:text-gold transition-colors duration-300">
              <path d="M3 4h2l2.5 11h9.5l2-7H7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="18" r="1.2" fill="currentColor"/>
              <circle cx="16" cy="18" r="1.2" fill="currentColor"/>
            </svg>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-dark font-sans text-[9px] font-bold flex items-center justify-center"
              >
                {count}
              </motion.span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menú"
          >
            <motion.span className="block h-px w-6 bg-cream origin-center"
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }} />
            <motion.span className="block h-px w-6 bg-cream origin-center"
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="md:hidden overflow-hidden bg-dark border-t border-gold/10"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  className="font-sans text-sm tracking-widest uppercase text-cream/70 hover:text-gold transition-colors">
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => { setMenuOpen(false); onCartOpen() }}
                className="text-left font-sans text-sm tracking-widest uppercase text-gold flex items-center gap-2"
              >
                <span>Mi carrito</span>
                {count > 0 && <span className="w-5 h-5 rounded-full bg-gold/20 text-gold text-[10px] flex items-center justify-center">{count}</span>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

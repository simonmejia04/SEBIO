import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function StickyMobileCTA({ onCartOpen }) {
  const [show, setShow] = useState(false)
  const { count } = useCart()

  useEffect(() => {
    const handler = () => setShow(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden border-t border-gold/20 bg-[#120A02]/95 backdrop-blur-md px-4 py-3 flex gap-3"
        >
          <button
            onClick={onCartOpen}
            className="relative flex items-center justify-center gap-2 flex-1 py-3 border border-gold/30 text-gold font-sans text-xs tracking-widest uppercase"
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
              <path d="M3 4h2l2.5 11h9.5l2-7H7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="18" r="1.2" fill="currentColor"/>
              <circle cx="16" cy="18" r="1.2" fill="currentColor"/>
            </svg>
            <span>Pedido {count > 0 && `(${count})`}</span>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gold text-dark text-[9px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          <a
            href="#checkout"
            className="flex-[2] py-3 bg-gold text-dark font-sans text-xs tracking-widest uppercase font-semibold text-center"
          >
            Comprar ahora
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

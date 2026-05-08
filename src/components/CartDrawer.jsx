import { AnimatePresence, motion } from 'framer-motion'
import { useCart, formatCOP } from '../context/CartContext'

const FREE_SHIPPING = 80000

export default function CartDrawer({ open, onClose, onCheckout }) {
  const { items, totalPrice, updateQty, removeItem, count } = useCart()
  const faltaParaEnvio = Math.max(0, FREE_SHIPPING - totalPrice)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-dark/70 backdrop-blur-sm z-[200]" />

          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#120A02] border-l border-gold/15 z-[201] flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10">
              <div>
                <h2 className="font-serif text-lg font-bold text-cream">Tu carrito</h2>
                <p className="font-sans text-xs text-muted">{count} {count === 1 ? 'producto' : 'productos'}</p>
              </div>
              <button onClick={onClose} className="text-cream/40 hover:text-cream transition-colors">
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Free shipping progress */}
            {totalPrice > 0 && (
              <div className="px-6 pt-4 pb-3 border-b border-gold/8">
                {faltaParaEnvio > 0 ? (
                  <>
                    <p className="font-sans text-[10px] text-cream/50 mb-2">
                      Te faltan <span className="text-gold font-semibold">{formatCOP(faltaParaEnvio)}</span> para envío gratis
                    </p>
                    <div className="h-1 bg-cream/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (totalPrice / FREE_SHIPPING) * 100)}%` }}
                        className="h-full bg-gold rounded-full"
                      />
                    </div>
                  </>
                ) : (
                  <p className="font-sans text-[10px] text-gold flex items-center gap-1.5">
                    <span>✓</span> ¡Envío gratis incluido!
                  </p>
                )}
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-center py-20">
                  <div className="w-14 h-14 rounded-full border border-gold/20 flex items-center justify-center text-2xl">🫙</div>
                  <p className="font-sans text-sm text-muted">Tu carrito está vacío</p>
                  <button onClick={onClose} className="font-sans text-xs text-gold/60 hover:text-gold underline">
                    Ver productos
                  </button>
                </div>
              ) : (
                items.map(item => <CartItem key={item.id} item={item} updateQty={updateQty} removeItem={removeItem} />)
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gold/10 px-6 py-5 space-y-4">
                <div className="flex justify-between font-sans text-sm font-semibold text-cream">
                  <span>Total</span>
                  <span className="text-gold">{formatCOP(totalPrice)}</span>
                </div>
                {faltaParaEnvio > 0 && (
                  <p className="font-sans text-[10px] text-muted/60">+ envío (gratis desde {formatCOP(FREE_SHIPPING)})</p>
                )}
                <button onClick={onCheckout}
                  className="w-full py-3.5 bg-gold text-dark font-sans text-xs tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors duration-300">
                  Proceder al pago
                </button>
                <button onClick={onClose}
                  className="w-full py-2.5 border border-cream/10 text-cream/50 font-sans text-xs tracking-widest uppercase hover:border-gold/30 hover:text-cream/80 transition-all duration-300">
                  Seguir comprando
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function CartItem({ item, updateQty, removeItem }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="border border-gold/10 p-4 hover:border-gold/20 transition-colors duration-300">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-serif text-sm font-semibold text-cream">{item.name}</h4>
          <p className="font-sans text-[10px] text-muted mt-0.5">{item.unit}</p>
        </div>
        <button onClick={() => removeItem(item.id)} className="text-muted/50 hover:text-red-400 transition-colors ml-2">
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center border border-gold/20">
          <button onClick={() => updateQty(item.id, item.qty - 1)}
            className="w-8 h-8 text-cream/50 hover:text-gold hover:bg-gold/10 transition-all font-bold text-lg">−</button>
          <span className="w-8 text-center font-sans text-sm text-cream">{item.qty}</span>
          <button onClick={() => updateQty(item.id, item.qty + 1)}
            className="w-8 h-8 text-cream/50 hover:text-gold hover:bg-gold/10 transition-all font-bold text-lg">+</button>
        </div>
        <p className="font-serif text-base font-bold text-gold">{formatCOP(item.pricePerUnit * item.qty)}</p>
      </div>
    </motion.div>
  )
}

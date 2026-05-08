import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart, formatCOP } from '../context/CartContext'

export default function ProductModal({ product, onClose, onCartOpen }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(product.minOrderKg)
  const [presentation, setPresentation] = useState(product.presentations[0])
  const [added, setAdded] = useState(false)

  const discount = product.discounts.slice().reverse().find(d => qty >= d.from)?.pct ?? 0
  const unitFinal = product.pricePerKg * (1 - discount / 100)
  const lineTotal = unitFinal * qty

  function handleAdd() {
    addItem(product, qty, presentation)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      onClose()
      onCartOpen()
    }, 800)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-dark/80 backdrop-blur-md z-[150] flex items-end sm:items-center justify-center p-0 sm:p-6"
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          onClick={e => e.stopPropagation()}
          className="bg-[#150D03] border border-gold/15 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gold/10">
            <div>
              <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/50 mb-1">{product.category}</p>
              <h2 className="font-serif text-2xl font-bold text-cream">{product.name}</h2>
              {product.tag && (
                <span className="inline-block mt-2 font-sans text-[9px] tracking-widest uppercase bg-gold/15 text-gold px-2.5 py-1">
                  {product.tag}
                </span>
              )}
            </div>
            <button onClick={onClose} className="text-cream/30 hover:text-cream transition-colors mt-1">
              <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Description */}
            <p className="font-sans text-sm text-cream/60 leading-relaxed">{product.fullDesc}</p>

            {/* Specs */}
            <div>
              <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/40 mb-3">Especificaciones</p>
              <div className="grid grid-cols-2 gap-px bg-gold/10">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="bg-[#150D03] px-4 py-3">
                    <p className="font-sans text-[10px] text-muted mb-0.5">{k}</p>
                    <p className="font-sans text-xs text-cream font-medium">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Volume discounts */}
            <div>
              <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/40 mb-3">Descuentos por volumen</p>
              <div className="flex flex-wrap gap-2">
                {product.discounts.map(d => (
                  <div
                    key={d.from}
                    className={`px-3 py-1.5 border text-xs font-sans transition-all duration-200 ${
                      discount === d.pct && d.pct === discount
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-gold/15 text-cream/40'
                    }`}
                  >
                    {d.label}
                    {d.pct > 0 && <span className="ml-1 text-gold">−{d.pct}%</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Presentation */}
            <div>
              <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/40 mb-3">Presentación</p>
              <div className="flex flex-wrap gap-2">
                {product.presentations.map(p => (
                  <button
                    key={p}
                    onClick={() => setPresentation(p)}
                    className={`px-4 py-2 border text-xs font-sans transition-all duration-200 ${
                      presentation === p
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-cream/10 text-cream/40 hover:border-gold/30'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Price */}
            <div className="border border-gold/15 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/40 mb-1">Cantidad (kg)</p>
                  <p className="font-sans text-xs text-muted">Mínimo: {product.minOrderKg.toLocaleString('es-CO')} kg</p>
                </div>
                <div className="flex items-center border border-gold/20">
                  <button
                    onClick={() => setQty(q => Math.max(product.minOrderKg, q - 50))}
                    className="w-9 h-9 text-cream/50 hover:text-gold hover:bg-gold/10 transition-all font-bold text-lg"
                  >−</button>
                  <input
                    type="number"
                    value={qty}
                    onChange={e => setQty(Math.max(product.minOrderKg, Number(e.target.value)))}
                    className="w-24 text-center bg-transparent font-sans text-sm text-cream outline-none py-2"
                  />
                  <button
                    onClick={() => setQty(q => q + 50)}
                    className="w-9 h-9 text-cream/50 hover:text-gold hover:bg-gold/10 transition-all font-bold text-lg"
                  >+</button>
                </div>
              </div>

              <div className="flex items-end justify-between pt-2 border-t border-gold/10">
                <div>
                  <p className="font-sans text-[10px] text-muted">Precio unitario</p>
                  <div className="flex items-center gap-2">
                    {discount > 0 && (
                      <span className="font-sans text-xs text-muted line-through">{formatCOP(product.pricePerKg)}/kg</span>
                    )}
                    <span className="font-serif text-base text-gold font-bold">{formatCOP(unitFinal)}/kg</span>
                    {discount > 0 && (
                      <span className="font-sans text-[9px] bg-gold/15 text-gold px-1.5 py-0.5">−{discount}%</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-sans text-[10px] text-muted">Total estimado</p>
                  <p className="font-serif text-2xl font-black text-gradient">{formatCOP(lineTotal)}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            {!product.inStock ? (
              <div className="py-4 border border-cream/10 text-center">
                <p className="font-sans text-xs text-muted tracking-widest uppercase">Temporalmente sin stock</p>
                <p className="font-sans text-xs text-cream/40 mt-1">Contáctanos para disponibilidad futura</p>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                disabled={added}
                className="w-full py-4 bg-gold text-dark font-sans text-xs tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors duration-300 disabled:opacity-70"
              >
                {added ? '✓ Agregado al pedido' : 'Agregar al pedido'}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

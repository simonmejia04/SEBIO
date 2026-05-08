import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { products, CATEGORIES } from '../data/products'
import { useCart, formatCOP } from '../context/CartContext'

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const cardV = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Products({ onCartOpen }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [filter, setFilter] = useState('Todos')

  const filtered = filter === 'Todos' ? products : products.filter(p => p.category === filter)

  return (
    <section id="productos" className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-8 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-4">
              Nuestros productos
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-5xl lg:text-7xl font-black text-cream leading-tight">
              Elige tu
              <br /><em className="text-gold">frasco.</em>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="self-end space-y-2">
            <p className="font-sans text-sm text-cream/50 leading-relaxed">
              Un ingrediente. Sin secretos. Envío a domicilio en toda Colombia en 2–3 días hábiles.
            </p>
            <p className="font-sans text-xs text-gold/50">🎁 Guía de 15 recetas colombianas gratis con tu primer pedido.</p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 ${
                filter === cat ? 'bg-gold text-dark font-semibold' : 'border border-cream/10 text-cream/40 hover:border-gold/40 hover:text-cream/70'
              }`}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref} variants={containerV} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
          <AnimatePresence mode="popLayout">
            {filtered.map(p => <ProductCard key={p.id} product={p} onCartOpen={onCartOpen} />)}
          </AnimatePresence>
        </motion.div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 border border-gold/10 p-6 grid sm:grid-cols-3 gap-6 text-center">
          {[
            { label: 'Envío gratis', desc: 'En pedidos ≥ $80.000. Llega en 2–3 días a todo Colombia.' },
            { label: 'Garantía de sabor', desc: 'Si no te convence el primer frasco, te lo devolvemos. Sin preguntas.' },
            { label: '1 ingrediente', desc: 'Solo grasa bovina colombiana. Lee la etiqueta — no hay más nada.' },
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <p className="font-serif text-sm font-bold text-gold">{item.label}</p>
              <p className="font-sans text-xs text-cream/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProductCard({ product, onCartOpen }) {
  const { addItem, items } = useCart()
  const [flash, setFlash] = useState(false)
  const inCart = items.some(i => i.id === product.id)

  function handleAdd(e) {
    e.stopPropagation()
    addItem(product)
    setFlash(true)
    setTimeout(() => { setFlash(false); onCartOpen() }, 700)
  }

  const perGram = Math.round(product.pricePerUnit / (product.id.includes('mantequilla') ? 200 : product.id.includes('250') ? 250 : product.id.includes('500') || product.id.includes('premium') ? 500 : product.id.includes('1kg') ? 1000 : 750))

  return (
    <motion.article variants={cardV} layout
      className={`group bg-dark p-6 lg:p-8 hover:bg-[#211208] transition-all duration-500 relative overflow-hidden flex flex-col ${product.highlight ? 'ring-1 ring-gold/30' : ''}`}
    >
      {product.highlight && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
      )}

      {product.tag && (
        <span className={`absolute top-4 right-4 font-sans text-[9px] tracking-widest uppercase px-2 py-1 ${product.highlight ? 'bg-gold text-dark font-bold' : 'bg-gold/15 text-gold'}`}>
          {product.tag}
        </span>
      )}

      {!product.inStock && (
        <div className="absolute inset-0 bg-dark/60 z-10 flex items-center justify-center">
          <span className="font-sans text-[10px] tracking-widest uppercase text-cream/40 border border-cream/10 px-4 py-2">Agotado</span>
        </div>
      )}

      <span className="absolute bottom-4 right-6 font-serif text-7xl font-black text-gold/5 select-none group-hover:text-gold/10 transition-colors duration-500">{product.num}</span>

      <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/40 mb-3">{product.category}</p>
      <h3 className="font-serif text-2xl font-bold text-cream mb-3 group-hover:text-gold transition-colors duration-300 leading-tight">{product.name}</h3>
      <p className="font-sans text-xs text-cream/45 leading-relaxed mb-4 line-clamp-2">{product.shortDesc}</p>

      {/* Uses */}
      <p className="font-sans text-[10px] text-muted/70 mb-4 leading-relaxed">
        <span className="text-gold/40 mr-1">Ideal para:</span>{product.uses}
      </p>

      {/* Benefits bullets */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {product.benefits.slice(0, 3).map(b => (
          <span key={b} className="font-sans text-[9px] tracking-wide border border-gold/10 text-cream/40 px-2 py-0.5">
            {b}
          </span>
        ))}
      </div>

      {/* Price */}
      <div className="border-t border-gold/10 pt-4 mb-4 mt-auto">
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="font-serif text-2xl font-black text-gold">{formatCOP(product.pricePerUnit)}</span>
        </div>
        <p className="font-sans text-[10px] text-muted">{product.unit} · {formatCOP(perGram)}/g</p>
      </div>

      {/* CTA */}
      <button onClick={handleAdd} disabled={!product.inStock}
        className={`w-full py-3 font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 ${
          flash ? 'bg-green-700/80 text-white' :
          inCart ? 'bg-gold/20 text-gold border border-gold/30' :
          'bg-gold text-dark hover:bg-gold-light'
        }`}>
        {flash ? '✓ Agregado' : inCart ? '✓ En tu carrito' : 'Agregar al carrito'}
      </button>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
    </motion.article>
  )
}

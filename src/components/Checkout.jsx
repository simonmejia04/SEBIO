import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useCart, formatCOP } from '../context/CartContext'

export default function Checkout({ id = 'checkout' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { items, totalPrice, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '',
    departamento: '', ciudad: '', direccion: '', nota: '',
    pago: 'nequi',
  })

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const shipping = totalPrice >= 80000 ? 0 : 9900
  const grandTotal = totalPrice + shipping

  function submit(e) {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => { setStatus('done'); clearCart() }, 1400)
  }

  return (
    <section id={id} ref={ref} className="py-24 lg:py-36 bg-dark-2 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-4">
            Finalizar compra
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl lg:text-7xl font-black text-cream leading-tight">
            Casi listo
            <br /><em className="text-gold">para cocinar.</em>
          </motion.h2>
        </div>

        {status === 'done' ? <SuccessState /> : (
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-3">

              {/* Steps indicator */}
              <div className="flex items-center gap-3 mb-10">
                {['Datos', 'Envío', 'Pago'].map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center font-sans text-[10px] transition-all duration-300 ${step > i + 1 ? 'bg-gold border-gold text-dark' : step === i + 1 ? 'border-gold text-gold' : 'border-cream/15 text-cream/25'}`}>
                      {step > i + 1 ? '✓' : i + 1}
                    </div>
                    <span className={`font-sans text-[10px] tracking-widest uppercase hidden sm:block transition-colors duration-300 ${step === i + 1 ? 'text-cream' : 'text-cream/25'}`}>{s}</span>
                    {i < 2 && <div className={`w-5 h-px ${step > i + 1 ? 'bg-gold/40' : 'bg-cream/10'} transition-colors duration-500`} />}
                  </div>
                ))}
              </div>

              <form onSubmit={submit}>
                <AnimatePresence mode="wait">
                  {step === 1 && <Step1 key="s1" form={form} onChange={change} onNext={() => setStep(2)} />}
                  {step === 2 && <Step2 key="s2" form={form} onChange={change} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                  {step === 3 && <Step3 key="s3" form={form} onChange={change} status={status} onBack={() => setStep(2)} shipping={shipping} grandTotal={grandTotal} />}
                </AnimatePresence>
              </form>
            </motion.div>

            {/* Order summary */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="lg:col-span-2">

              <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/50 mb-4">Tu pedido</p>

              {items.length === 0 ? (
                <div className="border border-gold/10 p-8 text-center">
                  <p className="font-sans text-sm text-muted mb-3">Carrito vacío</p>
                  <a href="#productos" className="font-sans text-xs text-gold/60 hover:text-gold underline">Ver productos</a>
                </div>
              ) : (
                <div className="border border-gold/10 divide-y divide-gold/10 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-serif text-sm text-cream">{item.name}</p>
                        <p className="font-sans text-[10px] text-muted">x{item.qty} · {item.unit}</p>
                      </div>
                      <p className="font-sans text-sm text-gold font-semibold">{formatCOP(item.pricePerUnit * item.qty)}</p>
                    </div>
                  ))}
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between font-sans text-xs text-muted">
                      <span>Subtotal</span><span>{formatCOP(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between font-sans text-xs text-muted">
                      <span>Envío</span>
                      <span className={shipping === 0 ? 'text-gold' : ''}>{shipping === 0 ? 'Gratis ✓' : formatCOP(shipping)}</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm font-bold text-cream pt-2 border-t border-gold/10">
                      <span>Total</span><span className="text-gold">{formatCOP(grandTotal)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Trust signals */}
              <div className="space-y-3">
                {[
                  { i: '🔒', t: 'Pago 100% seguro' },
                  { i: '🎁', t: 'Guía de recetas gratis incluida' },
                  { i: '↩', t: 'Garantía de satisfacción' },
                  { i: '🚚', t: 'Gratis desde $80.000' },
                ].map(x => (
                  <div key={x.t} className="flex items-center gap-3">
                    <span className="text-sm">{x.i}</span>
                    <span className="font-sans text-xs text-cream/50">{x.t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

/* Step 1: Name + email + phone — minimal friction */
function Step1({ form, onChange, onNext }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="space-y-6">
      <p className="font-sans text-xs text-cream/40 mb-4">Solo 3 datos para empezar. El resto lo pides después.</p>
      <Field label="Nombre completo" name="nombre" value={form.nombre} onChange={onChange} required />
      <Field label="Correo electrónico" name="email" type="email" value={form.email} onChange={onChange} required />
      <Field label="WhatsApp / Teléfono" name="telefono" type="tel" value={form.telefono} onChange={onChange} required />
      <button type="button" onClick={onNext}
        className="w-full py-4 bg-gold text-dark font-sans text-xs tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors duration-300">
        Continuar →
      </button>
      <p className="font-sans text-[10px] text-muted/50 text-center">Sin spam. Solo confirmación de tu pedido.</p>
    </motion.div>
  )
}

/* Step 2: Shipping address */
function Step2({ form, onChange, onNext, onBack }) {
  const DEPTS = ['Antioquia','Atlántico','Bolívar','Boyacá','Caldas','Cundinamarca','Meta','Nariño','Risaralda','Santander','Tolima','Valle del Cauca','Otro']
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/50 mb-2">Departamento <span className="text-gold">*</span></label>
          <select name="departamento" value={form.departamento} onChange={onChange} required
            className="w-full bg-transparent border-b border-cream/15 focus:border-gold pb-3 text-cream font-sans text-sm outline-none">
            <option value="" className="bg-dark">Seleccionar...</option>
            {DEPTS.map(d => <option key={d} value={d} className="bg-dark">{d}</option>)}
          </select>
        </div>
        <Field label="Ciudad / Municipio" name="ciudad" value={form.ciudad} onChange={onChange} required />
      </div>
      <Field label="Dirección de entrega" name="direccion" value={form.direccion} onChange={onChange} required placeholder="Calle, barrio, número, apto..." />
      <div>
        <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/50 mb-2">Nota para el domiciliario</label>
        <textarea name="nota" value={form.nota} onChange={onChange} rows={2}
          className="w-full bg-transparent border-b border-cream/15 focus:border-gold pb-3 text-cream font-sans text-sm outline-none resize-none placeholder:text-cream/20"
          placeholder="Conjunto, portería, horario de entrega..." />
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex-1 py-3.5 border border-cream/10 text-cream/50 font-sans text-xs tracking-widest uppercase hover:border-gold/30 hover:text-cream/70 transition-all duration-300">Atrás</button>
        <button type="button" onClick={onNext} className="flex-[2] py-3.5 bg-gold text-dark font-sans text-xs tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors duration-300">Confirmar dirección →</button>
      </div>
    </motion.div>
  )
}

/* Step 3: Payment method */
function Step3({ form, onChange, status, onBack, shipping, grandTotal }) {
  const { items } = useCart()
  const payOpts = [
    { val: 'nequi',          label: 'Nequi',              icon: '📱' },
    { val: 'daviplata',      label: 'Daviplata',          icon: '📱' },
    { val: 'pse',            label: 'PSE / Tarjeta',      icon: '💳' },
    { val: 'transferencia',  label: 'Transferencia bancaria', icon: '🏦' },
    { val: 'contraentrega',  label: 'Contraentrega',      icon: '🚚' },
  ]
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div>
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/50 mb-4">Método de pago</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {payOpts.map(opt => (
            <label key={opt.val}
              className={`flex items-center gap-2.5 p-3 border cursor-pointer transition-all duration-200 ${form.pago === opt.val ? 'border-gold bg-gold/10 text-gold' : 'border-cream/10 text-cream/50 hover:border-gold/30'}`}>
              <input type="radio" name="pago" value={opt.val} checked={form.pago === opt.val} onChange={onChange} className="sr-only" />
              <span className="text-sm">{opt.icon}</span>
              <span className="font-sans text-[10px] tracking-wide">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border border-gold/15 p-5">
        <p className="font-sans text-[10px] tracking-widest uppercase text-gold/40 mb-3">Resumen final</p>
        <div className="space-y-1.5 mb-4">
          {items.map(i => (
            <div key={i.id} className="flex justify-between font-sans text-xs text-cream/60">
              <span>{i.name} x{i.qty}</span>
              <span>{formatCOP(i.pricePerUnit * i.qty)}</span>
            </div>
          ))}
          <div className="flex justify-between font-sans text-xs text-cream/50 pt-2 border-t border-gold/10">
            <span>Envío</span>
            <span className={shipping === 0 ? 'text-gold' : ''}>{shipping === 0 ? 'Gratis' : formatCOP(shipping)}</span>
          </div>
        </div>
        <div className="flex justify-between font-serif text-xl font-black text-gold">
          <span>Total</span><span>{formatCOP(grandTotal)}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex-1 py-3.5 border border-cream/10 text-cream/50 font-sans text-xs tracking-widest uppercase hover:border-gold/30 hover:text-cream/70 transition-all duration-300">Atrás</button>
        <button type="submit" disabled={status === 'sending'}
          className="flex-[2] py-3.5 bg-gold text-dark font-sans text-xs tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors duration-300 disabled:opacity-60">
          {status === 'sending' ? 'Procesando...' : `Pagar ${formatCOP(grandTotal)}`}
        </button>
      </div>
    </motion.div>
  )
}

function SuccessState() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center py-16">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
        className="w-20 h-20 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-8 text-3xl">
        🫙
      </motion.div>
      <h3 className="font-serif text-4xl font-black text-cream mb-4">¡Pedido confirmado!</h3>
      <p className="font-sans text-sm text-cream/50 leading-relaxed mb-3">
        Tu sebo está en camino. Recibirás un correo de confirmación y el enlace de seguimiento en las próximas horas.
      </p>
      <p className="font-sans text-xs text-gold/60 mb-8">🎁 Tu guía de 15 recetas colombianas ya está en tu correo.</p>
      <a href="#productos" className="inline-block px-8 py-3.5 border border-gold/30 text-gold font-sans text-xs tracking-widest uppercase hover:bg-gold/10 transition-colors duration-300">
        Seguir comprando
      </a>
    </motion.div>
  )
}

function Field({ label, name, value, onChange, type = 'text', required, placeholder }) {
  return (
    <div>
      <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/50 mb-2">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input type={type} name={name} value={value} onChange={onChange} required={required}
        placeholder={placeholder || label}
        className="w-full bg-transparent border-b border-cream/15 focus:border-gold pb-3 text-cream font-sans text-sm outline-none transition-colors duration-300 placeholder:text-cream/20" />
    </div>
  )
}

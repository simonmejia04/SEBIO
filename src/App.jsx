import { useState } from 'react'
import { CartProvider } from './context/CartContext'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Stats from './components/Stats'
import Benefits from './components/Benefits'
import Products from './components/Products'
import Testimonials from './components/Testimonials'
import About from './components/About'
import Process from './components/Process'
import FAQ from './components/FAQ'
import Checkout from './components/Checkout'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import StickyMobileCTA from './components/StickyMobileCTA'

function AppInner() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="bg-dark min-h-screen grain-overlay">
      <Cursor />
      <Navbar onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero />
        <TrustBar />
        <Stats />
        <Benefits />
        <Products onCartOpen={() => setCartOpen(true)} />
        <Testimonials />
        <About />
        <Process />
        <FAQ />
        <Checkout id="checkout" />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false)
          document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      <StickyMobileCTA onCartOpen={() => setCartOpen(true)} />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  )
}

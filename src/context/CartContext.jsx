import { createContext, useContext, useReducer, useMemo } from 'react'

const CartContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.item.id)
      if (existing) return state.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
      return [...state, action.item]
    }
    case 'UPDATE_QTY':
      if (action.qty <= 0) return state.filter(i => i.id !== action.id)
      return state.map(i => i.id === action.id ? { ...i, qty: action.qty } : i)
    case 'REMOVE':
      return state.filter(i => i.id !== action.id)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [])

  const totalUnits = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items])
  const totalPrice = useMemo(() => items.reduce((s, i) => s + i.pricePerUnit * i.qty, 0), [items])
  const count = items.length

  function addItem(product) {
    dispatch({ type: 'ADD', item: { id: product.id, name: product.name, pricePerUnit: product.pricePerUnit, unit: product.unit, qty: 1 } })
  }

  function updateQty(id, qty) { dispatch({ type: 'UPDATE_QTY', id, qty }) }
  function removeItem(id)     { dispatch({ type: 'REMOVE', id }) }
  function clearCart()        { dispatch({ type: 'CLEAR' }) }

  return (
    <CartContext.Provider value={{ items, count, totalUnits, totalPrice, addItem, updateQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

export function formatCOP(amount) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount)
}

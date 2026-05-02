import { createContext, useContext, useReducer, useState } from 'react'

const CartContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find(i => i.id === action.product.id)
      return {
        ...state,
        items: exists
          ? state.items.map(i => i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i)
          : [...state.items, { ...action.product, qty: 1 }],
        toast: action.product.name,
      }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'INC':
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i) }
    case 'DEC':
      return { ...state, items: state.items.map(i => i.id === action.id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0) }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'CLEAR_TOAST':
      return { ...state, toast: null }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [state, dispatch] = useReducer(reducer, { items: [], toast: null })

  const addToCart    = product => { dispatch({ type: 'ADD', product }); setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 2200) }
  const removeFromCart = id   => dispatch({ type: 'REMOVE', id })
  const increment    = id     => dispatch({ type: 'INC', id })
  const decrement    = id     => dispatch({ type: 'DEC', id })
  const clearCart    = ()     => dispatch({ type: 'CLEAR' })

  const count = state.items.reduce((s, i) => s + i.qty, 0)
  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ ...state, isOpen, setIsOpen, addToCart, removeFromCart, increment, decrement, clearCart, count, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

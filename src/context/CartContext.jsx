import { createContext, useContext, useState, useCallback } from 'react'
import Store from '../store'

const CartCtx = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(Store.getCart())
  const [wishlist,  setWishlist]  = useState(Store.getWishlist())

  const refresh = useCallback(() => {
    setCartItems(Store.getCart())
    setWishlist(Store.getWishlist())
  }, [])

  const addToCart = useCallback((id, qty = 1) => {
    Store.addToCart(id, qty)
    refresh()
  }, [refresh])

  const removeFromCart = useCallback((id) => {
    Store.removeFromCart(id)
    refresh()
  }, [refresh])

  const updateQty = useCallback((id, qty) => {
    Store.updateQty(id, qty)
    refresh()
  }, [refresh])

  const toggleWish = useCallback((id) => {
    const added = Store.toggleWishlist(id)
    refresh()
    return added
  }, [refresh])

  const count = cartItems.reduce((s, i) => s + i.qty, 0)
  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartCtx.Provider value={{ cartItems, wishlist, count, total, addToCart, removeFromCart, updateQty, toggleWish, refresh }}>
      {children}
    </CartCtx.Provider>
  )
}

export const useCart = () => useContext(CartCtx)

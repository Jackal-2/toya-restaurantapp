import React, { createContext, useState, useCallback } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = useCallback((item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id)
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += 1
        return updatedItems
      }
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id, newQuantity) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    })
  }, [])

  const calculateTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const itemPrice = Number.parseFloat(item.price.replace("$", ""))
      return total + itemPrice * item.quantity
    }, 0)
  }, [cartItems])

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, calculateTotal }}>
      {children}
    </CartContext.Provider>
  )
}


"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { Product } from "@/lib/types"

const STORAGE_KEY = "lavanda-cart"

interface CartItem {
  product: Product
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return

    try {
      setItems(JSON.parse(saved) as CartItem[])
    } catch (error) {
      console.error("Failed to parse cart", error)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    return {
      items,
      totalItems,
      totalPrice,
      addItem: (product, quantity = 1) => {
        setItems((current) => {
          const existing = current.find((item) => item.product.id === product.id)
          if (existing) {
            return current.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            )
          }

          return [...current, { product, quantity }]
        })
      },
      removeItem: (productId) => {
        setItems((current) => current.filter((item) => item.product.id !== productId))
      },
      updateQuantity: (productId, quantity) => {
        setItems((current) =>
          current
            .map((item) =>
              item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
            )
            .filter((item) => item.quantity > 0),
        )
      },
      clearCart: () => setItems([]),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.")
  }

  return context
}

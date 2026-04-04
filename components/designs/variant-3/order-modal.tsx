"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/types"

interface OrderModalProps {
  product: Product
  onClose: () => void
}

export default function OrderModal({ product, onClose }: OrderModalProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addItem(product, quantity)
    setIsAdded(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D2A3E]/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-[#F0E8F5] p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F4FC] text-[#6B4C9A] transition-colors hover:bg-[#EDE5F5]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="text-xl font-bold text-[#2D2A3E]">Товар</h3>
        </div>

        <div className="grid gap-4 bg-[#F8F4FC] p-6 sm:grid-cols-[112px,1fr] sm:items-center">
          <img src={product.image} alt={product.name} className="h-28 w-full rounded-[1.5rem] object-cover sm:h-28 sm:w-28" />
          <div>
            <h4 className="text-xl font-semibold text-[#2D2A3E]">{product.name}</h4>
            <p className="text-lg font-bold bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-transparent">
              {product.price} BYN
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#6B5A7B]">{product.description}</p>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div className="flex items-center justify-between rounded-2xl bg-[#F8F4FC] p-4">
            <div>
              <p className="text-sm text-[#6B5A7B]">Количество</p>
              <p className="mt-1 text-sm text-[#2D2A3E]">Выберите, сколько добавить в корзину</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white p-1">
              <button
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B4C9A]"
              >
                <span className="text-lg leading-none">-</span>
              </button>
              <span className="min-w-8 text-center font-medium text-[#2D2A3E]">{quantity}</span>
              <button
                onClick={() => setQuantity((current) => current + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B4C9A]"
              >
                <span className="text-lg leading-none">+</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-[#F0E8F5] p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B5A7B]">Сумма</span>
              <span className="text-xl font-semibold text-[#2D2A3E]">{product.price * quantity} BYN</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] font-semibold text-white transition-all hover:shadow-xl hover:shadow-[#9B6DD4]/25"
          >
            {isAdded ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Добавлено
              </>
            ) : (
              "Добавить в корзину"
            )}
          </button>

          <p className="text-center text-sm text-[#6B5A7B]">
            Заказ оформляется позже из корзины.
          </p>
        </div>
      </div>
    </div>
  )
}

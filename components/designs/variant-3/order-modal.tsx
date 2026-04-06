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
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#2D2A3E]/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-white shadow-2xl sm:rounded-[2rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-[#F0E8F5] bg-white p-5 sm:p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F4FC] text-[#6B4C9A] transition-colors hover:bg-[#EDE5F5]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="pr-10 text-lg font-bold text-[#2D2A3E] sm:text-xl">Товар</h3>
        </div>

        <div className="grid gap-4 bg-[#F8F4FC] p-5 sm:grid-cols-[112px,1fr] sm:items-center sm:p-6">
          <img src={product.image} alt={product.name} className="h-44 w-full rounded-[1.5rem] object-cover sm:h-28 sm:w-28" />
          <div>
            <h4 className="text-xl font-semibold leading-tight text-[#2D2A3E]">{product.name}</h4>
            <p className="text-lg font-bold bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-transparent">
              {product.price} BYN
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#6B5A7B]">{product.description}</p>
          </div>
        </div>

        <div className="space-y-4 p-5 sm:space-y-5 sm:p-6">
          <div className="rounded-2xl bg-[#F8F4FC] p-4">
            <div>
              <p className="text-sm text-[#6B5A7B]">Количество</p>
              <p className="mt-1 text-sm text-[#2D2A3E]">Выберите, сколько добавить в корзину</p>
            </div>
            <div className="mt-4 flex justify-center sm:justify-end">
              <div className="flex items-center gap-2 rounded-2xl bg-white p-1 shadow-sm">
                <button
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-[#6B4C9A]"
                >
                  <span className="text-lg leading-none">-</span>
                </button>
                <span className="min-w-10 text-center font-medium text-[#2D2A3E]">{quantity}</span>
                <button
                  onClick={() => setQuantity((current) => current + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-[#6B4C9A]"
                >
                  <span className="text-lg leading-none">+</span>
                </button>
              </div>
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
            className="flex h-13 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] font-semibold text-white transition-all hover:shadow-xl hover:shadow-[#9B6DD4]/25"
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

          <p className="pb-2 text-center text-sm text-[#6B5A7B] sm:pb-0">
            Заказ оформляется позже из корзины.
          </p>
        </div>
      </div>
    </div>
  )
}

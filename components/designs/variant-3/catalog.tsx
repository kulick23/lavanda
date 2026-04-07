"use client"

import { useState } from "react"
import OrderModal from "./order-modal"
import { useCart } from "@/components/cart-provider"
import { useSiteContent } from "@/components/site-content-provider"
import type { Product } from "@/lib/types"

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { addItem } = useCart()

  const {
    content: { categories, products },
  } = useSiteContent()
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <section id="catalog" className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="mb-4 inline-block rounded-full bg-[#F8F4FC] px-4 py-1.5 text-base font-medium text-[#6B4C9A] sm:text-sm">
            Каталог
          </span>
          <h2 className="mb-4 text-[2.2rem] font-bold text-[#2D2A3E] md:text-4xl">
            Наши товары
          </h2>
          <p className="mx-auto max-w-xl text-base text-[#6B5A7B] sm:text-[15px]">
            Выберите идеальный подарок для себя или близких
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10 -mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-base font-medium transition-all sm:px-5 sm:py-2.5 sm:text-sm ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] text-white shadow-lg shadow-[#9B6DD4]/25"
                    : "bg-[#F8F4FC] text-[#6B5A7B] hover:bg-[#EDE5F5]"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[#F0E8F5] bg-white transition-all duration-300 hover:border-[#9B6DD4]/30 hover:shadow-xl hover:shadow-[#9B6DD4]/10 sm:rounded-3xl"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-[#F8F4FC]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-medium text-white sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs ${product.badgeColor}`}>
                    {product.badge}
                  </span>
                )}
                
                {/* Quick action */}
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 opacity-100 shadow-md transition-opacity hover:bg-[#F8F4FC] sm:right-4 sm:top-4 sm:h-10 sm:w-10 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <svg className="h-4 w-4 text-[#6B4C9A] sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-3 sm:p-5">
                <div className="flex flex-1 flex-col">
                  <div className="min-w-0">
                    <span className="text-[11px] font-medium text-[#9B6DD4] sm:text-xs">
                      {categories.find(c => c.id === product.category)?.label}
                    </span>
                    <h3 className="mt-1 line-clamp-2 text-[1rem] font-semibold leading-tight text-[#2D2A3E] sm:text-lg">
                      {product.name}
                    </h3>
                    <p className="mt-2 bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-base font-bold text-transparent sm:hidden">
                      {product.price} BYN
                    </p>
                    <p className="mt-2 line-clamp-2 hidden text-sm leading-relaxed text-[#6B5A7B] sm:block">
                      {product.description}
                    </p>
                  </div>
                  <span className="mt-1 hidden shrink-0 bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-lg font-bold text-transparent sm:inline-block sm:text-xl">
                    {product.price} BYN
                  </span>
                </div>
                
                <button 
                  onClick={() => addItem(product)}
                  className="mt-4 flex h-10 w-full items-center justify-center rounded-xl bg-[#F8F4FC] text-sm font-medium text-[#6B4C9A] transition-all hover:bg-gradient-to-r hover:from-[#9B6DD4] hover:to-[#6B4C9A] hover:text-white sm:mt-5 sm:h-12 sm:rounded-2xl"
                >
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Modal */}
      {selectedProduct && (
        <OrderModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  )
}

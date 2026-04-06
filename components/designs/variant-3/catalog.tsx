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
          <span className="inline-block px-4 py-1.5 bg-[#F8F4FC] text-[#6B4C9A] text-sm font-medium rounded-full mb-4">
            Каталог
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D2A3E] mb-4">
            Наши товары
          </h2>
          <p className="text-[#6B5A7B] max-w-xl mx-auto">
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
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all sm:px-5 ${
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#F0E8F5] bg-white transition-all duration-300 hover:border-[#9B6DD4]/30 hover:shadow-xl hover:shadow-[#9B6DD4]/10"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-[#F8F4FC]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className={`absolute top-4 left-4 px-3 py-1 ${product.badgeColor} text-white text-xs font-medium rounded-full`}>
                    {product.badge}
                  </span>
                )}
                
                {/* Quick action */}
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-[#F8F4FC]"
                >
                  <svg className="w-5 h-5 text-[#6B4C9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="text-xs text-[#9B6DD4] font-medium">
                      {categories.find(c => c.id === product.category)?.label}
                    </span>
                    <h3 className="mt-1 text-base font-semibold text-[#2D2A3E] sm:text-lg">
                      {product.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#6B5A7B]">
                      {product.description}
                    </p>
                  </div>
                  <span className="shrink-0 bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-lg font-bold text-transparent sm:text-xl">
                    {product.price} BYN
                  </span>
                </div>
                
                <button 
                  onClick={() => addItem(product)}
                  className="mt-5 flex h-12 w-full items-center justify-center rounded-2xl bg-[#F8F4FC] font-medium text-[#6B4C9A] transition-all hover:bg-gradient-to-r hover:from-[#9B6DD4] hover:to-[#6B4C9A] hover:text-white"
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

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
    <section id="catalog" className="bg-[#f4f7ea] py-16 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 text-base font-medium text-[#6f7c52] sm:text-sm">
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
        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-3 text-base font-medium transition-all sm:px-5 sm:py-2.5 sm:text-sm ${
                  activeCategory === cat.id
                    ? "bg-[#dfe8bf] text-[#384127] shadow-sm"
                    : "bg-white text-[#6B5A7B] hover:bg-[#ebe3f5]"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
        </div>

        {/* Products Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#e5ead8] bg-white transition-all duration-300 hover:border-[#a9b98b] hover:shadow-xl hover:shadow-[#b8c99a]/10"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-[#F8F4FC]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium text-white ${product.badgeColor}`}>
                    {product.badge}
                  </span>
                )}
                
                {/* Quick action */}
                <button 
                  onClick={(event) => {
                    event.stopPropagation()
                    setSelectedProduct(product)
                  }}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md opacity-0 transition-opacity hover:bg-[#f4f7ea] group-hover:opacity-100"
                >
                  <svg className="h-5 w-5 text-[#6B4C9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-[#8ca06b]">
                      {categories.find(c => c.id === product.category)?.label}
                    </span>
                    <h3 className="mt-1 text-base font-semibold leading-tight text-[#2D2A3E] sm:text-lg">
                      {product.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#6B5A7B]">
                      {product.description}
                    </p>
                  </div>
                  <span className="shrink-0 bg-gradient-to-r from-[#877391] to-[#a88ed2] bg-clip-text text-lg font-bold text-transparent sm:text-xl">
                    {product.price} BYN
                  </span>
                </div>
                
                <button 
                  onClick={(event) => {
                    event.stopPropagation()
                    addItem(product)
                  }}
                  className="mt-5 flex h-12 w-full items-center justify-center rounded-2xl bg-[#ebe3f5] text-sm font-medium text-[#6B4C9A] transition-all hover:bg-gradient-to-r hover:from-[#877391] hover:to-[#a88ed2] hover:text-white"
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

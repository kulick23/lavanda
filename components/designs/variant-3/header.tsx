"use client"

import { useState, useEffect } from "react"
import { TelegramIcon, ViberIcon } from "@/components/brand-icons"
import CartSheet from "@/components/designs/variant-3/cart-sheet"
import { useSiteContent } from "@/components/site-content-provider"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "about", label: "О нас" },
    { id: "production", label: "Производство" },
    { id: "catalog", label: "Ассортимент" },
    { id: "purchase", label: "Где купить" },
    { id: "visit", label: "Посетить поле" },
    { id: "contact", label: "Контакты" },
  ]
  const {
    content: { settings },
  } = useSiteContent()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-xl shadow-sm" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-3 md:h-20">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex min-w-0 items-center gap-2"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#9B6DD4] to-[#6B4C9A]">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v18M12 3c-2 4-5 6-5 10a5 5 0 0010 0c0-4-3-6-5-10z" />
              </svg>
            </div>
            <span className="truncate bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-lg font-bold text-transparent sm:text-xl">
              {settings.brandName}
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-sm font-medium text-[#6B5A7B] hover:text-[#6B4C9A] transition-colors rounded-lg hover:bg-[#F8F4FC]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <CartSheet />
            <a 
              href={settings.telegram.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-[#F8F4FC] flex items-center justify-center text-[#6B4C9A] hover:bg-[#EDE5F5] transition-colors"
            >
              <TelegramIcon />
            </a>
            <a 
              href={settings.viber.href}
              className="w-10 h-10 rounded-xl bg-[#F8F4FC] flex items-center justify-center text-[#6B4C9A] hover:bg-[#EDE5F5] transition-colors"
            >
              <ViberIcon />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <CartSheet triggerClassName="h-10 w-10 rounded-xl px-0" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F4FC] text-[#6B4C9A]"
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#F0E8F5] bg-white py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left px-4 py-3 rounded-xl text-sm font-medium text-[#6B5A7B] hover:bg-[#F8F4FC] hover:text-[#6B4C9A]"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-4 grid gap-3 border-t border-[#F0E8F5] px-4 pt-4 sm:grid-cols-2">
              <a href={settings.telegram.href} className="flex items-center justify-center gap-2 rounded-xl bg-[#F8F4FC] px-4 py-3 text-sm text-[#6B4C9A]">
                <TelegramIcon className="h-4 w-4" />
                Telegram
              </a>
              <a href={settings.viber.href} className="flex items-center justify-center gap-2 rounded-xl bg-[#F8F4FC] px-4 py-3 text-sm text-[#6B4C9A]">
                <ViberIcon className="h-4 w-4" />
                Viber
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

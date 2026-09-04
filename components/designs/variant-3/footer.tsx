"use client"
import Link from "next/link"
import { InstagramIcon, TelegramIcon, ViberIcon } from "@/components/brand-icons"
import { useSiteContent } from "@/components/site-content-provider"

export default function Footer() {
  const {
    content: { settings },
  } = useSiteContent()
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-[#2D2A3E] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9B6DD4] to-[#6B4C9A] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v18M12 3c-2 4-5 6-5 10a5 5 0 0010 0c0-4-3-6-5-10z" />
                </svg>
              </div>
              <span className="text-lg font-bold">{settings.brandName}</span>
            </div>
            <p className="text-white/60 max-w-sm leading-relaxed">
              Натуральная лаванда с нашего поля. Букеты, масла, саше и другая продукция ручной работы.
              Выращиваем с любовью, создаём с душой.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <nav className="space-y-2">
              <button onClick={() => scrollToSection("about")} className="block text-white/60 hover:text-white transition-colors">
                О нас
              </button>
              <button onClick={() => scrollToSection("catalog")} className="block text-white/60 hover:text-white transition-colors">
                Ассортимент
              </button>
              <button onClick={() => scrollToSection("purchase")} className="block text-white/60 hover:text-white transition-colors">
                Где купить
              </button>
              <button onClick={() => scrollToSection("delivery")} className="block text-white/60 hover:text-white transition-colors">
                Доставка и оплата
              </button>
              <button onClick={() => scrollToSection("visit")} className="block text-white/60 hover:text-white transition-colors">
                Посетить поле
              </button>
              <button onClick={() => scrollToSection("contact")} className="block text-white/60 hover:text-white transition-colors">
                Контакты
              </button>
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="flex gap-3 mb-4">
              <a 
                href={settings.telegram.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#9B6DD4] transition-colors"
              >
                <TelegramIcon />
              </a>
              <a 
                href={settings.viber.href}
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#9B6DD4] transition-colors"
              >
                <ViberIcon />
              </a>
              <a 
                href={settings.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#9B6DD4] transition-colors"
              >
                <InstagramIcon />
              </a>
            </div>
            <p className="text-white/40 text-sm">
              {settings.workingHours}
            </p>
          </div>
        </div>

        {/* Реквизиты — обязательные сведения (Закон РБ о торговле, требования банка для эквайринга) */}
        <div className="mt-12 border-t border-white/10 pt-8 text-sm leading-relaxed text-white/40">
          <p className="font-medium text-white/60">Крестьянское (фермерское) хозяйство «Лавандовая ферма»</p>
          <p>
            Зарегистрировано Вилейским районным исполнительным комитетом 24.07.2026, УНП 691195419
          </p>
          <p>
            Юридический адрес: Республика Беларусь, Минская область, Вилейский район, Вязынский сельсовет,
            д. Дуровичи, ул. Полевая, дом 1а
          </p>
          <p>
            Тел.: <a href="tel:+375336586058" className="hover:text-white/70">+375 33 658 60 58</a> · E-mail:{" "}
            <a href="mailto:blakitnysad@gmail.com" className="hover:text-white/70">blakitnysad@gmail.com</a> ·{" "}
            {settings.workingHours}
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/40">
          <p>&copy; 2026 КФХ «Лавандовая ферма». Все права защищены.</p>
          <Link
            href="/admin/login"
            className="inline-flex h-7 items-center justify-center rounded-full px-3 text-[11px] uppercase tracking-[0.22em] text-white/20 transition-colors hover:text-white/45"
            aria-label="Вход в админ-панель"
          >
            admin
          </Link>
        </div>
      </div>
    </footer>
  )
}

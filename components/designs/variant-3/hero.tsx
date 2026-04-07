"use client"

import { useSiteContent } from "@/components/site-content-provider"
import { useVisitBooking } from "@/components/visit-booking-provider"

export default function Hero() {
  const {
    content: { hero },
  } = useSiteContent()
  const { openBooking } = useVisitBooking()

  return (
    <section className="relative overflow-hidden py-12 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F4FC] via-white to-[#EDE5F5]" />
      <div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-[#9B6DD4]/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-[#6B4C9A]/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[15px] text-[#6B5A7B] sm:text-sm">{hero.badge}</span>
            </div>

            <h1 className="mb-5 text-[2.85rem] font-bold leading-[0.95] text-[#2D2A3E] sm:text-5xl lg:text-6xl">
              {hero.titlePrefix}{" "}
              <span className="bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-transparent">
                {hero.titleAccent}
              </span>
              <br />
              {hero.titleSuffix}
            </h1>

            <p className="mb-7 max-w-lg text-lg leading-relaxed text-[#6B5A7B] sm:text-lg">{hero.description}</p>

            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href="#catalog"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] px-6 py-4 text-center text-base font-medium text-white transition-all hover:shadow-xl hover:shadow-[#9B6DD4]/25 sm:px-8 sm:text-[15px]"
              >
                Смотреть ассортимент
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] px-6 py-4 text-center text-base font-medium text-white transition-all hover:shadow-xl hover:shadow-[#9B6DD4]/25 sm:text-[15px]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Посетить поле
              </button>
            </div>

            <button
              type="button"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="mb-10 inline-flex items-center gap-2 text-base font-medium text-[#6B4C9A] transition-colors hover:text-[#4f3876] sm:text-sm"
            >
              О нас
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-6-6m6 6l6-6" />
                </svg>
              </span>
            </button>

            <div className="grid grid-cols-3 gap-3 rounded-[1.75rem] bg-white/70 p-4 shadow-sm backdrop-blur-sm sm:flex sm:gap-8 sm:bg-transparent sm:p-0 sm:shadow-none">
              <div className="text-center">
                <span className="block text-3xl font-bold bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-transparent">100%</span>
                <span className="text-[15px] text-[#6B5A7B] sm:text-sm">натурально</span>
              </div>
              <div className="hidden w-px bg-[#E8E0F0] sm:block" />
              <div className="text-center">
                <span className="block text-3xl font-bold bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-transparent">Своё</span>
                <span className="text-[15px] text-[#6B5A7B] sm:text-sm">производство</span>
              </div>
              <div className="hidden w-px bg-[#E8E0F0] sm:block" />
              <div className="text-center">
                <span className="block text-3xl font-bold bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-transparent">Ручная</span>
                <span className="text-[15px] text-[#6B5A7B] sm:text-sm">работа</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-square max-w-sm sm:max-w-lg">
              <div className="absolute inset-3 rotate-6 rounded-[2.3rem] bg-gradient-to-br from-[#9B6DD4]/20 to-[#6B4C9A]/10 sm:inset-4 sm:rounded-[3rem]" />
              <div className="relative aspect-square overflow-hidden rounded-[2.3rem] shadow-2xl shadow-[#9B6DD4]/20 sm:rounded-[3rem]">
                <img src={hero.image} alt="Главное фото" className="h-full w-full object-cover" />
              </div>

              <div className="absolute left-2 top-4 rounded-2xl bg-white/95 p-3 shadow-lg sm:-left-4 sm:top-1/4 sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-[#2D2A3E]">{hero.floatingCardLeftTitle}</span>
                    <span className="text-xs text-[#6B5A7B]">{hero.floatingCardLeftText}</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-2 rounded-2xl bg-white/95 p-3 shadow-lg sm:-right-4 sm:bottom-1/4 sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F4FC]">
                    <svg className="h-5 w-5 text-[#6B4C9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-[#2D2A3E]">{hero.floatingCardRightTitle}</span>
                    <span className="text-xs text-[#6B5A7B]">{hero.floatingCardRightText}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useSiteContent } from "@/components/site-content-provider"
import { useVisitBooking } from "@/components/visit-booking-provider"

export default function Hero() {
  const {
    content: { hero },
  } = useSiteContent()
  const { openBooking } = useVisitBooking()

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F4FC] via-white to-[#EDE5F5]" />
      <div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-[#9B6DD4]/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-[#6B4C9A]/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-[#6B5A7B]">{hero.badge}</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-[#2D2A3E] md:text-5xl lg:text-6xl">
              {hero.titlePrefix}{" "}
              <span className="bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-transparent">
                {hero.titleAccent}
              </span>
              <br />
              {hero.titleSuffix}
            </h1>

            <p className="mb-8 max-w-lg text-lg leading-relaxed text-[#6B5A7B]">{hero.description}</p>

            <div className="mb-12 flex flex-wrap gap-4">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] px-8 py-4 font-medium text-white transition-all hover:shadow-xl hover:shadow-[#9B6DD4]/25"
              >
                Смотреть ассортимент
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex items-center gap-2 rounded-2xl border border-[#E8E0F0] bg-white px-6 py-4 font-medium text-[#6B4C9A] transition-all hover:border-[#9B6DD4]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Посетить поле
              </button>
            </div>

            <div className="flex gap-8">
              <div className="text-center">
                <span className="block text-3xl font-bold bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-transparent">100%</span>
                <span className="text-sm text-[#6B5A7B]">натурально</span>
              </div>
              <div className="w-px bg-[#E8E0F0]" />
              <div className="text-center">
                <span className="block text-3xl font-bold bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-transparent">Своё</span>
                <span className="text-sm text-[#6B5A7B]">производство</span>
              </div>
              <div className="w-px bg-[#E8E0F0]" />
              <div className="text-center">
                <span className="block text-3xl font-bold bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-transparent">Ручная</span>
                <span className="text-sm text-[#6B5A7B]">работа</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-square max-w-lg">
              <div className="absolute inset-4 rotate-6 rounded-[3rem] bg-gradient-to-br from-[#9B6DD4]/20 to-[#6B4C9A]/10" />
              <div className="relative aspect-square overflow-hidden rounded-[3rem] shadow-2xl shadow-[#9B6DD4]/20">
                <img src={hero.image} alt="Главное фото" className="h-full w-full object-cover" />
              </div>

              <div className="absolute -left-4 top-1/4 rounded-2xl bg-white p-4 shadow-lg">
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

              <div className="absolute -right-4 bottom-1/4 rounded-2xl bg-white p-4 shadow-lg">
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

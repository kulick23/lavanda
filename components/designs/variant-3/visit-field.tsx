"use client"

import { useSiteContent } from "@/components/site-content-provider"
import { useVisitBooking } from "@/components/visit-booking-provider"

export default function VisitField() {
  const {
    content: { visit },
  } = useSiteContent()
  const { openBooking } = useVisitBooking()

  return (
    <section id="visit" className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#F8F4FC] text-[#6B4C9A] text-sm font-medium rounded-full mb-4">
            {visit.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D2A3E] mb-4">{visit.title}</h2>
          <p className="text-lg text-[#6B5A7B] max-w-2xl mx-auto">{visit.description}</p>
        </div>

        <div className="mb-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden">
                <img src={visit.gallery[0]?.src} alt={visit.gallery[0]?.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
            <div className="space-y-3 pt-4 sm:space-y-4 sm:pt-8">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img src={visit.gallery[1]?.src} alt={visit.gallery[1]?.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <img src={visit.gallery[2]?.src} alt={visit.gallery[2]?.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-2xl font-bold text-[#2D2A3E]">{visit.heading}</h3>
            <div className="mb-8 space-y-4 leading-relaxed text-[#6B5A7B]">
              {visit.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mb-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
              {visit.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 rounded-2xl bg-[#F8F4FC] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                    <svg className="h-5 w-5 text-[#6B4C9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-[#2D2A3E]">{feature.title}</span>
                    <span className="text-xs text-[#6B5A7B]">{feature.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] px-6 py-3 font-medium text-white transition-all hover:shadow-xl hover:shadow-[#9B6DD4]/25"
              >
                {visit.ctaLabel}
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl">
          <div className="aspect-[5/6] sm:aspect-[21/9] md:aspect-[21/7]">
            <img src={visit.gallery[0]?.src} alt="Лавандовое поле" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#6B4C9A]/92 via-[#6B4C9A]/70 to-transparent sm:bg-gradient-to-r sm:from-[#6B4C9A]/90 sm:via-[#6B4C9A]/70 sm:to-transparent" />
            <div className="absolute inset-0 flex items-end sm:items-center">
              <div className="container mx-auto px-5 pb-6 sm:px-8 sm:pb-0">
                <div className="max-w-lg text-white">
                  <h3 className="mb-3 text-2xl font-bold md:text-3xl">{visit.bannerTitle}</h3>
                  <p className="mb-6 leading-relaxed text-white/80">{visit.bannerText}</p>
                  <button
                    type="button"
                    onClick={openBooking}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-[#6B4C9A] transition-all hover:bg-[#F8F4FC]"
                  >
                    Записаться
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

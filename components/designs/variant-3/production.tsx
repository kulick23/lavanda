"use client"

import { useSiteContent } from "@/components/site-content-provider"

export default function Production() {
  const {
    content: { production },
  } = useSiteContent()

  return (
    <section id="production" className="py-20 bg-[#F8F4FC]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-white text-[#6B4C9A] text-sm font-medium rounded-full mb-4">
            {production.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D2A3E] mb-4">{production.title}</h2>
          <p className="text-lg text-[#6B5A7B] max-w-2xl mx-auto">{production.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {production.steps.map((step, index) => (
            <div key={index} className="group relative rounded-3xl bg-white p-6 transition-all duration-300 hover:shadow-xl">
              <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#9B6DD4] to-[#6B4C9A] text-sm font-bold text-white shadow-lg">
                {step.number}
              </div>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8F4FC] text-[#6B4C9A] transition-all group-hover:bg-gradient-to-br group-hover:from-[#9B6DD4] group-hover:to-[#6B4C9A] group-hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#2D2A3E]">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[#6B5A7B]">{step.description}</p>
              {index < production.steps.length - 1 ? (
                <div className="absolute top-1/2 -right-3 hidden h-0.5 w-6 bg-gradient-to-r from-[#9B6DD4]/50 to-transparent lg:block" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="relative mt-16 overflow-hidden rounded-3xl">
          <div className="relative aspect-[21/9]">
            <img src={production.bannerImage} alt="Производство" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#6B4C9A]/80 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-8">
                <div className="max-w-lg text-white">
                  <h3 className="mb-4 text-2xl font-bold md:text-3xl">{production.bannerTitle}</h3>
                  <p className="leading-relaxed text-white/80">{production.bannerText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

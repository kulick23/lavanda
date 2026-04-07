"use client"

import { useSiteContent } from "@/components/site-content-provider"

export default function About() {
  const {
    content: { about },
  } = useSiteContent()

  return (
    <section id="about" className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center sm:mb-16">
          <span className="mb-4 inline-block rounded-full bg-[#F8F4FC] px-4 py-1.5 text-[15px] font-medium text-[#6B4C9A] sm:text-sm">
            {about.eyebrow}
          </span>
          <h2 className="mb-4 text-[2.45rem] font-bold text-[#2D2A3E] md:text-4xl">
            {about.title}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-[#6B5A7B] sm:text-lg">{about.description}</p>
        </div>

        <div className="mb-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img src={about.gallery[0]?.src} alt={about.gallery[0]?.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img src={about.gallery[1]?.src} alt={about.gallery[1]?.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
            <div className="pt-4 sm:pt-8">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden">
                <img src={about.gallery[2]?.src} alt={about.gallery[2]?.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-[2rem] font-bold text-[#2D2A3E] sm:text-2xl">{about.heading}</h3>
            <div className="space-y-4 text-lg leading-relaxed text-[#6B5A7B] sm:text-base">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
              {about.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-[#F8F4FC] rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#6B4C9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[15px] font-medium text-[#2D2A3E] sm:text-sm">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

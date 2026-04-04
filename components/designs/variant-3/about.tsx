"use client"

import { useSiteContent } from "@/components/site-content-provider"

export default function About() {
  const {
    content: { about },
  } = useSiteContent()

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#F8F4FC] text-[#6B4C9A] text-sm font-medium rounded-full mb-4">
            {about.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D2A3E] mb-4">
            {about.title}
          </h2>
          <p className="text-lg text-[#6B5A7B] max-w-2xl mx-auto">{about.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img src={about.gallery[0]?.src} alt={about.gallery[0]?.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img src={about.gallery[1]?.src} alt={about.gallery[1]?.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
            <div className="pt-8">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden">
                <img src={about.gallery[2]?.src} alt={about.gallery[2]?.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#2D2A3E] mb-6">{about.heading}</h3>
            <div className="space-y-4 text-[#6B5A7B] leading-relaxed">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {about.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-[#F8F4FC] rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#6B4C9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[#2D2A3E]">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

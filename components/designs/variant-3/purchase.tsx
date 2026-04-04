"use client"
import { useSiteContent } from "@/components/site-content-provider"

export default function Purchase() {
  const {
    content: { purchaseOptions },
  } = useSiteContent()
  return (
    <section id="purchase" className="py-20 bg-[#F8F4FC]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-white text-[#6B4C9A] text-sm font-medium rounded-full mb-4">
            Как приобрести
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D2A3E] mb-4">
            Где{" "}
            <span className="bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-transparent">
              купить
            </span>
          </h2>
          <p className="text-lg text-[#6B5A7B] max-w-2xl mx-auto">
            Выберите удобный способ получения нашей продукции
          </p>
        </div>

        {/* Purchase Options */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {purchaseOptions.map((option, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-3xl p-6 transition-all duration-300 hover:shadow-xl ${
                option.highlight ? "ring-2 ring-[#9B6DD4] shadow-lg" : ""
              }`}
            >
              {option.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] text-white text-xs font-medium rounded-full">
                  Рекомендуем
                </span>
              )}
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                option.highlight 
                  ? "bg-gradient-to-br from-[#9B6DD4] to-[#6B4C9A] text-white" 
                  : "bg-[#F8F4FC] text-[#6B4C9A]"
              }`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {index === 0 ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  ) : index === 1 ? (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </>
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  )}
                </svg>
              </div>

              <h3 className="text-lg font-bold text-[#2D2A3E] mb-2">{option.title}</h3>
              <p className="text-sm text-[#6B5A7B] mb-4 leading-relaxed">{option.description}</p>
              
              <a 
                href={option.link}
                target={option.link.startsWith("http") ? "_blank" : undefined}
                rel={option.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  option.highlight 
                    ? "bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] text-white hover:shadow-lg" 
                    : "bg-[#F8F4FC] text-[#6B4C9A] hover:bg-[#EDE5F5]"
                }`}
              >
                {option.action}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white rounded-3xl p-6 md:p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#2D2A3E] mb-1">Наличный расчёт</h4>
              <p className="text-sm text-[#6B5A7B]">При самовывозе</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#2D2A3E] mb-1">Перевод на карту</h4>
              <p className="text-sm text-[#6B5A7B]">Предоплата при доставке</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-3 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#2D2A3E] mb-1">Быстрая обработка</h4>
              <p className="text-sm text-[#6B5A7B]">Ответим в течение дня</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

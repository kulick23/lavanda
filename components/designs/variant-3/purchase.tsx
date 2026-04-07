"use client"
import { useSiteContent } from "@/components/site-content-provider"

export default function Purchase() {
  const {
    content: { purchaseOptions },
  } = useSiteContent()
  return (
    <section id="purchase" className="bg-[#F8F4FC] py-16 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 text-[15px] font-medium text-[#6B4C9A] sm:text-sm">
            Как приобрести
          </span>
          <h2 className="mb-4 text-[2.45rem] font-bold text-[#2D2A3E] md:text-4xl">
            Где{" "}
            <span className="bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] bg-clip-text text-transparent">
              купить
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#6B5A7B] sm:text-lg">
            Выберите удобный способ получения нашей продукции
          </p>
        </div>

        {/* Purchase Options */}
        <div className="mx-auto grid max-w-4xl gap-4 sm:gap-6 md:grid-cols-3">
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

              <h3 className="mb-2 text-xl font-bold text-[#2D2A3E] sm:text-lg">{option.title}</h3>
              <p className="mb-4 text-[15px] leading-relaxed text-[#6B5A7B] sm:text-sm">{option.description}</p>
              
              <a 
                href={option.link}
                target={option.link.startsWith("http") ? "_blank" : undefined}
                rel={option.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-base font-medium transition-all sm:text-sm ${
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
        <div className="mx-auto mt-10 max-w-4xl rounded-3xl bg-white p-6 md:p-8">
          <div className="grid gap-6 text-center sm:grid-cols-3">
            <div>
              <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="mb-1 text-[17px] font-semibold text-[#2D2A3E] sm:text-base">Наличный расчёт</h4>
              <p className="text-[15px] text-[#6B5A7B] sm:text-sm">При самовывозе</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h4 className="mb-1 text-[17px] font-semibold text-[#2D2A3E] sm:text-base">Перевод на карту</h4>
              <p className="text-[15px] text-[#6B5A7B] sm:text-sm">Предоплата при доставке</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-3 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="mb-1 text-[17px] font-semibold text-[#2D2A3E] sm:text-base">Быстрая обработка</h4>
              <p className="text-[15px] text-[#6B5A7B] sm:text-sm">Ответим в течение дня</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

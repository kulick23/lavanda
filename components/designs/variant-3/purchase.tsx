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

        {/* Payment Info */}
        <div className="mx-auto mt-10 max-w-4xl rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr,1.1fr] lg:items-start">
            <div>
              <span className="inline-flex rounded-full bg-[#f4f7ea] px-3 py-1 text-sm font-medium text-[#6f7c52]">
                Оплата
              </span>
              <h3 className="mt-4 text-2xl font-bold text-[#2D2A3E]">
                Банковской картой онлайн
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-[#6B5A7B]">
                После оформления заявки менеджер подтверждает наличие, состав заказа, доставку и отправляет ссылку
                для оплаты через защищённую платёжную страницу bePaid.
              </p>
              <div className="mt-5 rounded-2xl border border-[#e8eadf] bg-[#fbfcf6] p-4">
                <img
                  src="/payment-systems.png"
                  alt="Visa, Visa Secure, Mastercard, Mastercard ID Check, Белкарт, Белкарт ИнтернетПароль, bePaid"
                  className="h-auto w-full object-contain"
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#8a7a96]">
                Карточные данные вводятся только на стороне bePaid и не сохраняются на сайте.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#6B5A7B]">
                Платежи по банковским картам осуществляются через систему электронных платежей{" "}
                <a
                  href="https://bepaid.by/kak-oplatit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#6B4C9A] underline decoration-[#9B6DD4]/40 underline-offset-4 hover:text-[#9B6DD4]"
                >
                  bePaid
                </a>
                . Платежная страница bePaid отвечает всем требованиям безопасности передачи данных (PCI DSS Level
                1). Все конфиденциальные данные хранятся в зашифрованном виде и максимально устойчивы к взлому.
                Доступ к авторизационным страницам осуществляется с использованием протокола, обеспечивающего
                безопасную передачу данных в Интернете (SSL/TLS).
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="text-lg font-semibold text-[#2D2A3E]">Порядок оформления заказа</h4>
                <ol className="mt-3 space-y-2 text-[15px] leading-relaxed text-[#6B5A7B]">
                  <li>1. Добавьте товары в корзину и проверьте количество.</li>
                  <li>2. Укажите имя, телефон, удобный мессенджер и комментарий.</li>
                  <li>3. Мы свяжемся с вами, подтвердим заказ, стоимость и способ получения.</li>
                  <li>4. После подтверждения отправим ссылку для онлайн-оплаты картой.</li>
                </ol>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#F8F4FC] p-4">
                  <h4 className="font-semibold text-[#2D2A3E]">Доставка</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#6B5A7B]">
                    По Беларуси Белпочтой или курьерской службой. Срок доставки - от 5 дней.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f4f7ea] p-4">
                  <h4 className="font-semibold text-[#2D2A3E]">Возврат</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#6B5A7B]">
                    Если товар был оплачен банковской картой через сайт, возврат осуществляется на карту, с которой
                    была произведена оплата. Срок поступления денежных средств на карту — от 1 до 30 дней с момента
                    осуществления возврата Продавцом.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#F0E8F5] p-4 text-[15px] leading-relaxed text-[#6B5A7B]">
                Мы принимаем платежи по картам Visa, Visa Electron, MasterCard, Maestro и Белкарт.
                Платежи проходят через систему электронных платежей bePaid.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

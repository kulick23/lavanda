"use client"

const deliveryOptions = [
  {
    title: "Почтой по Беларуси",
    text: "Отправка 2 раза в неделю — по понедельникам и четвергам. Почта Беларуси — 10 руб., Европочта — 10 руб.",
  },
  {
    title: "Доставка по городам",
    text: "Минск, Молодечно и Вилейка — 2 раза в неделю, по понедельникам и четвергам. Стоимость доставки — 10 руб.",
  },
  {
    title: "Вендинговые аппараты",
    text: "Продукцию можно приобрести в наших вендинговых аппаратах. Адреса аппаратов уточняйте у продавца.",
  },
]

export default function Delivery() {
  return (
    <section id="delivery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase tracking-[0.22em] text-[#9B6DD4]">Условия</span>
          <h2 className="mt-3 font-serif text-4xl text-[#2D2A3E]">Доставка и оплата</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {deliveryOptions.map((option) => (
            <div key={option.title} className="rounded-3xl border border-[#EDE7F6] bg-[#FAFAFA] p-6">
              <h3 className="mb-3 font-semibold text-lg text-[#2D2A3E]">{option.title}</h3>
              <p className="leading-relaxed text-[#5A5568]">{option.text}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-5xl space-y-6 text-[#5A5568]">
          <div className="rounded-3xl border border-[#EDE7F6] bg-[#FAFAFA] p-6">
            <h3 className="mb-3 font-semibold text-lg text-[#2D2A3E]">Оплата</h3>
            <div className="space-y-4">
              <p className="leading-relaxed">
                Оплата осуществляется банковской картой онлайн через систему электронных платежей bePaid. После
                подтверждения заказа продавец отправляет покупателю ссылку на защищённую платёжную страницу.
              </p>
              <p className="leading-relaxed">
                Также возможна оплата наличными при получении заказа. Покупателю выдаётся кассовый чек. Цены на
                сайте указаны в белорусских рублях.
              </p>
              <div>
              <a
                href="/cash-receipt-sample.png"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] px-5 py-3 text-sm font-medium text-white transition-shadow hover:shadow-lg sm:w-auto"
              >
                Посмотреть образец кассового чека
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5h5m0 0v5m0-5L10 14" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13v5a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1h5" />
                </svg>
              </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#EDE7F6] bg-[#FAFAFA] p-6">
            <h3 className="mb-3 font-semibold text-lg text-[#2D2A3E]">Возврат и обмен</h3>
            <p className="leading-relaxed">
              Товар надлежащего качества можно вернуть или обменять в течение 14 дней с момента покупки, если он
              не был в употреблении и сохранены его товарный вид и потребительские свойства. Исключение —
              товары из перечня, утверждённого постановлением Совета Министров Республики Беларусь от 14.06.2002
              № 778 (в том числе растения и парфюмерно-косметические товары). Товар ненадлежащего качества
              подлежит возврату или обмену в соответствии с Законом Республики Беларусь «О защите прав
              потребителей». Для оформления возврата свяжитесь с нами по телефону или в мессенджерах.
            </p>
            <p className="mt-4 leading-relaxed">
              Если товар был оплачен банковской картой через сайт, возврат осуществляется на карту, с которой была
              произведена оплата. Срок поступления денежных средств на карту — от 1 до 30 дней с момента
              осуществления возврата Продавцом.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

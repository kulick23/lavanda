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
            <p className="leading-relaxed">
              Способ оплаты согласовывается при подтверждении заказа: наличными или банковской картой при
              получении, либо переводом по реквизитам. Цены на сайте указаны в белорусских рублях.
            </p>
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
          </div>
        </div>
      </div>
    </section>
  )
}

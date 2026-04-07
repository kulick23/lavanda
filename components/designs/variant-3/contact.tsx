"use client"

import { useState } from "react"
import { InstagramIcon, TelegramIcon, ViberIcon } from "@/components/brand-icons"
import { useSiteContent } from "@/components/site-content-provider"
import type { Messenger } from "@/lib/types"

export default function Contact() {
  const {
    content: { settings },
  } = useSiteContent()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    messenger: "telegram" as Messenger,
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "contact",
          customerName: formData.name,
          phone: formData.phone,
          messenger: formData.messenger,
          comment: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit contact form.")
      }

      setIsSubmitted(true)
      setFormData({
        name: "",
        phone: "",
        messenger: "telegram",
        message: "",
      })
    } catch (error) {
      console.error(error)
      setSubmitError("Не удалось отправить сообщение. Попробуйте еще раз.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-[#F8F4FC] px-4 py-1.5 text-[15px] font-medium text-[#6B4C9A] sm:text-sm">
              Контакты
            </span>
            <h2 className="mb-4 text-[2.45rem] font-bold text-[#2D2A3E] md:text-4xl">
              Свяжитесь с нами
            </h2>
            <p className="text-lg text-[#6B5A7B] sm:text-base">
              Отправьте заявку с сайта или сразу напишите в удобный мессенджер.
            </p>
          </div>

          <div className="grid items-start gap-6 md:grid-cols-5 md:gap-8">
            <div className="space-y-4 md:col-span-2">
              <a
                href={settings.telegram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-24 items-center gap-4 rounded-[1.5rem] bg-[#F8F4FC] p-4 hover:shadow-lg transition-all sm:rounded-[1.75rem] sm:p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-all group-hover:bg-gradient-to-r group-hover:from-[#9B6DD4] group-hover:to-[#6B4C9A]">
                  <TelegramIcon className="h-6 w-6 text-[#6B4C9A] group-hover:text-white" />
                </div>
                <div className="min-w-0">
                  <span className="block text-lg font-semibold text-[#2D2A3E] sm:text-base">{settings.telegram.label}</span>
                  <span className="block truncate text-[15px] text-[#6B4C9A] sm:text-sm">{settings.telegram.value}</span>
                </div>
              </a>

              <a
                href={settings.viber.href}
                className="group flex min-h-24 items-center gap-4 rounded-[1.5rem] bg-[#F8F4FC] p-4 hover:shadow-lg transition-all sm:rounded-[1.75rem] sm:p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-all group-hover:bg-gradient-to-r group-hover:from-[#9B6DD4] group-hover:to-[#6B4C9A]">
                  <ViberIcon className="h-6 w-6 text-[#6B4C9A] group-hover:text-white" />
                </div>
                <div className="min-w-0">
                  <span className="block text-lg font-semibold text-[#2D2A3E] sm:text-base">{settings.viber.label}</span>
                  <span className="block truncate text-[15px] text-[#6B4C9A] sm:text-sm">{settings.viber.value}</span>
                </div>
              </a>

              <a
                href={settings.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-24 items-center gap-4 rounded-[1.5rem] bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] p-4 text-white hover:shadow-xl transition-all sm:rounded-[1.75rem] sm:p-5"
              >
                <InstagramIcon className="h-7 w-7 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-lg font-semibold sm:text-base">{settings.instagram.label}</span>
                  <span className="block truncate text-[15px] text-white/80 sm:text-sm">{settings.instagram.value}</span>
                </div>
              </a>

              <div className="rounded-[1.5rem] border border-[#E8E0F0] p-5 sm:rounded-[1.75rem]">
                <p className="text-[15px] text-[#6B5A7B] sm:text-sm">Телефон</p>
                <p className="mt-1 font-semibold text-[#2D2A3E]">{settings.phone}</p>
                <p className="mt-4 text-[15px] text-[#6B5A7B] sm:text-sm">Часы работы</p>
                <p className="mt-1 font-semibold text-[#2D2A3E]">{settings.workingHours}</p>
                <p className="mt-4 text-[15px] text-[#6B5A7B] sm:text-sm">Локация</p>
                <p className="mt-1 font-semibold text-[#2D2A3E]">{settings.location}</p>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-[#F8F4FC] p-5 sm:p-6 md:col-span-3 md:rounded-[2rem] md:p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[15px] font-medium text-[#2D2A3E] sm:text-sm">Ваше имя</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="lav-input"
                        placeholder="Введите имя"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-[15px] font-medium text-[#2D2A3E] sm:text-sm">Телефон</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="lav-input"
                        placeholder="+375 (XX) XXX-XX-XX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-[15px] font-medium text-[#2D2A3E] sm:text-sm">Удобный мессенджер</label>
                    <div className="grid gap-3">
                      {(["telegram", "viber"] as Messenger[]).map((messenger) => (
                        <label
                          key={messenger}
                          className={`lav-choice cursor-pointer ${
                            formData.messenger === messenger
                              ? "border-[#9B6DD4] bg-white text-[#6B4C9A]"
                              : "border-white bg-white text-[#6B5A7B]"
                          }`}
                        >
                          <input
                            type="radio"
                            className="sr-only"
                            name="messenger"
                            value={messenger}
                            checked={formData.messenger === messenger}
                            onChange={() => setFormData({ ...formData, messenger })}
                          />
                          <span className="inline-flex items-center gap-2">
                            {messenger === "telegram" ? <TelegramIcon className="h-4 w-4" /> : <ViberIcon className="h-4 w-4" />}
                            {messenger === "telegram" ? "Telegram" : "Viber"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[15px] font-medium text-[#2D2A3E] sm:text-sm">Сообщение</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="lav-textarea min-h-36"
                      placeholder="Напишите, что вас интересует"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] px-6 text-base font-semibold text-white transition-all hover:shadow-xl hover:shadow-[#9B6DD4]/25 sm:text-[15px]"
                  >
                    {isSubmitting ? "Отправляем..." : "Отправить"}
                  </button>

                  {submitError ? <p className="text-sm text-red-500">{submitError}</p> : null}
                </form>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A]">
                    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#2D2A3E]">Сообщение отправлено</h3>
                  <p className="mt-2 text-[#6B5A7B]">Мы свяжемся с вами в ближайшее время.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

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
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#F8F4FC] text-[#6B4C9A] text-sm font-medium rounded-full mb-4">
              Контакты
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2A3E] mb-4">
              Свяжитесь с нами
            </h2>
            <p className="text-[#6B5A7B]">
              Отправьте заявку с сайта или сразу напишите в удобный мессенджер.
            </p>
          </div>

          <div className="grid items-start gap-8 md:grid-cols-5">
            <div className="space-y-4 md:col-span-2">
              <a
                href={settings.telegram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-24 items-center gap-4 rounded-[1.75rem] bg-[#F8F4FC] p-5 hover:shadow-lg transition-all"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-all group-hover:bg-gradient-to-r group-hover:from-[#9B6DD4] group-hover:to-[#6B4C9A]">
                  <TelegramIcon className="h-6 w-6 text-[#6B4C9A] group-hover:text-white" />
                </div>
                <div className="min-w-0">
                  <span className="block text-base font-semibold text-[#2D2A3E]">{settings.telegram.label}</span>
                  <span className="block truncate text-sm text-[#6B4C9A]">{settings.telegram.value}</span>
                </div>
              </a>

              <a
                href={settings.viber.href}
                className="group flex min-h-24 items-center gap-4 rounded-[1.75rem] bg-[#F8F4FC] p-5 hover:shadow-lg transition-all"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-all group-hover:bg-gradient-to-r group-hover:from-[#9B6DD4] group-hover:to-[#6B4C9A]">
                  <ViberIcon className="h-6 w-6 text-[#6B4C9A] group-hover:text-white" />
                </div>
                <div className="min-w-0">
                  <span className="block text-base font-semibold text-[#2D2A3E]">{settings.viber.label}</span>
                  <span className="block truncate text-sm text-[#6B4C9A]">{settings.viber.value}</span>
                </div>
              </a>

              <a
                href={settings.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-24 items-center gap-4 rounded-[1.75rem] bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] p-5 text-white hover:shadow-xl transition-all"
              >
                <InstagramIcon className="h-7 w-7 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-base font-semibold">{settings.instagram.label}</span>
                  <span className="block truncate text-sm text-white/80">{settings.instagram.value}</span>
                </div>
              </a>

              <div className="rounded-[1.75rem] border border-[#E8E0F0] p-5">
                <p className="text-sm text-[#6B5A7B]">Телефон</p>
                <p className="mt-1 font-semibold text-[#2D2A3E]">{settings.phone}</p>
                <p className="mt-4 text-sm text-[#6B5A7B]">Часы работы</p>
                <p className="mt-1 font-semibold text-[#2D2A3E]">{settings.workingHours}</p>
                <p className="mt-4 text-sm text-[#6B5A7B]">Локация</p>
                <p className="mt-1 font-semibold text-[#2D2A3E]">{settings.location}</p>
              </div>
            </div>

            <div className="md:col-span-3 rounded-[2rem] bg-[#F8F4FC] p-6 md:p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-[#2D2A3E] mb-2">Ваше имя</label>
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
                      <label className="block text-sm font-medium text-[#2D2A3E] mb-2">Телефон</label>
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
                    <label className="block text-sm font-medium text-[#2D2A3E] mb-3">Удобный мессенджер</label>
                    <div className="grid gap-3 sm:grid-cols-2">
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
                          {messenger === "telegram" ? "Telegram" : "Viber"}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D2A3E] mb-2">Сообщение</label>
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
                    className="flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] px-6 font-semibold text-white transition-all hover:shadow-xl hover:shadow-[#9B6DD4]/25"
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

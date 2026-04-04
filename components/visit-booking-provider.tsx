"use client"

import { createContext, useContext, useMemo, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { TelegramIcon, ViberIcon } from "@/components/brand-icons"

interface VisitBookingContextValue {
  openBooking: () => void
}

const VisitBookingContext = createContext<VisitBookingContextValue | null>(null)

const initialFormData = {
  name: "",
  phone: "",
  messenger: "telegram",
  comment: "",
}

export function VisitBookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const value = useMemo(
    () => ({
      openBooking: () => setOpen(true),
    }),
    [],
  )

  const resetState = () => {
    setFormData(initialFormData)
    setIsSubmitting(false)
    setSubmitError("")
    setIsSubmitted(false)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)

    if (!nextOpen) {
      resetState()
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
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
          productName: "Запрос на посещение поля",
          comment: formData.comment || "Без дополнительных пожеланий",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit visit request.")
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error(error)
      setSubmitError("Не удалось отправить заявку. Попробуйте еще раз.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <VisitBookingContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-[min(92vw,620px)] rounded-[2rem] border-0 bg-[#fcfaf7] p-0 shadow-[0_24px_80px_-40px_rgba(73,45,112,0.55)]">
          {!isSubmitted ? (
            <div className="overflow-hidden rounded-[2rem]">
              <div className="border-b border-[#efe5f6] bg-gradient-to-r from-[#f7f0fd] via-[#fcfaf7] to-[#f3ebfb] px-6 py-6 sm:px-8">
                <span className="inline-flex rounded-full border border-white/80 bg-white/90 px-4 py-1.5 text-sm font-medium text-[#6B4C9A] shadow-sm">
                  Посещение поля
                </span>
                <h3 className="mt-5 font-serif text-[2rem] leading-none text-[#2D2A3E] sm:text-[2.3rem]">
                  Оставьте заявку на визит
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#6B5A7B] sm:text-[15px]">
                  Укажите контакты и пожелания по дню или формату посещения. Мы свяжемся с вами и уточним детали.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 sm:px-8 sm:py-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#2D2A3E]">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                      className="lav-input"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#2D2A3E]">Телефон</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                      className="lav-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-[#2D2A3E]">Где удобнее связаться?</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label
                      className={`lav-choice cursor-pointer ${
                        formData.messenger === "telegram"
                          ? "border-[#9B6DD4] bg-[#F8F4FC] text-[#6B4C9A]"
                          : "border-[#E8E0F0] text-[#6B5A7B]"
                      }`}
                    >
                      <input
                        type="radio"
                        className="sr-only"
                        name="messenger"
                        value="telegram"
                        checked={formData.messenger === "telegram"}
                        onChange={(event) => setFormData({ ...formData, messenger: event.target.value })}
                      />
                      <TelegramIcon />
                      Telegram
                    </label>
                    <label
                      className={`lav-choice cursor-pointer ${
                        formData.messenger === "viber"
                          ? "border-[#9B6DD4] bg-[#F8F4FC] text-[#6B4C9A]"
                          : "border-[#E8E0F0] text-[#6B5A7B]"
                      }`}
                    >
                      <input
                        type="radio"
                        className="sr-only"
                        name="messenger"
                        value="viber"
                        checked={formData.messenger === "viber"}
                        onChange={(event) => setFormData({ ...formData, messenger: event.target.value })}
                      />
                      <ViberIcon />
                      Viber
                    </label>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#2D2A3E]">Пожелания</label>
                  <textarea
                    rows={5}
                    value={formData.comment}
                    onChange={(event) => setFormData({ ...formData, comment: event.target.value })}
                    className="lav-textarea min-h-32"
                    placeholder="Например: хотим приехать в субботу, нужны 2 взрослых и ребенок, интересует фотосессия"
                  />
                </div>

                {submitError ? <p className="text-sm text-red-500">{submitError}</p> : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#6B4C9A] px-6 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#9B6DD4]/20 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {isSubmitting ? "Отправляем..." : "Отправить заявку"}
                </button>
              </form>
            </div>
          ) : (
            <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-12 text-center sm:px-10">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A]">
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-[#2D2A3E]">Заявка отправлена</h4>
              <p className="mt-3 max-w-md text-[#6B5A7B]">
                Мы свяжемся с вами в выбранном мессенджере и уточним удобный день посещения.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </VisitBookingContext.Provider>
  )
}

export function useVisitBooking() {
  const context = useContext(VisitBookingContext)

  if (!context) {
    throw new Error("useVisitBooking must be used inside VisitBookingProvider.")
  }

  return context
}

"use client"

import { useMemo, useState } from "react"
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react"
import { TelegramIcon, ViberIcon } from "@/components/brand-icons"
import { useCart } from "@/components/cart-provider"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function CartSheet({
  triggerClassName = "",
  showLabel = false,
}: {
  triggerClassName?: string
  showLabel?: boolean
}) {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    messenger: "telegram",
    comment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const orderSummary = useMemo(() => {
    return items
      .map((item) => `${item.product.name} x${item.quantity} - ${item.product.price * item.quantity} BYN`)
      .join("\n")
  }, [items])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!items.length) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "order",
          customerName: formData.name,
          phone: formData.phone,
          messenger: formData.messenger,
          productName: `Корзина (${items.length})`,
          comment: `${orderSummary}\n\nКомментарий клиента: ${formData.comment || "Нет"}`,
        }),
      })

      if (!response.ok) {
        throw new Error("Не удалось отправить заказ.")
      }

      setIsSubmitted(true)
      clearCart()
    } catch (error) {
      console.error(error)
      setSubmitError("Не удалось отправить заказ. Попробуйте еще раз.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className={`relative flex h-11 items-center justify-center rounded-2xl bg-[#F8F4FC] px-4 text-[#6B4C9A] transition-colors hover:bg-[#EDE5F5] ${triggerClassName}`}
        >
          <ShoppingBag className="h-5 w-5" />
          {showLabel ? <span className="ml-2 text-sm font-medium">Корзина</span> : null}
          {totalItems > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#9B6DD4] px-1 text-xs font-semibold text-white">
              {totalItems}
            </span>
          ) : null}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full border-l-0 overflow-hidden bg-[#fcfaf7] p-0 sm:max-w-xl">
        <SheetHeader className="border-b border-[#eadfce] px-6 py-5">
          <SheetTitle className="font-serif text-2xl text-[#3c3027]">Корзина</SheetTitle>
          <SheetDescription className="text-[#8f7c6a]">
            Сначала добавьте товары сюда, затем оформите заявку.
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 pb-10">
            {!items.length && !isSubmitted ? (
              <div className="rounded-3xl border border-dashed border-[#dbc9b4] bg-white p-8 text-center text-[#8f7c6a]">
                Корзина пока пустая.
              </div>
            ) : null}

            {items.length ? (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="rounded-3xl bg-white p-4 shadow-sm">
                    <div className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-24 w-24 rounded-2xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-base font-semibold text-[#2D2A3E]">{item.product.name}</h3>
                            <p className="mt-1 text-sm text-[#6B5A7B]">{item.product.price} BYN / шт</p>
                          </div>
                          <button onClick={() => removeItem(item.product.id)} className="text-[#9B6DD4]">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-2xl bg-[#F8F4FC] p-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-xl text-[#6B4C9A]"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-8 text-center text-sm font-medium text-[#2D2A3E]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-xl text-[#6B4C9A]"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="font-semibold text-[#8b9a7d]">
                            {item.product.price * item.quantity} BYN
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {items.length && !isSubmitted ? (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-[2rem] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#F0E8F5] pb-4">
                  <span className="text-sm text-[#6B5A7B]">Итого</span>
                  <span className="text-xl font-semibold text-[#2D2A3E]">{totalPrice} BYN</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#2D2A3E]">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="lav-input"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#2D2A3E]">Телефон</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="lav-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-[#2D2A3E]">Где удобнее связаться?</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className={`lav-choice cursor-pointer ${formData.messenger === "telegram" ? "border-[#9B6DD4] bg-[#F8F4FC] text-[#6B4C9A]" : "border-[#E8E0F0] text-[#6B5A7B]"}`}>
                      <input
                        type="radio"
                        name="messenger"
                        value="telegram"
                        checked={formData.messenger === "telegram"}
                        onChange={(e) => setFormData({ ...formData, messenger: e.target.value })}
                        className="sr-only"
                      />
                      <TelegramIcon />
                      Telegram
                    </label>
                    <label className={`lav-choice cursor-pointer ${formData.messenger === "viber" ? "border-[#9B6DD4] bg-[#F8F4FC] text-[#6B4C9A]" : "border-[#E8E0F0] text-[#6B5A7B]"}`}>
                      <input
                        type="radio"
                        name="messenger"
                        value="viber"
                        checked={formData.messenger === "viber"}
                        onChange={(e) => setFormData({ ...formData, messenger: e.target.value })}
                        className="sr-only"
                      />
                      <ViberIcon />
                      Viber
                    </label>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#2D2A3E]">Комментарий</label>
                  <textarea
                    rows={4}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="lav-textarea min-h-28"
                    placeholder="Уточнения по доставке, времени, пожелания"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A] font-semibold text-white transition-all hover:shadow-xl hover:shadow-[#9B6DD4]/25"
                >
                  {isSubmitting ? "Отправляем..." : "Оформить заказ"}
                </button>
                {submitError ? <p className="text-sm text-red-500">{submitError}</p> : null}
              </form>
            ) : null}

            {isSubmitted ? (
              <div className="mt-6 rounded-[2rem] bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#9B6DD4] to-[#6B4C9A]">
                  <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2D2A3E]">Заказ отправлен</h3>
                <p className="mt-2 text-[#6B5A7B]">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : null}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

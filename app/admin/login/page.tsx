"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ login: "", password: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const payload = (await response.json()) as { ok: boolean; error?: string }

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Не удалось войти.")
      }

      router.push("/admin")
      router.refresh()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Не удалось войти.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f1ea] px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-[#e5d8c8] bg-[#fcfaf7] p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#9b8a7a]">Lavanda Admin</p>
        <h1 className="mt-4 font-serif text-4xl text-[#3c3027]">Вход в админку</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#766657]">
          Введите логин и пароль администратора. Без авторизации раздел редактирования недоступен.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#3c3027]">Логин</label>
            <input
              type="text"
              autoComplete="username"
              value={formData.login}
              onChange={(event) => setFormData((current) => ({ ...current, login: event.target.value }))}
              className="lav-input"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#3c3027]">Пароль</label>
            <input
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
              className="lav-input"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#6B4C9A] px-6 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#9B6DD4]/20 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {isSubmitting ? "Входим..." : "Войти"}
          </button>
        </form>
      </div>
    </main>
  )
}


"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AdminPanelV2 } from "@/components/admin/variant-2/admin-panel"
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase-browser"

export default function AdminPage() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      router.replace("/admin/login/")
      return
    }

    const supabase = getSupabaseClient()

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setIsAuthorized(true)
      } else {
        router.replace("/admin/login/")
      }
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setIsAuthorized(false)
        router.replace("/admin/login/")
      }
    })

    return () => {
      subscription.subscription.unsubscribe()
    }
  }, [router])

  const handleLogout = async () => {
    await getSupabaseClient().auth.signOut()
    router.push("/admin/login/")
  }

  if (!isAuthorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1ea]">
        <p className="text-sm text-[#766657]">Проверяем доступ...</p>
      </main>
    )
  }

  return (
    <div className="relative">
      <div className="fixed top-4 right-4 z-[100] flex items-center gap-3">
        <button
          onClick={handleLogout}
          className="rounded-lg bg-[#6B4C9A] px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:bg-[#5e4288]"
        >
          Выйти
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg bg-white/90 px-4 py-2 text-sm font-medium text-[#6b5c4c] shadow-lg transition-colors hover:bg-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          На сайт
        </Link>
      </div>
      <AdminPanelV2 />
    </div>
  )
}

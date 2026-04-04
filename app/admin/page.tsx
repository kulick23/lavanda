"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { AdminPanelV2 } from "@/components/admin/variant-2/admin-panel"

export default function AdminPage() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
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

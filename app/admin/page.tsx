"use client"

import Link from "next/link"
import { AdminPanelV2 } from "@/components/admin/variant-2/admin-panel"

export default function AdminPage() {
  return (
    <div className="relative">
      <Link
        href="/"
        className="fixed top-4 right-4 z-[100] bg-white/90 hover:bg-white shadow-lg px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium text-[#6b5c4c] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        На сайт
      </Link>
      <AdminPanelV2 />
    </div>
  )
}

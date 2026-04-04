"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { AdminPanelV2 } from "./admin-panel"

interface AdminVariant2Props {
  onBack: () => void
}

export default function AdminVariant2({ onBack }: AdminVariant2Props) {
  return (
    <div className="relative">
      <Button
        onClick={onBack}
        variant="ghost"
        className="fixed top-4 right-4 z-[100] bg-white/90 hover:bg-white shadow-lg"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Назад к выбору
      </Button>
      <AdminPanelV2 />
    </div>
  )
}

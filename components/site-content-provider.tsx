"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { SiteContent } from "@/lib/types"

const STORAGE_KEY = "lavanda-site-content"

const SiteContentContext = createContext<{
  content: SiteContent
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>
  saveContent: () => Promise<boolean>
  isLoading: boolean
  isSaving: boolean
  isDirty: boolean
  saveError: string
} | null>(null)

export function SiteContentProvider({
  children,
  initialContent,
}: {
  children: React.ReactNode
  initialContent: SiteContent
}) {
  const initialSnapshot = JSON.stringify(initialContent)
  const [content, setContent] = useState<SiteContent>(initialContent)
  const [lastSavedSnapshot, setLastSavedSnapshot] = useState(initialSnapshot)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState("")

  useEffect(() => {
    setContent(initialContent)
    setLastSavedSnapshot(JSON.stringify(initialContent))
  }, [initialContent])

  useEffect(() => {
    if (isLoading) {
      return
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  }, [content, isLoading])

  const saveContent = async () => {
    setIsSaving(true)
    setSaveError("")

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(payload?.error || "Не удалось сохранить контент.")
      }

      const snapshot = JSON.stringify(content)
      setLastSavedSnapshot(snapshot)
      window.localStorage.setItem(STORAGE_KEY, snapshot)
      return true
    } catch (error) {
      const message = error instanceof Error ? error.message : "Не удалось сохранить контент."
      setSaveError(message)
      return false
    } finally {
      setIsSaving(false)
    }
  }

  const isDirty = JSON.stringify(content) !== lastSavedSnapshot

  return (
    <SiteContentContext.Provider value={{ content, setContent, saveContent, isLoading, isSaving, isDirty, saveError }}>
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent() {
  const context = useContext(SiteContentContext)

  if (!context) {
    throw new Error("useSiteContent must be used inside SiteContentProvider.")
  }

  return context
}

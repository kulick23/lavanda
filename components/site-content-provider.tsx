"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { defaultSiteContent } from "@/lib/site-content"
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

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent)
  const [lastSavedSnapshot, setLastSavedSnapshot] = useState(JSON.stringify(defaultSiteContent))
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState("")

  useEffect(() => {
    let cancelled = false

    async function loadContent() {
      try {
        const response = await fetch("/api/site-content", { cache: "no-store" })

        if (!response.ok) {
          throw new Error("Failed to load remote content.")
        }

        const payload = (await response.json()) as { ok: boolean; content?: SiteContent }
        const nextContent = payload.content ?? defaultSiteContent

        if (!cancelled) {
          setContent(nextContent)
          setLastSavedSnapshot(JSON.stringify(nextContent))
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContent))
        }
      } catch (error) {
        console.error("Failed to load remote site content", error)

        const saved = window.localStorage.getItem(STORAGE_KEY)

        if (!saved) {
          if (!cancelled) {
            setLastSavedSnapshot(JSON.stringify(defaultSiteContent))
          }
          return
        }

        try {
          const parsed = JSON.parse(saved) as SiteContent
          if (!cancelled) {
            setContent(parsed)
            setLastSavedSnapshot(JSON.stringify(parsed))
          }
        } catch (parseError) {
          console.error("Failed to read saved site content", parseError)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadContent()

    return () => {
      cancelled = true
    }
  }, [])

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

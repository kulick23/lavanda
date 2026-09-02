"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { SiteContent } from "@/lib/types"
import { isRemoteContentEnabled, readSiteContent, writeSiteContent } from "@/lib/site-content-store"

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
  const [isLoading, setIsLoading] = useState(isRemoteContentEnabled())
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState("")

  useEffect(() => {
    if (!isRemoteContentEnabled()) {
      return
    }

    let cancelled = false

    readSiteContent()
      .then((remoteContent) => {
        if (cancelled) return
        setContent(remoteContent)
        setLastSavedSnapshot(JSON.stringify(remoteContent))
      })
      .catch(() => {
        // Supabase недоступен — сайт продолжает работать на контенте по умолчанию.
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false)
        }
      })

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
      await writeSiteContent(content)

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

"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { defaultSiteContent } from "@/lib/site-content"
import type { SiteContent } from "@/lib/types"

const STORAGE_KEY = "lavanda-site-content"

const SiteContentContext = createContext<{
  content: SiteContent
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>
} | null>(null)

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)

    if (!saved) {
      return
    }

    try {
      setContent(JSON.parse(saved) as SiteContent)
    } catch (error) {
      console.error("Failed to read saved site content", error)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  }, [content])

  return (
    <SiteContentContext.Provider value={{ content, setContent }}>
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

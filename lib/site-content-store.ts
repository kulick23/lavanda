import { defaultSiteContent } from "@/lib/site-content"
import type { SiteContent } from "@/lib/types"
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase-browser"

const SITE_CONTENT_ROW = "main"
const CONTENT_TABLE = process.env.NEXT_PUBLIC_SUPABASE_CONTENT_TABLE || "site_content"
const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "site-assets"

export function isRemoteContentEnabled() {
  return isSupabaseConfigured()
}

function isSiteContentLike(value: unknown): value is SiteContent {
  if (!value || typeof value !== "object") return false

  const candidate = value as Partial<SiteContent>
  return (
    Array.isArray(candidate.categories) &&
    Array.isArray(candidate.products) &&
    typeof candidate.settings === "object" &&
    typeof candidate.hero === "object" &&
    typeof candidate.about === "object" &&
    typeof candidate.production === "object" &&
    typeof candidate.visit === "object" &&
    Array.isArray(candidate.purchaseOptions)
  )
}

export async function readSiteContent() {
  if (!isSupabaseConfigured()) {
    return defaultSiteContent
  }

  const { data, error } = await getSupabaseClient()
    .from(CONTENT_TABLE)
    .select("data")
    .eq("slug", SITE_CONTENT_ROW)
    .limit(1)
    .maybeSingle()

  if (error) {
    throw new Error("Failed to fetch site content from Supabase.")
  }

  return isSiteContentLike(data?.data) ? data.data : defaultSiteContent
}

export async function writeSiteContent(content: SiteContent) {
  if (!isSupabaseConfigured()) {
    return content
  }

  const { error } = await getSupabaseClient()
    .from(CONTENT_TABLE)
    .upsert({ slug: SITE_CONTENT_ROW, data: content }, { onConflict: "slug" })

  if (error) {
    throw new Error("Не удалось сохранить контент. Проверьте, что вы вошли в админку.")
  }

  return content
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase()
}

export async function uploadSiteImage(file: File) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase env vars are not configured.")
  }

  const supabase = getSupabaseClient()
  const fileName = `${Date.now()}-${sanitizeFilename(file.name || "image")}`
  const filePath = `uploads/${fileName}`

  // Имя файла уникально (таймстамп), а upsert требует дополнительных
  // RLS-политик (select/delete) на storage.objects — поэтому без него.
  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(filePath, file, {
    contentType: file.type || "application/octet-stream",
  })

  if (error) {
    throw new Error("Failed to upload image to Supabase Storage.")
  }

  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath).data.publicUrl
}

import { defaultSiteContent } from "@/lib/site-content"
import type { SiteContent } from "@/lib/types"

const SITE_CONTENT_ROW = "main"
const CONTENT_TABLE = process.env.SUPABASE_CONTENT_TABLE || "site_content"
const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "site-assets"

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    return null
  }

  return { url, serviceRoleKey }
}

function getHeaders(contentType = "application/json") {
  const config = getSupabaseConfig()

  if (!config) {
    throw new Error("Supabase env vars are not configured.")
  }

  return {
    apikey: config.serviceRoleKey,
    Authorization: `Bearer ${config.serviceRoleKey}`,
    "Content-Type": contentType,
  }
}

export function isRemoteContentEnabled() {
  return Boolean(getSupabaseConfig())
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
  const config = getSupabaseConfig()

  if (!config) {
    return defaultSiteContent
  }

  const response = await fetch(
    `${config.url}/rest/v1/${CONTENT_TABLE}?select=data&slug=eq.${SITE_CONTENT_ROW}&limit=1`,
    {
      headers: getHeaders(),
      cache: "no-store",
    },
  )

  if (!response.ok) {
    throw new Error("Failed to fetch site content from Supabase.")
  }

  const rows = (await response.json()) as Array<{ data?: unknown }>
  return isSiteContentLike(rows[0]?.data) ? rows[0].data : defaultSiteContent
}

export async function writeSiteContent(content: SiteContent) {
  const config = getSupabaseConfig()

  if (!config) {
    return content
  }

  const response = await fetch(
    `${config.url}/rest/v1/${CONTENT_TABLE}?on_conflict=slug`,
    {
      method: "POST",
      headers: {
        ...getHeaders(),
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify([{ slug: SITE_CONTENT_ROW, data: content }]),
    },
  )

  if (!response.ok) {
    throw new Error("Failed to save site content to Supabase.")
  }

  return content
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase()
}

export async function uploadSiteImage(file: File) {
  const config = getSupabaseConfig()

  if (!config) {
    throw new Error("Supabase env vars are not configured.")
  }

  const fileName = `${Date.now()}-${sanitizeFilename(file.name || "image")}`
  const filePath = `uploads/${fileName}`
  const body = Buffer.from(await file.arrayBuffer())

  const response = await fetch(`${config.url}/storage/v1/object/${STORAGE_BUCKET}/${filePath}`, {
    method: "POST",
    headers: {
      ...getHeaders(file.type || "application/octet-stream"),
      "x-upsert": "true",
    },
    body,
  })

  if (!response.ok) {
    throw new Error("Failed to upload image to Supabase Storage.")
  }

  return `${config.url}/storage/v1/object/public/${STORAGE_BUCKET}/${filePath}`
}

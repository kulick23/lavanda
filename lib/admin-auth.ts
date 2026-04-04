import { cookies } from "next/headers"

export const ADMIN_SESSION_COOKIE = "lavanda_admin_session"

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "lavanda-dev-secret"
}

function encodePayload(payload: Record<string, unknown>) {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url")
}

function decodePayload(value: string) {
  return JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as {
    login?: string
    exp?: number
  }
}

async function signValue(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )

  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value))
  return Buffer.from(signature).toString("hex")
}

function timingSafeEqualHex(a: string, b: string) {
  if (a.length !== b.length) {
    return false
  }

  let result = 0

  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index)
  }

  return result === 0
}

export async function createAdminSessionToken(login: string) {
  const payload = encodePayload({
    login,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
  })

  return `${payload}.${await signValue(payload)}`
}

export async function verifyAdminSessionToken(token: string | undefined | null) {
  if (!token) return false

  const [payload, signature] = token.split(".")

  if (!payload || !signature) return false

  const expectedSignature = await signValue(payload)

  if (!timingSafeEqualHex(signature, expectedSignature)) {
    return false
  }

  try {
    const decoded = decodePayload(payload)

    if (!decoded.exp || decoded.exp < Date.now()) return false
    if (!decoded.login || decoded.login !== process.env.ADMIN_LOGIN) return false

    return true
  } catch {
    return false
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)
}


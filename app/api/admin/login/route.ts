import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE, createAdminSessionToken } from "@/lib/admin-auth"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { login?: string; password?: string }
    const expectedLogin = process.env.ADMIN_LOGIN
    const expectedPassword = process.env.ADMIN_PASSWORD

    if (!expectedLogin || !expectedPassword) {
      return NextResponse.json(
        { ok: false, error: "ADMIN_LOGIN и ADMIN_PASSWORD не настроены." },
        { status: 500 },
      )
    }

    if (body.login !== expectedLogin || body.password !== expectedPassword) {
      return NextResponse.json({ ok: false, error: "Неверный логин или пароль." }, { status: 401 })
    }

    const cookieStore = await cookies()
    cookieStore.set(ADMIN_SESSION_COOKIE, await createAdminSessionToken(expectedLogin), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ ok: false, error: "Не удалось войти в админку." }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { writeSiteContent } from "@/lib/site-content-store"
import type { SiteContent } from "@/lib/types"

export async function PUT(request: Request) {
  try {
    const isAuthed = await isAdminAuthenticated()

    if (!isAuthed) {
      return NextResponse.json({ ok: false, error: "Требуется авторизация." }, { status: 401 })
    }

    const body = (await request.json()) as { content?: SiteContent }

    if (!body.content) {
      return NextResponse.json({ ok: false, error: "Контент не передан." }, { status: 400 })
    }

    await writeSiteContent(body.content)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ ok: false, error: "Не удалось сохранить контент." }, { status: 500 })
  }
}


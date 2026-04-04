import { NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { uploadSiteImage } from "@/lib/site-content-store"

export async function POST(request: Request) {
  try {
    const isAuthed = await isAdminAuthenticated()

    if (!isAuthed) {
      return NextResponse.json({ ok: false, error: "Требуется авторизация." }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "Файл не найден." }, { status: 400 })
    }

    const url = await uploadSiteImage(file)
    return NextResponse.json({ ok: true, url })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ ok: false, error: "Не удалось загрузить изображение." }, { status: 500 })
  }
}


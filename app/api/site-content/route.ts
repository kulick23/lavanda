import { NextResponse } from "next/server"
import { readSiteContent } from "@/lib/site-content-store"

export async function GET() {
  try {
    const content = await readSiteContent()
    return NextResponse.json({ ok: true, content })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ ok: false, error: "Не удалось загрузить контент сайта." }, { status: 500 })
  }
}


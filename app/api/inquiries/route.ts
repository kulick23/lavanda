import { NextResponse } from "next/server"
import { sendTelegramNotification } from "@/lib/notifications"
import type { InquiryPayload, Messenger } from "@/lib/types"

function isMessenger(value: string): value is Messenger {
  return value === "telegram" || value === "viber"
}

function normalizePayload(body: Record<string, unknown>): InquiryPayload | null {
  if (
    (body.type !== "order" && body.type !== "contact") ||
    typeof body.customerName !== "string" ||
    typeof body.phone !== "string" ||
    typeof body.messenger !== "string" ||
    !isMessenger(body.messenger)
  ) {
    return null
  }

  return {
    type: body.type,
    customerName: body.customerName.trim(),
    phone: body.phone.trim(),
    messenger: body.messenger,
    comment: typeof body.comment === "string" ? body.comment.trim() : "",
    productId: typeof body.productId === "string" ? body.productId : undefined,
    productName: typeof body.productName === "string" ? body.productName : undefined,
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const payload = normalizePayload(body)

    if (!payload || payload.customerName.length < 2 || payload.phone.length < 7) {
      return NextResponse.json(
        { ok: false, error: "Некорректные данные формы." },
        { status: 400 },
      )
    }

    const notification = await sendTelegramNotification(payload)

    return NextResponse.json({
      ok: true,
      notification,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { ok: false, error: "Не удалось обработать заявку." },
      { status: 500 },
    )
  }
}

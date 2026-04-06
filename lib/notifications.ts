import type { InquiryPayload } from "@/lib/types"

function formatInquiryMessage(payload: InquiryPayload) {
  const lines = [
    payload.type === "order" ? "Новая заявка на товар" : "Новое сообщение с сайта",
    "",
    `Имя: ${payload.customerName}`,
    `Телефон: ${payload.phone}`,
    `Мессенджер: ${payload.messenger}`,
  ]

  if (payload.productName) {
    lines.push(`Товар: ${payload.productName}`)
  }

  if (payload.comment) {
    lines.push(`Комментарий: ${payload.comment}`)
  }

  return lines.join("\n")
}

export async function sendTelegramNotification(payload: InquiryPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return {
      delivered: false,
      reason: "Telegram env vars are not configured.",
    }
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatInquiryMessage(payload),
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { description?: string } | null
    throw new Error(payload?.description || "Failed to send Telegram notification.")
  }

  return {
    delivered: true,
  }
}

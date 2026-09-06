import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const BookingSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().max(120).optional().or(z.literal("")),
  comment: z.string().trim().max(1000).optional().or(z.literal("")),
  date: z.string().trim().max(80).optional().or(z.literal("")),
  slot: z.string().trim().max(20).optional().or(z.literal("")),
  page: z.string().trim().max(200).optional().or(z.literal("")),
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildMessage(data: z.infer<typeof BookingSchema>) {
  const extras: string[] = [];
  if (data.date || data.slot) {
    extras.push(`Желаемое время: ${[data.date, data.slot].filter(Boolean).join(", ")}`);
  }
  if (data.comment) extras.push(`Комментарий: ${data.comment}`);
  if (data.page) extras.push(`Страница: ${data.page}`);

  const now = new Date().toLocaleString("ru-RU", {
    timeZone: "Asia/Omsk",
    dateStyle: "short",
    timeStyle: "short",
  });

  return [
    "🔔 <b>НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ</b>",
    "",
    `👤 Имя: ${escapeHtml(data.name)}`,
    `📱 Телефон: ${escapeHtml(data.phone)}`,
    `📧 Email: ${data.email ? escapeHtml(data.email) : "не указан"}`,
    "",
    "📝 Дополнительная информация:",
    extras.length ? extras.map((line) => escapeHtml(line)).join("\n") : "—",
    "",
    `🕐 Время заявки: ${now} (Омск)`,
  ].join("\n");
}

export const Route = createFileRoute("/api/telegram")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = process.env["TELEGRAM_BOT_TOKEN"];
        const chatId = process.env["TELEGRAM_CHAT_ID"];

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
        }

        const parsed = BookingSchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json({ ok: false, error: "validation" }, { status: 400 });
        }

        if (!token || !chatId) {
          console.error("Telegram env vars missing: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID");
          return Response.json({ ok: false, error: "unavailable" }, { status: 503 });
        }

        try {
          const tgResponse = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text: buildMessage(parsed.data),
                parse_mode: "HTML",
                disable_web_page_preview: true,
              }),
            },
          );

          const body = (await tgResponse.json().catch(() => null)) as
            | { ok?: boolean; description?: string }
            | null;

          if (!tgResponse.ok || !body?.ok) {
            console.error(
              `Telegram sendMessage failed [${tgResponse.status}]: ${body?.description ?? "no body"}`,
            );
            return Response.json({ ok: false, error: "telegram" }, { status: 502 });
          }

          return Response.json({ ok: true });
        } catch (error) {
          console.error("Telegram request error", error);
          return Response.json({ ok: false, error: "telegram" }, { status: 502 });
        }
      },
    },
  },
});

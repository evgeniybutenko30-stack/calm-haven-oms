import { escapeHtml, sendMessage } from "./telegram-api.server";
import { getTelegramStore } from "./telegram-store.server";

export type BookingPayload = {
  name: string;
  phone: string;
  email?: string;
  comment?: string;
  date?: string;
  slot?: string;
  page?: string;
};

const dash = (value?: string) => (value && value.trim() ? escapeHtml(value.trim()) : "-");

export function buildBookingMessage(data: BookingPayload) {
  const now = new Date().toLocaleString("ru-RU", {
    timeZone: "Asia/Omsk",
    dateStyle: "short",
    timeStyle: "short",
  });

  return [
    "🔔 <b>НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ</b>",
    "",
    `👤 Имя: ${dash(data.name)}`,
    `📱 Телефон: ${dash(data.phone)}`,
    `📧 Email: ${dash(data.email)}`,
    `📝 Запрос: ${dash(data.comment)}`,
    `📅 Дата: ${dash(data.date)}`,
    `⏰ Время: ${dash(data.slot)}`,
    `🌐 Страница: ${dash(data.page)}`,
    "",
    `🕐 Время заявки: ${now} (Омск)`,
  ].join("\n");
}

/**
 * Sends the booking notification to every active recipient.
 * One failing recipient never blocks the others, and never fails the booking.
 */
export async function notifyActiveUsers(data: BookingPayload) {
  const store = await getTelegramStore();
  const recipients = await store.listActive();

  const adminChatId = process.env["TELEGRAM_ADMIN_CHAT_ID"];
  const chatIds = new Set(recipients.map((u) => u.chat_id));
  if (adminChatId) chatIds.add(String(adminChatId));

  if (chatIds.size === 0) {
    console.warn("Telegram notification skipped: no active recipients");
    return { sent: 0, failed: 0 };
  }

  const text = buildBookingMessage(data);
  const results = await Promise.allSettled([...chatIds].map((id) => sendMessage(id, text)));

  let sent = 0;
  let failed = 0;
  results.forEach((result, index) => {
    const chatId = [...chatIds][index];
    if (result.status === "fulfilled") {
      sent += 1;
      console.log(`Telegram notification sent (chat_id=${chatId})`);
    } else {
      failed += 1;
      console.error(
        `Telegram notification failed (chat_id=${chatId}):`,
        result.reason instanceof Error ? result.reason.message : result.reason,
      );
    }
  });

  return { sent, failed };
}

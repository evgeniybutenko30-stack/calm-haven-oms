/** Server-only Telegram Bot API helpers. The bot token never leaves this module's callers. */

export function getBotToken(): string | null {
  return process.env["TELEGRAM_BOT_TOKEN"] ?? null;
}

export function getAdminChatId(): string | null {
  return process.env["TELEGRAM_ADMIN_CHAT_ID"] ?? null;
}

export function isAdmin(chatId: unknown): boolean {
  const admin = getAdminChatId();
  return Boolean(admin) && String(chatId) === String(admin);
}

type InlineKeyboard = { text: string; callback_data: string }[][];

async function callTelegram(method: string, payload: Record<string, unknown>) {
  const token = getBotToken();
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN is not configured");

  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = (await response.json().catch(() => null)) as {
    ok?: boolean;
    description?: string;
    result?: unknown;
  } | null;

  if (!response.ok || !body?.ok) {
    throw new Error(
      `Telegram ${method} failed [${response.status}]: ${body?.description ?? "no body"}`,
    );
  }
  return body.result;
}

export function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function sendMessage(
  chatId: string,
  text: string,
  options?: { inlineKeyboard?: InlineKeyboard },
) {
  return callTelegram("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...(options?.inlineKeyboard
      ? { reply_markup: { inline_keyboard: options.inlineKeyboard } }
      : {}),
  });
}

export function editMessageText(chatId: string, messageId: number, text: string) {
  return callTelegram("editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

export function answerCallbackQuery(callbackQueryId: string, text?: string) {
  return callTelegram("answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    ...(text ? { text } : {}),
  });
}

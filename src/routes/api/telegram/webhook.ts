import { createFileRoute } from "@tanstack/react-router";

import {
  answerCallbackQuery,
  editMessageText,
  escapeHtml,
  getAdminChatId,
  getBotToken,
  isAdmin,
  sendMessage,
} from "@/lib/telegram-api.server";
import { getTelegramStore, isValidChatId, type TelegramUser } from "@/lib/telegram-store.server";

const STATUS_LABEL: Record<TelegramUser["status"], string> = {
  pending: "⏳ ожидает подтверждения",
  active: "✅ активен",
  disabled: "❌ отключён",
};

function describeUser(user: TelegramUser) {
  return [
    `Имя: ${escapeHtml(user.first_name ?? "-")}`,
    `Username: ${user.username ? "@" + escapeHtml(user.username) : "-"}`,
    `Chat ID: <code>${escapeHtml(user.chat_id)}</code>`,
    `Статус: ${STATUS_LABEL[user.status]}`,
    `Дата подключения: ${new Date(user.created_at).toLocaleString("ru-RU", { timeZone: "Asia/Omsk" })}`,
  ].join("\n");
}

async function handleStart(chatId: string, from: { username?: string; first_name?: string }) {
  const store = await getTelegramStore();
  const { user, created } = await store.upsertPending({
    chat_id: chatId,
    username: from.username ?? null,
    first_name: from.first_name ?? null,
  });

  if (created) {
    console.log(`Telegram user registered (chat_id=${chatId})`);
    await sendMessage(chatId, "Вы зарегистрированы. Ожидайте подтверждения администратора.");

    const admin = getAdminChatId();
    if (admin) {
      await sendMessage(
        admin,
        [
          "👤 <b>НОВЫЙ ПОЛЬЗОВАТЕЛЬ</b>",
          "",
          `Имя: ${escapeHtml(user.first_name ?? "-")}`,
          `Username: ${user.username ? "@" + escapeHtml(user.username) : "-"}`,
          `Chat ID: <code>${escapeHtml(user.chat_id)}</code>`,
        ].join("\n"),
        {
          inlineKeyboard: [
            [
              { text: "✅ Подключить", callback_data: `approve:${user.chat_id}` },
              { text: "❌ Отклонить", callback_data: `remove:${user.chat_id}` },
            ],
          ],
        },
      );
    } else {
      console.error("Telegram webhook error: TELEGRAM_ADMIN_CHAT_ID is not configured");
    }
    return;
  }

  if (user.status === "active") {
    await sendMessage(chatId, "✅ Вы уже подключены к уведомлениям.");
  } else if (user.status === "pending") {
    await sendMessage(chatId, "⏳ Ваша заявка на подключение ожидает подтверждения.");
  } else {
    await sendMessage(
      chatId,
      "❌ Вы отключены от получения уведомлений. Обратитесь к администратору.",
    );
  }
}

async function handleUsers(adminChatId: string) {
  const store = await getTelegramStore();
  const users = await store.list();
  if (users.length === 0) {
    await sendMessage(adminChatId, "Пока нет ни одного зарегистрированного пользователя.");
    return;
  }
  await sendMessage(
    adminChatId,
    ["<b>Пользователи бота</b>", "", ...users.map(describeUser)].join("\n\n"),
  );
}

async function applyStatus(target: string, status: "active" | "disabled") {
  const store = await getTelegramStore();
  const user = await store.get(target);
  if (!user) return null;
  const updated = await store.setStatus(target, status);
  if (status === "active") {
    console.log(`Telegram user approved (chat_id=${target})`);
    await sendMessage(
      target,
      "✅ Вы подключены. Теперь вам будут приходить новые заявки с сайта.",
    ).catch((e) => console.error("Telegram notification failed:", e?.message ?? e));
  } else {
    console.log(`Telegram user disabled (chat_id=${target})`);
    await sendMessage(target, "❌ Вы отключены от получения заявок.").catch((e) =>
      console.error("Telegram notification failed:", e?.message ?? e),
    );
  }
  return updated;
}

async function handleMessage(message: {
  chat?: { id?: number | string };
  from?: { username?: string; first_name?: string };
  text?: string;
}) {
  const chatId = message.chat?.id;
  if (chatId === undefined || chatId === null) return;
  const chat = String(chatId);
  const text = (message.text ?? "").trim();
  if (!text.startsWith("/")) return;

  const [rawCommand, ...args] = text.split(/\s+/);
  const command = (rawCommand ?? "").split("@")[0]?.toLowerCase();

  if (command === "/start") {
    await handleStart(chat, message.from ?? {});
    return;
  }

  // Everything below is admin-only.
  if (!isAdmin(chat)) {
    await sendMessage(chat, "Эта команда доступна только администратору.");
    return;
  }

  if (command === "/users") {
    await handleUsers(chat);
    return;
  }

  if (command === "/approve" || command === "/remove") {
    const target = (args[0] ?? "").trim();
    if (!isValidChatId(target)) {
      await sendMessage(chat, `Укажите корректный chat_id: <code>${command} 123456789</code>`);
      return;
    }
    const status = command === "/approve" ? "active" : "disabled";
    const updated = await applyStatus(target, status);
    await sendMessage(
      chat,
      updated
        ? `Готово. Пользователь <code>${escapeHtml(target)}</code> теперь ${STATUS_LABEL[status]}.`
        : `Пользователь <code>${escapeHtml(target)}</code> не найден.`,
    );
    return;
  }

  await sendMessage(
    chat,
    "Доступные команды: /users, /approve &lt;chat_id&gt;, /remove &lt;chat_id&gt;",
  );
}

async function handleCallback(callback: {
  id: string;
  data?: string;
  message?: { message_id?: number; chat?: { id?: number | string }; text?: string };
  from?: { id?: number | string };
}) {
  const fromId = callback.from?.id;
  if (!isAdmin(fromId)) {
    await answerCallbackQuery(callback.id, "Доступно только администратору");
    return;
  }

  const [action, target] = (callback.data ?? "").split(":");
  if ((action !== "approve" && action !== "remove") || !isValidChatId(target ?? "")) {
    await answerCallbackQuery(callback.id, "Некорректная команда");
    return;
  }

  const status = action === "approve" ? "active" : "disabled";
  const updated = await applyStatus(target as string, status);
  await answerCallbackQuery(callback.id, updated ? "Готово" : "Пользователь не найден");

  const chatId = callback.message?.chat?.id;
  const messageId = callback.message?.message_id;
  if (chatId !== undefined && messageId !== undefined && updated) {
    await editMessageText(
      String(chatId),
      messageId,
      ["👤 <b>ПОЛЬЗОВАТЕЛЬ ОБНОВЛЁН</b>", "", describeUser(updated)].join("\n"),
    ).catch((e) => console.error("Telegram webhook error:", e?.message ?? e));
  }
}

export const Route = createFileRoute("/api/telegram/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["TELEGRAM_WEBHOOK_SECRET"];
        if (secret) {
          const provided = request.headers.get("X-Telegram-Bot-Api-Secret-Token") ?? "";
          if (provided !== secret) {
            console.error("Telegram webhook error: invalid secret token");
            return new Response("Unauthorized", { status: 401 });
          }
        }

        if (!getBotToken()) {
          console.error("Telegram webhook error: TELEGRAM_BOT_TOKEN is not configured");
          return Response.json({ ok: false }, { status: 503 });
        }

        let update: {
          message?: Parameters<typeof handleMessage>[0];
          edited_message?: Parameters<typeof handleMessage>[0];
          callback_query?: Parameters<typeof handleCallback>[0];
        };
        try {
          update = (await request.json()) as typeof update;
        } catch {
          return Response.json({ ok: false }, { status: 400 });
        }

        try {
          if (update.callback_query) {
            await handleCallback(update.callback_query);
          } else if (update.message ?? update.edited_message) {
            await handleMessage((update.message ?? update.edited_message)!);
          }
        } catch (error) {
          console.error("Telegram webhook error:", error instanceof Error ? error.message : error);
        }

        // Always 200 so Telegram does not retry endlessly.
        return Response.json({ ok: true });
      },
    },
  },
});

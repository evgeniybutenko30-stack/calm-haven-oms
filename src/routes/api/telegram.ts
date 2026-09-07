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

export const Route = createFileRoute("/api/telegram")({
  server: {
    handlers: {
      POST: async ({ request }) => {
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

        if (!process.env["TELEGRAM_BOT_TOKEN"]) {
          console.error("Telegram notification failed: TELEGRAM_BOT_TOKEN is not configured");
          return Response.json({ ok: false, error: "unavailable" }, { status: 503 });
        }

        // The booking itself is accepted here. Telegram problems are logged only.
        try {
          const { notifyActiveUsers } = await import("@/lib/telegram-notify.server");
          const result = await notifyActiveUsers(parsed.data);
          console.log(
            `Telegram notification summary: sent=${result.sent} failed=${result.failed}`,
          );
        } catch (error) {
          console.error(
            "Telegram notification failed:",
            error instanceof Error ? error.message : error,
          );
        }

        return Response.json({ ok: true });
      },
    },
  },
});

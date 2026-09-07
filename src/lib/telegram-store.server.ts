/**
 * Server-side storage for Telegram notification recipients.
 *
 * Primary backend: SQLite through Node's built-in `node:sqlite` module
 * (Node.js 22.5+ / 24+), file `data/telegram.sqlite` relative to the process CWD.
 * This is what runs on a normal VPS (AdminVPS) with `node .output/server/index.mjs`.
 *
 * Fallback: an in-memory store, used only when `node:sqlite` is unavailable
 * (e.g. the Lovable edge preview runtime). Never used in the VPS deployment.
 */

export type TelegramUserStatus = "pending" | "active" | "disabled";

export type TelegramUser = {
  id: number;
  chat_id: string;
  username: string | null;
  first_name: string | null;
  status: TelegramUserStatus;
  created_at: string;
  updated_at: string;
};

type Store = {
  upsertPending(user: {
    chat_id: string;
    username: string | null;
    first_name: string | null;
  }): Promise<{ user: TelegramUser; created: boolean }>;
  setStatus(chat_id: string, status: TelegramUserStatus): Promise<TelegramUser | null>;
  get(chat_id: string): Promise<TelegramUser | null>;
  list(): Promise<TelegramUser[]>;
  listActive(): Promise<TelegramUser[]>;
};

const nowIso = () => new Date().toISOString();

/* ------------------------------ SQLite backend ----------------------------- */

type SqliteDb = {
  exec(sql: string): void;
  prepare(sql: string): {
    run(...params: unknown[]): unknown;
    get(...params: unknown[]): unknown;
    all(...params: unknown[]): unknown[];
  };
};

async function createSqliteStore(): Promise<Store | null> {
  try {
    const [{ DatabaseSync }, fs, path] = await Promise.all([
      import(/* @vite-ignore */ "node:sqlite") as Promise<{
        DatabaseSync: new (path: string) => SqliteDb;
      }>,
      import(/* @vite-ignore */ "node:fs") as Promise<typeof import("node:fs")>,
      import(/* @vite-ignore */ "node:path") as Promise<typeof import("node:path")>,
    ]);

    const dir = process.env["TELEGRAM_DB_DIR"] ?? path.join(process.cwd(), "data");
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, "telegram.sqlite");
    const db = new DatabaseSync(file);

    db.exec(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS telegram_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chat_id TEXT NOT NULL UNIQUE,
        username TEXT,
        first_name TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);

    const asUser = (row: unknown): TelegramUser | null => (row ? (row as TelegramUser) : null);

    return {
      async upsertPending(user) {
        const existing = asUser(
          db.prepare("SELECT * FROM telegram_users WHERE chat_id = ?").get(user.chat_id),
        );
        if (existing) {
          db.prepare(
            "UPDATE telegram_users SET username = ?, first_name = ?, updated_at = ? WHERE chat_id = ?",
          ).run(user.username, user.first_name, nowIso(), user.chat_id);
          return { user: { ...existing, ...user }, created: false };
        }
        const ts = nowIso();
        db.prepare(
          "INSERT INTO telegram_users (chat_id, username, first_name, status, created_at, updated_at) VALUES (?, ?, ?, 'pending', ?, ?)",
        ).run(user.chat_id, user.username, user.first_name, ts, ts);
        const created = asUser(
          db.prepare("SELECT * FROM telegram_users WHERE chat_id = ?").get(user.chat_id),
        )!;
        return { user: created, created: true };
      },
      async setStatus(chat_id, status) {
        db.prepare("UPDATE telegram_users SET status = ?, updated_at = ? WHERE chat_id = ?").run(
          status,
          nowIso(),
          chat_id,
        );
        return asUser(db.prepare("SELECT * FROM telegram_users WHERE chat_id = ?").get(chat_id));
      },
      async get(chat_id) {
        return asUser(db.prepare("SELECT * FROM telegram_users WHERE chat_id = ?").get(chat_id));
      },
      async list() {
        return db
          .prepare("SELECT * FROM telegram_users ORDER BY created_at ASC")
          .all() as TelegramUser[];
      },
      async listActive() {
        return db
          .prepare("SELECT * FROM telegram_users WHERE status = 'active' ORDER BY created_at ASC")
          .all() as TelegramUser[];
      },
    };
  } catch (error) {
    console.warn(
      "Telegram store: node:sqlite unavailable, falling back to in-memory store",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

/* ---------------------------- In-memory fallback --------------------------- */

function createMemoryStore(): Store {
  const rows = new Map<string, TelegramUser>();
  let seq = 1;
  return {
    async upsertPending(user) {
      const existing = rows.get(user.chat_id);
      if (existing) {
        const updated = { ...existing, ...user, updated_at: nowIso() };
        rows.set(user.chat_id, updated);
        return { user: updated, created: false };
      }
      const ts = nowIso();
      const created: TelegramUser = {
        id: seq++,
        chat_id: user.chat_id,
        username: user.username,
        first_name: user.first_name,
        status: "pending",
        created_at: ts,
        updated_at: ts,
      };
      rows.set(user.chat_id, created);
      return { user: created, created: true };
    },
    async setStatus(chat_id, status) {
      const existing = rows.get(chat_id);
      if (!existing) return null;
      const updated = { ...existing, status, updated_at: nowIso() };
      rows.set(chat_id, updated);
      return updated;
    },
    async get(chat_id) {
      return rows.get(chat_id) ?? null;
    },
    async list() {
      return [...rows.values()];
    },
    async listActive() {
      return [...rows.values()].filter((u) => u.status === "active");
    },
  };
}

let storePromise: Promise<Store> | undefined;

export function getTelegramStore(): Promise<Store> {
  if (!storePromise) {
    storePromise = createSqliteStore().then((s) => s ?? createMemoryStore());
  }
  return storePromise;
}

export function isValidChatId(value: unknown): value is string {
  return typeof value === "string" && /^-?\d{1,20}$/.test(value.trim());
}

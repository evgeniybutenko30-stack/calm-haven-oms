import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import doctorAsset from "@/assets/doctor-babikov.png.asset.json";
import license2 from "@/assets/licenses/license-2.png.asset.json";
import license3 from "@/assets/licenses/license-3.png.asset.json";
import license4 from "@/assets/licenses/license-4.png.asset.json";
import license5 from "@/assets/licenses/license-5.png.asset.json";
import license6 from "@/assets/licenses/license-6.png.asset.json";
import license7 from "@/assets/licenses/license-7.png.asset.json";
import license8 from "@/assets/licenses/license-8.png.asset.json";
import license9 from "@/assets/licenses/license-9.png.asset.json";
import license10 from "@/assets/licenses/license-10.png.asset.json";
import license11 from "@/assets/licenses/license-11.png.asset.json";
import {
  Phone,
  Menu,
  X,
  ShieldCheck,
  FileText,
  Lock,
  Award,
  Wine,
  Cigarette,
  Dice5,
  Scale,
  Brain,
  HeartPulse,
  Pill,
  Sparkles,
  MapPin,
  Mail,
  Clock,
  ChevronRight,
  ChevronLeft,
  Quote,
  Calendar,
  PhoneCall,
  BadgeCheck,
  GraduationCap,
  Stamp,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Клиника Бабикова — психотерапия и наркология в Омске" },
      {
        name: "description",
        content:
          "Частная клиника в Омске с 2004 года. Врач психиатр-нарколог Бабиков В.Г., стаж 30+ лет. Анонимно, амбулаторно, по записи. Лечение зависимостей, неврозов, депрессий.",
      },
      { property: "og:title", content: "Клиника Бабикова — психотерапия и наркология в Омске" },
      {
        property: "og:description",
        content:
          "Частная клиника в Омске с 2004 года. Врач психиатр-нарколог Бабиков В.Г., стаж 30+ лет. Анонимно, амбулаторно, по записи. Лечение зависимостей, неврозов, депрессий.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#services", label: "Услуги" },
  { href: "#doctor", label: "О враче" },
  { href: "#process", label: "Как проходит" },
  { href: "#prices", label: "Цены" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#license", label: "Документы" },
  { href: "#booking", label: "Записаться" },
];

const PHONE_MAIN = "+7 (3812) 51-82-56";
const PHONE_MAIN_TEL = "+73812518256";
const PHONE_MOB = "+7 (913) 651-82-56";
const PHONE_MOB_TEL = "+79136518256";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms, transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/** Hero-only staged entry: renders after mount with staggered fade+slide. */
function Stage({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setMounted(true);
      return;
    }
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <Tag
      className={className}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms, transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border/60">
      <div className="container-page flex items-center justify-between h-18 py-3">
        <a href="#top" className="flex items-center gap-2 min-w-0">
          <div className="grid place-items-center h-10 w-10 shrink-0 rounded-full bg-primary text-primary-foreground font-display text-lg">
            Б
          </div>
          <div className="min-w-0 leading-tight">
            <div className="font-display text-base sm:text-lg truncate">Клиника Бабикова</div>
            <div className="text-[11px] text-muted-foreground truncate">
              психотерапия · наркология
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-foreground/80 hover:text-primary transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${PHONE_MAIN_TEL}`}
            className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            {PHONE_MAIN}
          </a>
          <a href="#booking" className="btn-primary hidden sm:inline-flex text-sm">
            Записаться
          </a>
          <button
            aria-label="Меню"
            className="lg:hidden grid place-items-center h-10 w-10 rounded-full border border-border"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="container-page flex items-center justify-between h-18 py-3">
            <div className="font-display text-lg">Меню</div>
            <button
              aria-label="Закрыть"
              className="grid place-items-center h-10 w-10 rounded-full border border-border"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="container-page flex flex-col gap-1 py-6">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 border-b border-border text-lg"
              >
                {n.label}
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </a>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <a href={`tel:${PHONE_MAIN_TEL}`} className="btn-ghost justify-between">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> {PHONE_MAIN}
                </span>
              </a>
              <a href="#booking" onClick={() => setOpen(false)} className="btn-primary">
                Записаться на консультацию
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* subtle radial background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 55% at 78% 30%, color-mix(in oklab, var(--primary) 12%, transparent) 0%, transparent 70%), radial-gradient(50% 45% at 8% 90%, color-mix(in oklab, var(--primary) 8%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="container-page pt-12 pb-20 md:pt-20 md:pb-32 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        {/* Text column */}
        <div className="lg:col-span-7 lg:pr-6 relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5 text-xs text-muted-foreground mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Частная практика в Омске — с 2004 года
            </div>
            <h1 className="font-display text-[2.75rem] sm:text-6xl lg:text-[5.25rem] leading-[0.95] text-foreground">
              Бабиков <span className="italic text-primary">Валерий</span>
              <br />
              Геннадьевич
            </h1>
            <p className="mt-6 text-lg md:text-xl text-foreground/75 max-w-xl leading-relaxed">
              Врач психиатр-нарколог. Стаж более 30 лет. Помогаю анонимно и без осуждения — вам и
              вашим близким.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#booking" className="btn-primary">
                <Calendar className="h-4 w-4" />
                Записаться на консультацию
              </a>
              <a
                href={`tel:${PHONE_MAIN_TEL}`}
                className="btn-ghost"
              >
                <Phone className="h-4 w-4" /> Позвонить: {PHONE_MAIN}
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {[
                { icon: Clock, title: "с 2004 года", sub: "20+ лет практики" },
                { icon: Lock, title: "Полная анонимность", sub: "без учёта и огласки" },
                { icon: Award, title: "Лицензия", sub: "№ ЛО-55-01-001182" },
              ].map((t) => (
                <div
                  key={t.title}
                  className="flex items-start gap-3 rounded-2xl bg-card/85 backdrop-blur-sm p-4 border border-border/60"
                >
                  <div className="grid place-items-center h-9 w-9 shrink-0 rounded-full bg-primary-soft text-primary">
                    <t.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium">{t.title}</div>
                    <div className="text-xs text-muted-foreground">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Doctor photo — asymmetric, bleeds off-container on desktop */}
        <div className="lg:col-span-5 relative">
          <Reveal delay={120}>
            <div className="relative mx-auto max-w-md lg:max-w-none lg:-mr-8 xl:-mr-16">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-primary-soft/70 blur-3xl -z-10" />
              <div className="relative rounded-[2rem] overflow-hidden bg-card border border-border/60 shadow-[var(--shadow-card)]">
                <img
                  src={doctorAsset.url}
                  alt="Бабиков Валерий Геннадьевич — врач психиатр-нарколог"
                  className="w-full h-auto object-cover aspect-[4/5]"
                  loading="eager"
                />
              </div>
              {/* floating credential card, overlapping the photo */}
              <div className="hidden md:flex absolute -left-8 bottom-10 lg:-left-14 items-center gap-3 rounded-2xl bg-card border border-border/70 px-5 py-4 shadow-[var(--shadow-card)] max-w-[280px]">
                <div className="grid place-items-center h-11 w-11 shrink-0 rounded-full bg-primary text-primary-foreground">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">Медицинская лицензия</div>
                  <div className="font-display text-base leading-tight">№ ЛО-55-01-001182</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    icon: Wine,
    title: "Лечение алкоголизма",
    desc: "Комплексная амбулаторная помощь: диагностика, медикаментозная поддержка и работа с психологической зависимостью.",
  },
  {
    icon: ShieldCheck,
    title: "Кодирование от алкоголизма",
    desc: "Индивидуальный подбор метода после консультации. Безопасно, конфиденциально, с медицинским сопровождением.",
  },
  {
    icon: HeartPulse,
    title: "Выведение из запоя",
    desc: "Восстановление состояния и снятие абстинентного синдрома в комфортных условиях, без госпитализации.",
  },
  {
    icon: Pill,
    title: "Лечение наркомании",
    desc: "Пошаговая программа с учётом истории и мотивации пациента. Поддержка семьи на всех этапах.",
  },
  {
    icon: Cigarette,
    title: "Кодирование от курения",
    desc: "Работа с никотиновой зависимостью — без «страшилок», спокойно и с понятным результатом.",
  },
  {
    icon: Scale,
    title: "Снижение веса",
    desc: "Кодирование от избыточного веса и поддержка новых пищевых привычек — мягко и без давления.",
  },
  {
    icon: Dice5,
    title: "Игровая зависимость",
    desc: "Помощь при лудомании и компульсивной игре. Программа для пациента и близких.",
  },
  {
    icon: Brain,
    title: "Неврозы, депрессия, стресс",
    desc: "Психотерапия и лекарственная поддержка при тревоге, бессоннице, эмоциональном выгорании.",
  },
];

function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-surface/60">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-primary mb-3">Услуги</div>
            <h2 className="text-3xl md:text-5xl">
              Помощь при зависимостях <span className="italic">и внутренних кризисах</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">
              Каждая программа подбирается индивидуально после консультации. Работаем анонимно, без
              осуждения, в удобном темпе для пациента и семьи.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <article className="group h-full rounded-3xl bg-card border border-border/60 p-7 hover:border-primary/30 hover:shadow-[var(--shadow-card)] hover:-translate-y-0.5 transition-all duration-300">
                <div className="grid place-items-center h-12 w-12 rounded-2xl bg-primary-soft text-primary mb-6">
                  <s.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                <a
                  href="#booking"
                  className="mt-6 inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all"
                >
                  Записаться <ChevronRight className="h-4 w-4" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Doctor() {
  return (
    <section id="doctor" className="relative py-20 md:py-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 60% at 15% 40%, color-mix(in oklab, var(--primary) 8%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="container-page grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-primary-soft/60 blur-2xl -z-10" />
              <img
                src={doctorAsset.url}
                alt="Врач Бабиков Валерий Геннадьевич"
                className="rounded-[2rem] w-full aspect-[4/5] object-cover border border-border/60 shadow-[var(--shadow-card)]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal delay={80}>
            <div className="text-xs uppercase tracking-widest text-primary mb-3">О враче</div>
            <h2 className="text-3xl md:text-5xl">
              Бабиков Валерий <span className="italic">Геннадьевич</span>
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Врач психиатр-нарколог. Практика — с 2004 года, общий стаж более 30 лет.
            </p>

            <div className="mt-8 space-y-5 text-foreground/85 leading-relaxed">
              <p>
                Ко мне приходят люди в очень разных состояниях — и те, кто уже принял решение, и
                те, кто ещё сомневается. Моя задача — не давить, а помочь спокойно разобраться и
                выбрать метод, который подойдёт именно вам.
              </p>
              <p>
                Приём анонимный и амбулаторный. Заключается официальный договор на оказание
                медицинских услуг, вы получаете чек об оплате, свидетельство о лечении и, при
                необходимости, справку для работы.
              </p>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {[
                { icon: FileText, text: "Официальный договор и чек" },
                { icon: Lock, text: "Полная конфиденциальность" },
                { icon: Sparkles, text: "Индивидуальный подбор метода" },
                { icon: Award, text: "Свидетельство и справка" },
              ].map((f) => (
                <div
                  key={f.text}
                  className="flex items-center gap-3 rounded-2xl bg-surface p-4 border border-border/60"
                >
                  <div className="grid place-items-center h-9 w-9 shrink-0 rounded-full bg-primary-soft text-primary">
                    <f.icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <div className="text-sm">{f.text}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      n: "01",
      title: "Звонок или заявка",
      text: "Свяжитесь с нами по телефону или через форму — консультация по звонку бесплатна и ни к чему не обязывает.",
    },
    {
      n: "02",
      title: "Очная консультация",
      text: "Приходите один или с близкими. Врач подбирает индивидуальную программу с учётом вашей ситуации.",
    },
    {
      n: "03",
      title: "Договор и лечение",
      text: "Заключаем официальный договор. Лечение проходит анонимно и амбулаторно, без госпитализации.",
    },
    {
      n: "04",
      title: "Документы",
      text: "Выдаём свидетельство о лечении и, при необходимости, справку на работу и чек об оплате.",
    },
  ];
  return (
    <section id="process" className="py-20 md:py-28 bg-surface/60">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-primary mb-3">Как проходит</div>
            <h2 className="text-3xl md:text-5xl">
              Спокойно, <span className="italic">по шагам</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">
              Никакой спешки и лишних формальностей. Вы всегда знаете, что происходит на каждом
              этапе.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="relative rounded-3xl bg-card border border-border/60 p-7 h-full hover:shadow-[var(--shadow-card)] hover:-translate-y-0.5 transition-all">
                <div className="font-display text-4xl text-primary/80">{s.n}</div>
                <h3 className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Booking (date + slot picker OR direct call) ---------- */

const WEEKDAYS = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const SLOTS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

function buildDays(count = 10) {
  const out: { date: Date; isSunday: boolean }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push({ date: d, isSunday: d.getDay() === 0 });
  }
  return out;
}

function formatDateLong(d: Date) {
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}

function Booking() {
  const days = useMemo(() => buildDays(10), []);
  const firstAvailable = days.find((x) => !x.isSunday)?.date ?? days[0].date;
  const [selectedDate, setSelectedDate] = useState<Date>(firstAvailable);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const isSunday = selectedDate.getDay() === 0;

  return (
    <section id="booking" className="relative py-20 md:py-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(55% 55% at 85% 20%, color-mix(in oklab, var(--primary) 9%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-primary mb-3">Запись</div>
            <h2 className="text-3xl md:text-5xl">
              Выберите удобное <span className="italic">время</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">
              Два равнозначных способа — выберите слот на сайте или позвоните напрямую. Приём Пн–Сб
              10:00–18:00, воскресенье — выходной.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          {/* Variant A — pick a slot */}
          <Reveal delay={60}>
            <div className="lg:col-span-3 rounded-3xl bg-card border border-border/60 p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="grid place-items-center h-10 w-10 rounded-full bg-primary-soft text-primary">
                  <Calendar className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Вариант А
                  </div>
                  <div className="font-display text-xl">Записаться на конкретное время</div>
                </div>
              </div>

              {sent ? (
                <div className="mt-8 rounded-2xl bg-primary-soft text-primary p-6">
                  <div className="font-display text-lg text-primary">Заявка отправлена</div>
                  <p className="mt-2 text-sm text-primary/90">
                    Заявка на{" "}
                    <b>
                      {formatDateLong(selectedDate)}, {selectedSlot}
                    </b>{" "}
                    отправлена. Мы перезвоним для подтверждения записи.
                  </p>
                  <button
                    className="mt-4 text-sm underline text-primary"
                    onClick={() => {
                      setSent(false);
                      setSelectedSlot(null);
                    }}
                  >
                    Записаться ещё
                  </button>
                </div>
              ) : (
                <>
                  {/* Day picker */}
                  <div className="mt-6">
                    <div className="text-xs text-muted-foreground mb-3">Выберите день</div>
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                      {days.map(({ date, isSunday }) => {
                        const isSelected =
                          date.toDateString() === selectedDate.toDateString();
                        return (
                          <button
                            key={date.toISOString()}
                            disabled={isSunday}
                            onClick={() => {
                              setSelectedDate(date);
                              setSelectedSlot(null);
                            }}
                            className={[
                              "shrink-0 min-w-[64px] rounded-2xl border px-3 py-3 text-center transition-all",
                              isSunday
                                ? "border-border/40 text-muted-foreground/50 bg-surface/40 cursor-not-allowed line-through"
                                : isSelected
                                  ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-card)]"
                                  : "border-border bg-surface hover:border-primary/50",
                            ].join(" ")}
                            title={isSunday ? "Воскресенье — выходной" : undefined}
                          >
                            <div className="text-[11px] uppercase opacity-80">
                              {WEEKDAYS[date.getDay()]}
                            </div>
                            <div className="font-display text-xl leading-tight">
                              {date.getDate()}
                            </div>
                            <div className="text-[10px] opacity-70">
                              {date.toLocaleDateString("ru-RU", { month: "short" })}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Slot picker */}
                  <div className="mt-6">
                    <div className="text-xs text-muted-foreground mb-3">
                      {isSunday
                        ? "Воскресенье — выходной, выберите другой день"
                        : `Доступное время на ${formatDateLong(selectedDate)}`}
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {SLOTS.map((slot) => {
                        const disabled = isSunday;
                        const active = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            disabled={disabled}
                            onClick={() => setSelectedSlot(slot)}
                            className={[
                              "rounded-xl border py-2.5 text-sm transition-all",
                              disabled
                                ? "border-border/40 text-muted-foreground/40 bg-surface/40 cursor-not-allowed"
                                : active
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border bg-surface hover:border-primary/50",
                            ].join(" ")}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!selectedSlot) return;
                      setSent(true);
                    }}
                    className="mt-8 space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-xs text-muted-foreground">Как к вам обращаться</span>
                        <input
                          required
                          type="text"
                          maxLength={80}
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition"
                          placeholder="Имя"
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs text-muted-foreground">Телефон</span>
                        <input
                          required
                          type="tel"
                          maxLength={20}
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition"
                          placeholder="+7 ___ ___ __ __"
                        />
                      </label>
                    </div>

                    <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
                      <input
                        required
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-input accent-[var(--primary)]"
                      />
                      <span>
                        Я согласен на обработку персональных данных в соответствии с политикой
                        конфиденциальности.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={!selectedSlot || isSunday}
                      className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                    >
                      {selectedSlot
                        ? `Записаться на ${formatDateLong(selectedDate)}, ${selectedSlot}`
                        : "Выберите время выше"}
                    </button>
                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                      Запись предварительная — администратор перезвонит и подтвердит слот.
                    </p>
                  </form>
                </>
              )}
            </div>
          </Reveal>

          {/* Variant B — call directly */}
          <Reveal delay={140}>
            <div className="lg:col-span-2 h-full rounded-3xl bg-primary text-primary-foreground p-6 md:p-8 relative overflow-hidden flex flex-col">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary-foreground/10 blur-3xl" />
              <div className="relative flex items-center gap-3">
                <div className="grid place-items-center h-10 w-10 rounded-full bg-primary-foreground/15">
                  <PhoneCall className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-primary-foreground/70">
                    Вариант Б
                  </div>
                  <div className="font-display text-xl">Позвонить напрямую</div>
                </div>
              </div>

              <p className="relative mt-5 text-primary-foreground/85 text-sm leading-relaxed">
                Быстрее всего — просто позвонить. Ответит сам врач или администратор, разговор
                конфиденциальный и ни к чему не обязывает.
              </p>

              <div className="relative mt-6 space-y-3 flex-1">
                <a
                  href={`tel:${PHONE_MAIN_TEL}`}
                  className="flex items-center gap-4 rounded-2xl bg-primary-foreground/10 hover:bg-primary-foreground/15 border border-primary-foreground/15 p-4 transition-colors"
                >
                  <Phone className="h-5 w-5 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-widest text-primary-foreground/70">
                      Клиника
                    </div>
                    <div className="font-display text-xl md:text-2xl">{PHONE_MAIN}</div>
                  </div>
                </a>
                <a
                  href={`tel:${PHONE_MOB_TEL}`}
                  className="flex items-center gap-4 rounded-2xl bg-primary-foreground/10 hover:bg-primary-foreground/15 border border-primary-foreground/15 p-4 transition-colors"
                >
                  <Phone className="h-5 w-5 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-widest text-primary-foreground/70">
                      Мобильный
                    </div>
                    <div className="font-display text-xl md:text-2xl">{PHONE_MOB}</div>
                  </div>
                </a>
              </div>

              <div className="relative mt-6 flex items-center gap-2 text-xs text-primary-foreground/70">
                <Clock className="h-4 w-4" /> Пн–Сб 10:00–18:00, вс — выходной
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- License gallery with lightbox ---------- */

const LICENSES = [
  { src: license2.url, title: "Лицензия № ЛО-55-01-001182" },
  { src: license3.url, title: "Приложение к лицензии" },
  { src: license4.url, title: "Санитарно-эпидемиологическое заключение" },
  { src: license5.url, title: "Диплом о переподготовке (психотерапия)" },
  { src: license6.url, title: "Приложение к диплому (психотерапия)" },
  { src: license7.url, title: "Сертификат — психотерапия" },
  { src: license8.url, title: "Диплом о переподготовке (психиатрия-наркология)" },
  { src: license9.url, title: "Приложение к диплому (психиатрия-наркология)" },
  { src: license10.url, title: "Сертификат — наркология" },
  { src: license11.url, title: "Свидетельство ФНС о регистрации ИП" },
];

function LicenseGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? i : (i + 1) % LICENSES.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + LICENSES.length) % LICENSES.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  return (
    <section id="license" className="py-20 md:py-28 bg-surface/60">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-primary mb-3">
              Лицензии и документы
            </div>
            <h2 className="text-3xl md:text-5xl">
              Работаем официально <span className="italic">с 2004 года</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">
              Медицинская лицензия № ЛО-55-01-001182, выданная Министерством здравоохранения Омской
              области. Ниже — сканы действующих документов и дипломов врача.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {LICENSES.map((doc, i) => (
            <Reveal key={doc.src} delay={i * 40}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group block w-full text-left rounded-2xl bg-card border border-border/60 overflow-hidden hover:border-primary/40 hover:shadow-[var(--shadow-card)] hover:-translate-y-0.5 transition-all"
              >
                <div className="aspect-[3/4] overflow-hidden bg-surface">
                  <img
                    src={doc.src}
                    alt={doc.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <div className="text-xs text-muted-foreground line-clamp-2">{doc.title}</div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Guarantees */}
        <Reveal>
          <div className="mt-12 rounded-3xl border border-border/60 bg-card p-6 md:p-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: FileText, t: "Официальный договор на оказание медицинских услуг" },
              { icon: Award, t: "Свидетельство о лечении по запросу" },
              { icon: ShieldCheck, t: "Справка на работу при необходимости" },
              { icon: Sparkles, t: "Индивидуальный подбор метода лечения" },
            ].map((x) => (
              <div key={x.t} className="flex items-start gap-3">
                <div className="grid place-items-center h-9 w-9 shrink-0 rounded-full bg-primary-soft text-primary">
                  <x.icon className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <div className="text-sm text-foreground/85 leading-relaxed">{x.t}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpenIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Закрыть"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex(null);
            }}
            className="absolute top-4 right-4 grid place-items-center h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            aria-label="Предыдущий"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) =>
                i === null ? i : (i - 1 + LICENSES.length) % LICENSES.length,
              );
            }}
            className="absolute left-3 md:left-6 grid place-items-center h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            aria-label="Следующий"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i + 1) % LICENSES.length));
            }}
            className="absolute right-3 md:right-6 grid place-items-center h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className="max-w-[90vw] max-h-[88vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={LICENSES[openIndex].src}
              alt={LICENSES[openIndex].title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl bg-white"
            />
            <div className="text-white/90 text-sm text-center">
              {LICENSES[openIndex].title}{" "}
              <span className="text-white/50">
                · {openIndex + 1} / {LICENSES.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- Reviews (placeholder — replace with consented real ones) ---------- */

// NOTE FOR SITE OWNER:
// The reviews below are non-verbatim, anonymised examples inspired by common patient
// stories. They MUST be replaced with real reviews collected with explicit written
// consent from the patients before publishing on the live site.
const REVIEWS = [
  {
    tag: "Снижение веса",
    text: "За несколько месяцев работы с врачом удалось справиться с компульсивным перееданием и снизить вес. Впервые за долгое время съездила в отпуск без срывов.",
    author: "Пациентка",
  },
  {
    tag: "Алкогольная зависимость",
    text: "Спустя пять лет после лечения пишу слова благодарности. Всё это время сохраняю трезвость, переехал в другой город, создал семью.",
    author: "Пациент",
  },
  {
    tag: "Игровая зависимость близкого",
    text: "Обратилась из-за игромании сына. Помогли не только ему — мне тоже подсказали, как выстроить границы и справляться с последствиями зависимости в семье.",
    author: "Родственница пациента",
  },
  {
    tag: "Тревожность",
    text: "Спокойный, предметный подход — без «лишней воды» и без давления. Постепенно вернулись сон и работоспособность.",
    author: "Пациентка",
  },
];

function Reviews() {
  return (
    <section id="reviews" className="py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-primary mb-3">Отзывы</div>
            <h2 className="text-3xl md:text-5xl">
              Что говорят <span className="italic">пациенты и близкие</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-sm">
              Примеры типичных обращений — реальные отзывы будут опубликованы с письменного
              согласия пациентов.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.tag} delay={i * 60}>
              <figure className="h-full rounded-3xl bg-card border border-border/60 p-7 md:p-8 flex flex-col hover:shadow-[var(--shadow-card)] transition-shadow">
                <div className="flex items-center justify-between">
                  <Quote className="h-6 w-6 text-primary/60" />
                  <span className="text-[11px] uppercase tracking-widest text-primary bg-primary-soft rounded-full px-3 py-1">
                    {r.tag}
                  </span>
                </div>
                <blockquote className="mt-5 text-foreground/85 leading-relaxed flex-1 text-[1.02rem]">
                  {r.text}
                </blockquote>
                <figcaption className="mt-6 text-sm text-muted-foreground">— {r.author}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const PRICES = [
  { name: "Первичная консультация врача", price: "от 2 500 ₽" },
  { name: "Кодирование от алкоголизма", price: "от 6 000 ₽" },
  { name: "Выведение из запоя (амбулаторно)", price: "от 4 500 ₽" },
  { name: "Кодирование от курения", price: "от 4 000 ₽" },
  { name: "Кодирование от избыточного веса", price: "от 5 000 ₽" },
  { name: "Психотерапия (сеанс)", price: "от 3 000 ₽" },
];

function Prices() {
  return (
    <section id="prices" className="py-20 md:py-28 bg-surface/60">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-primary mb-3">Цены</div>
            <h2 className="text-3xl md:text-5xl">
              Прозрачная <span className="italic">стоимость</span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-foreground/80 leading-relaxed">
              <b>Ориентировочные цены</b> — актуальную стоимость уточняйте на консультации. Итоговая
              сумма зависит от подобранной программы и вашей ситуации.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 rounded-3xl border border-border/60 bg-card overflow-hidden">
          {PRICES.map((p, i) => (
            <div
              key={p.name}
              className={`flex items-center justify-between gap-6 px-6 md:px-10 py-6 ${
                i !== 0 ? "border-t border-border/60" : ""
              }`}
            >
              <div className="text-base md:text-lg">{p.name}</div>
              <div className="font-display text-lg md:text-xl text-primary shrink-0">{p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section id="contacts" className="py-20 md:py-28">
      <div className="container-page grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <div className="text-xs uppercase tracking-widest text-primary mb-3">Контакты</div>
            <h2 className="text-3xl md:text-5xl">
              Как нас <span className="italic">найти</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">
              Приём — в центре Омска, по предварительной записи. Позвоните или запишитесь через
              блок выше.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 rounded-2xl bg-card p-5 border border-border/60">
                <div className="grid place-items-center h-11 w-11 rounded-full bg-primary-soft text-primary shrink-0">
                  <Phone className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">Телефон клиники</div>
                  <a
                    href={`tel:${PHONE_MAIN_TEL}`}
                    className="font-display text-xl hover:text-primary transition-colors block"
                  >
                    {PHONE_MAIN}
                  </a>
                  <a
                    href={`tel:${PHONE_MOB_TEL}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    моб. {PHONE_MOB}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl bg-card p-5 border border-border/60">
                <div className="grid place-items-center h-11 w-11 rounded-full bg-primary-soft text-primary shrink-0">
                  <MapPin className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">Адрес</div>
                  <div className="text-base">г. Омск, ул. Стачечная, 6</div>
                  <div className="text-sm text-muted-foreground">
                    центр города, остановка «Пл. Ленина»
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="mailto:bvg.omsk@mail.ru"
                  className="flex items-center gap-3 rounded-2xl bg-card p-5 border border-border/60"
                >
                  <div className="grid place-items-center h-10 w-10 rounded-full bg-primary-soft text-primary shrink-0">
                    <Mail className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="text-sm truncate">bvg.omsk@mail.ru</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 rounded-2xl bg-card p-5 border border-border/60">
                  <div className="grid place-items-center h-10 w-10 rounded-full bg-primary-soft text-primary shrink-0">
                    <Clock className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">Режим работы</div>
                    <div className="text-sm">Пн–Сб 10:00–18:00</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={80}>
            <div className="rounded-3xl overflow-hidden border border-border/60 aspect-[4/5] lg:aspect-auto lg:h-full bg-card">
              <iframe
                title="Карта клиники"
                src="https://yandex.ru/map-widget/v1/?ll=73.368200%2C54.984200&z=16&pt=73.368200,54.984200,pm2rdm"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="container-page grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid place-items-center h-9 w-9 rounded-full bg-primary text-primary-foreground font-display">
              Б
            </div>
            <div className="font-display text-lg">Клиника Бабикова</div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Психотерапия и наркология в Омске. Анонимно, амбулаторно, с 2004 года.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">Лицензия № ЛО-55-01-001182</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Услуги
          </div>
          <ul className="space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.title}>
                <a href="#services" className="hover:text-primary transition-colors">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Контакты
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`tel:${PHONE_MAIN_TEL}`} className="hover:text-primary transition-colors">
                {PHONE_MAIN}
              </a>
            </li>
            <li>
              <a href={`tel:${PHONE_MOB_TEL}`} className="hover:text-primary transition-colors">
                {PHONE_MOB}
              </a>
            </li>
            <li>
              <a href="mailto:bvg.omsk@mail.ru" className="hover:text-primary transition-colors">
                bvg.omsk@mail.ru
              </a>
            </li>
            <li className="text-muted-foreground">г. Омск, ул. Стачечная, 6</li>
            <li className="text-muted-foreground">Пн–Сб 10:00–18:00</li>
          </ul>
        </div>
      </div>
      <div className="container-page mt-10 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Клиника Бабикова. Все права защищены.</div>
        <a href="#" className="hover:text-primary">
          Политика конфиденциальности
        </a>
      </div>
    </footer>
  );
}

function StickyMobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md">
      <div className="grid grid-cols-2 gap-2 p-3">
        <a
          href={`tel:${PHONE_MAIN_TEL}`}
          className="flex items-center justify-center gap-2 rounded-full border border-border bg-surface py-3 text-sm font-medium"
        >
          <Phone className="h-4 w-4" /> Позвонить
        </a>
        <a
          href="#booking"
          className="flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-3 text-sm font-medium"
        >
          <Calendar className="h-4 w-4" /> Записаться
        </a>
      </div>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />
      <main>
        <Hero />
        <Services />
        <Doctor />
        <Process />
        <Booking />
        <LicenseGallery />
        <Reviews />
        <Prices />
        <Contacts />
      </main>
      <Footer />
      <StickyMobileBar />
    </div>
  );
}

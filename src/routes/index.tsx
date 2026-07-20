import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import doctorAsset from "@/assets/doctor-babikov.png.asset.json";
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
  Quote,
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
          "Анонимная амбулаторная помощь: алкогольная, никотиновая, игровая зависимость, кодирование, лечение неврозов и депрессий.",
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
  { href: "#license", label: "Лицензии" },
  { href: "#contacts", label: "Контакты" },
];

const PHONE_MAIN = "+7 (3812) 51-82-56";
const PHONE_MAIN_TEL = "+73812518256";
const PHONE_MOB = "+7 (913) 651-82-56";
const PHONE_MOB_TEL = "+79136518256";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
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
          <a href="#contacts" className="btn-primary hidden sm:inline-flex text-sm">
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
              <a href="#contacts" onClick={() => setOpen(false)} className="btn-primary">
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
      <div className="container-page pt-14 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Частная практика в Омске с 2004 года
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-foreground">
            Помощь в трезвости,{" "}
            <span className="italic text-primary">спокойствии</span>
            <br className="hidden sm:block" /> и возвращении к жизни
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Психиатр-нарколог Бабиков Валерий Геннадьевич, стаж более 30 лет. Анонимный
            амбулаторный приём по предварительной записи — для вас и ваших близких.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contacts" className="btn-primary">
              Записаться на консультацию
            </a>
            <a href={`tel:${PHONE_MAIN_TEL}`} className="btn-ghost">
              <Phone className="h-4 w-4" /> {PHONE_MAIN}
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            {[
              { icon: Clock, title: "с 2004 года", sub: "20+ лет практики" },
              { icon: Lock, title: "Полная анонимность", sub: "без учёта и огласки" },
              { icon: Award, title: "Лицензия", sub: "№ ЛО-55-01-001182" },
            ].map((t) => (
              <div
                key={t.title}
                className="flex items-start gap-3 rounded-2xl bg-card p-4 border border-border/60"
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
        </div>

        <div className="lg:col-span-5 fade-up" style={{ animationDelay: "120ms" }}>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary-soft/60 blur-2xl -z-10" />
            <div className="relative rounded-[2rem] overflow-hidden bg-card border border-border/60 shadow-[var(--shadow-card)]">
              <img
                src={doctorAsset.url}
                alt="Бабиков Валерий Геннадьевич — врач психиатр-нарколог"
                className="w-full h-auto object-cover aspect-[4/5]"
                loading="eager"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/55 to-transparent">
                <div className="text-white/95 font-display text-lg leading-tight">
                  Бабиков В. Г.
                </div>
                <div className="text-white/80 text-xs">психиатр-нарколог · 30+ лет практики</div>
              </div>
            </div>
          </div>
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
              <article className="group h-full rounded-3xl bg-card border border-border/60 p-7 hover:border-primary/30 hover:shadow-[var(--shadow-card)] transition-all">
                <div className="grid place-items-center h-12 w-12 rounded-2xl bg-primary-soft text-primary mb-6">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                <a
                  href="#contacts"
                  className="mt-6 inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all"
                >
                  Подробнее <ChevronRight className="h-4 w-4" />
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
    <section id="doctor" className="py-20 md:py-28">
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
                    <f.icon className="h-4 w-4" />
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
              <div className="relative rounded-3xl bg-card border border-border/60 p-7 h-full">
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

function License() {
  return (
    <section id="license" className="py-20 md:py-28">
      <div className="container-page">
        <div className="rounded-[2rem] bg-primary text-primary-foreground p-8 md:p-14 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-foreground/5 blur-3xl" />
          <div className="grid lg:grid-cols-12 gap-10 items-center relative">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="text-xs uppercase tracking-widest text-primary-foreground/70 mb-3">
                  Лицензия и документы
                </div>
                <h2 className="text-3xl md:text-5xl text-primary-foreground">
                  Работаем официально <span className="italic">с 2004 года</span>
                </h2>
                <p className="mt-5 text-primary-foreground/80 max-w-lg text-lg">
                  Все услуги оказываются на основании действующей медицинской лицензии. Договор,
                  чек и медицинские документы — обязательная часть работы.
                </p>
                <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/15 px-5 py-4">
                  <Award className="h-5 w-5" />
                  <div>
                    <div className="text-xs text-primary-foreground/70">Номер лицензии</div>
                    <div className="font-display text-xl">№ ЛО-55-01-001182</div>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Lock, t: "Анонимность" },
                    { icon: FileText, t: "Договор" },
                    { icon: ShieldCheck, t: "Гарантии" },
                    { icon: Award, t: "Документы" },
                  ].map((x) => (
                    <div
                      key={x.t}
                      className="rounded-2xl bg-primary-foreground/8 border border-primary-foreground/15 p-5"
                    >
                      <x.icon className="h-5 w-5 mb-3 opacity-90" />
                      <div className="text-sm text-primary-foreground/90">{x.t}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  {
    name: "Ирина М.",
    text: "Обратилась ради мужа — сама не верила, что удастся его уговорить. Валерий Геннадьевич поговорил с ним спокойно, без давления. Прошёл год трезвости.",
  },
  {
    name: "Алексей П.",
    text: "Приходил лечиться сам. Впервые за долгое время меня не читали нотаций. Всё понятно, по-человечески, с конкретной программой.",
  },
  {
    name: "Наталья В.",
    text: "Спасибо за помощь маме. Приняли очень тактично, сохранили полную анонимность. Есть с чем сравнивать — обращались до этого в другие места.",
  },
  {
    name: "Дмитрий К.",
    text: "Кодирование от курения — прошло почти два года, не тянет. До этого пробовал всё, что только можно.",
  },
  {
    name: "Ольга Т.",
    text: "Пришла с тревогой и бессонницей. Постепенно вернулась к нормальному сну и работе. Ощущение, что тебя действительно слышат.",
  },
  {
    name: "Сергей Л.",
    text: "Помог отцу выйти из запоя дома, без больницы. Всё аккуратно, спокойно, потом — рекомендации, как жить дальше.",
  },
];

function Reviews() {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-surface/60">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-primary mb-3">Отзывы</div>
            <h2 className="text-3xl md:text-5xl">
              Что говорят <span className="italic">пациенты и близкие</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 60}>
              <figure className="h-full rounded-3xl bg-card border border-border/60 p-7 flex flex-col">
                <Quote className="h-6 w-6 text-primary/60 mb-4" />
                <blockquote className="text-foreground/85 leading-relaxed flex-1">
                  {r.text}
                </blockquote>
                <figcaption className="mt-6 text-sm text-muted-foreground">— {r.name}</figcaption>
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
    <section id="prices" className="py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-primary mb-3">Цены</div>
            <h2 className="text-3xl md:text-5xl">
              Прозрачная <span className="italic">стоимость</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">
              Итоговая стоимость определяется на консультации — после того как врач подберёт
              программу под вашу ситуацию.
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
  const [sent, setSent] = useState(false);
  return (
    <section id="contacts" className="py-20 md:py-28 bg-surface/60">
      <div className="container-page grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <div className="text-xs uppercase tracking-widest text-primary mb-3">Контакты</div>
            <h2 className="text-3xl md:text-5xl">
              Запишитесь <span className="italic">на консультацию</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">
              Оставьте телефон — перезвоним в удобное время. Разговор конфиденциальный, ни к чему
              не обязывает.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`tel:${PHONE_MAIN_TEL}`}
                className="flex items-start gap-4 rounded-2xl bg-card p-5 border border-border/60 hover:border-primary/30 transition-colors"
              >
                <div className="grid place-items-center h-11 w-11 rounded-full bg-primary-soft text-primary shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">Телефон клиники</div>
                  <div className="font-display text-xl">{PHONE_MAIN}</div>
                  <a href={`tel:${PHONE_MOB_TEL}`} className="text-sm text-muted-foreground">
                    моб. {PHONE_MOB}
                  </a>
                </div>
              </a>
              <div className="flex items-start gap-4 rounded-2xl bg-card p-5 border border-border/60">
                <div className="grid place-items-center h-11 w-11 rounded-full bg-primary-soft text-primary shrink-0">
                  <MapPin className="h-5 w-5" />
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
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="text-sm truncate">bvg.omsk@mail.ru</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 rounded-2xl bg-card p-5 border border-border/60">
                  <div className="grid place-items-center h-10 w-10 rounded-full bg-primary-soft text-primary shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">Режим работы</div>
                    <div className="text-sm">Пн–Сб 10:00–18:00</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl overflow-hidden border border-border/60 aspect-[16/10] bg-card">
              <iframe
                title="Карта клиники"
                src="https://yandex.ru/map-widget/v1/?ll=73.368200%2C54.984200&z=16&pt=73.368200,54.984200,pm2rdm"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={80}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="rounded-3xl bg-card border border-border/60 p-7 md:p-10"
            >
              <h3 className="text-2xl md:text-3xl">Перезвоните мне</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Заполните два поля — свяжемся в течение рабочего дня.
              </p>

              {sent ? (
                <div className="mt-8 rounded-2xl bg-primary-soft text-primary p-6 text-sm">
                  Спасибо. Мы обязательно перезвоним вам.
                </div>
              ) : (
                <div className="mt-8 space-y-4">
                  <label className="block">
                    <span className="text-xs text-muted-foreground">Как к вам обращаться</span>
                    <input
                      required
                      type="text"
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition"
                      placeholder="Имя"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted-foreground">Телефон</span>
                    <input
                      required
                      type="tel"
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition"
                      placeholder="+7 ___ ___ __ __"
                    />
                  </label>
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
                  <button type="submit" className="btn-primary w-full mt-2">
                    Перезвоните мне
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    Или позвоните напрямую:{" "}
                    <a href={`tel:${PHONE_MAIN_TEL}`} className="text-primary underline">
                      {PHONE_MAIN}
                    </a>
                  </p>
                </div>
              )}
            </form>
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
            {SERVICES.slice(0, 6).map((s) => (
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

function StickyCTA() {
  return (
    <a
      href="#contacts"
      className="fixed bottom-5 right-5 z-40 btn-primary shadow-[var(--shadow-card)] md:hidden"
      aria-label="Записаться"
    >
      <Phone className="h-4 w-4" /> Записаться
    </a>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Services />
        <Doctor />
        <Process />
        <License />
        <Reviews />
        <Prices />
        <Contacts />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}

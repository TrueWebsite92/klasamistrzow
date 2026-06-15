import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Gem,
  HeartHandshake,
  LayoutDashboard,
  Menu,
  MessageCircle,
  PanelsTopLeft,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  UserRound,
  WalletCards,
  WandSparkles,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { KlasaMistrzowLogo } from "./klasa-mistrzow-logo";

const navigation = [
  { label: "Strefa maturzysty", href: "#matura" },
  { label: "Strefa ósmoklasisty", href: "#osmoklasista" },
  { label: "Sklep", href: "#sklep" },
  { label: "Darmowe materiały", href: "#darmowe" },
  { label: "Korepetycje", href: "#korepetycje" },
  { label: "Strefa ucznia", href: "#strefa-ucznia" },
];

const heroModes = [
  {
    key: "warsztat",
    label: "Warsztat",
    title: "Lalka pod klucz",
    meta: "Dziś · 18:00",
    value: "2h pracy na tekście",
  },
  {
    key: "pdf",
    label: "PDF",
    title: "Romantyzm — komplet",
    meta: "12 lekcji · 38 stron",
    value: "pobrano 74%",
  },
  {
    key: "plan",
    label: "Plan",
    title: "Powtórka do matury",
    meta: "4 kroki w tym tygodniu",
    value: "spokojny rytm",
  },
];

const workshopFeatures = [
  "2 godziny intensywnej pracy",
  "fabuła krok po kroku",
  "praca na tekście",
  "bohaterowie",
  "motywy",
  "konteksty",
  "gotowe pomysły do rozprawki",
  "materiały PDF",
  "możliwość zadawania pytań",
];

const epochs = [
  "Antyk",
  "Średniowiecze",
  "Renesans",
  "Barok",
  "Oświecenie",
  "Romantyzm",
  "Pozytywizm",
  "Młoda Polska",
  "Dwudziestolecie międzywojenne",
  "Współczesność",
];

const epochDetails = [
  "najważniejsze pojęcia",
  "motywy",
  "autorzy",
  "dzieła",
  "pytania maturalne",
];

const eighthGradeItems = [
  "omówienie lektur",
  "rozprawka",
  "opowiadanie",
  "zaproszenie",
  "ogłoszenie",
  "arkusze egzaminacyjne",
  "praktyczne ćwiczenia",
];

const products = [
  {
    title: "Lalka pod klucz",
    description: "Fabuła, bohaterowie, konteksty i gotowe tropy do rozprawki.",
    tone: "bg-[#FFF5D7]",
  },
  {
    title: "Dziady III pod klucz",
    description: "Motywy, symbole, sceny i interpretacje bez chaosu.",
    tone: "bg-[#EFEAFF]",
  },
  {
    title: "Chłopi pod klucz",
    description: "Plan pracy z lekturą, konteksty epoki i najważniejsze problemy.",
    tone: "bg-[#EAF2FF]",
  },
  {
    title: "Przedwiośnie pod klucz",
    description: "Szybka powtórka, która porządkuje fabułę i idee utworu.",
    tone: "bg-[#F8E8DF]",
  },
  {
    title: "Egzamin ósmoklasisty – komplet",
    description: "Lektury, formy wypowiedzi i praktyczne arkusze w jednym pakiecie.",
    tone: "bg-[#E8F7EF]",
  },
  {
    title: "Inne lektury",
    description: "Biblioteka materiałów PDF rozwijana zgodnie z potrzebami uczniów.",
    tone: "bg-[#F3F0EA]",
  },
];

const freeBenefits = [
  "dostęp po założeniu bezpłatnego konta",
  "materiały PDF do pobrania",
  "edukacyjne wskazówki bez akademickiego żargonu",
  "prosta ścieżka przejścia do pełnych materiałów",
];

const tutoringBenefits = [
  "lekcje online w spokojnym, konkretnym rytmie",
  "elastyczne terminy dopasowane do szkoły i próbnych egzaminów",
  "przygotowanie do matury i egzaminu ósmoklasisty",
  "indywidualny plan nauki bez przypadkowych tematów",
];

const dashboardTabs = [
  {
    label: "Moje kursy",
    icon: PanelsTopLeft,
    title: "Plan powtórek pod kontrolą",
    description: "Warsztaty, kursy i lekcje ułożone w czytelną ścieżkę działania.",
  },
  {
    label: "Materiały PDF",
    icon: WalletCards,
    title: "Biblioteka materiałów premium",
    description: "Notatki, checklisty i omówienia zawsze pod ręką — bez szukania w mailach.",
  },
  {
    label: "Korepetycje",
    icon: UserRound,
    title: "Wsparcie wtedy, gdy naprawdę go potrzebujesz",
    description: "Nadchodzące terminy, historia lekcji i rekomendowane kroki po spotkaniu.",
  },
];

const timeSlots = ["16:00", "17:30", "19:00", "20:15"];

const SectionIntro = ({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
}) => (
  <div className={cn("mx-auto max-w-3xl", align === "center" ? "text-center" : "text-left")}>
    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E7C873]/50 bg-white/55 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#6D5DE8] shadow-sm backdrop-blur">
      <Sparkles className="h-3.5 w-3.5" />
      {eyebrow}
    </p>
    <h2 className="font-serif text-4xl font-semibold tracking-[-0.055em] text-[#1E293B] sm:text-5xl lg:text-6xl">
      {title}
    </h2>
    <p className="mt-5 text-base leading-8 text-[#526174] sm:text-lg">{description}</p>
  </div>
);

const PremiumButton = ({ children, href, variant = "primary" }: { children: string; href: string; variant?: "primary" | "light" | "ghost" }) => (
  <Button
    asChild
    className={cn(
      "group h-12 rounded-full px-6 text-sm font-bold tracking-[-0.01em] shadow-[0_16px_38px_rgba(124,108,246,0.22)] transition-all duration-300 hover:-translate-y-0.5",
      variant === "primary" && "bg-[#7C6CF6] text-white hover:bg-[#6655EA]",
      variant === "light" && "border border-[#1E293B]/10 bg-white/80 text-[#1E293B] shadow-[0_16px_38px_rgba(30,41,59,0.08)] hover:bg-white",
      variant === "ghost" && "bg-[#1E293B] text-white hover:bg-[#172033]",
    )}
  >
    <a href={href}>
      {children}
      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  </Button>
);

const SiteHeader = () => (
  <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
    <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-[#FAF7F2]/78 px-4 py-3 shadow-[0_20px_80px_rgba(30,41,59,0.1)] backdrop-blur-2xl sm:px-5">
      <KlasaMistrzowLogo />
      <nav className="hidden items-center gap-1 lg:flex">
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full px-3.5 py-2 text-sm font-semibold text-[#425069] transition-colors hover:bg-white/70 hover:text-[#7C6CF6]"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="hidden items-center gap-3 lg:flex">
        <Button asChild className="rounded-full bg-[#1E293B] px-5 text-white hover:bg-[#172033]">
          <a href="#strefa-ucznia">Zaloguj się</a>
        </Button>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full bg-white/70 text-[#1E293B] lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Otwórz menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="border-l border-white/70 bg-[#FAF7F2]">
          <SheetHeader>
            <SheetTitle className="text-left">
              <KlasaMistrzowLogo />
            </SheetTitle>
          </SheetHeader>
          <div className="mt-10 grid gap-3">
            {navigation.map((item) => (
              <SheetClose asChild key={item.href}>
                <a
                  href={item.href}
                  className="rounded-2xl border border-[#1E293B]/10 bg-white/65 px-4 py-4 text-base font-semibold text-[#1E293B] shadow-sm"
                >
                  {item.label}
                </a>
              </SheetClose>
            ))}
            <SheetClose asChild>
              <a href="#strefa-ucznia" className="mt-3 rounded-full bg-[#7C6CF6] px-5 py-4 text-center font-bold text-white shadow-xl">
                Zaloguj się
              </a>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </header>
);

const AbstractAurora = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute left-[-10%] top-16 h-80 w-80 rounded-full bg-[#E7C873]/28 blur-3xl" />
    <div className="absolute right-[-14%] top-28 h-96 w-96 rounded-full bg-[#7C6CF6]/20 blur-3xl" />
    <div className="absolute bottom-10 left-[40%] h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl" />
    <div className="absolute left-[8%] top-[28%] hidden h-20 w-20 rotate-45 rounded-[2rem] border border-[#7C6CF6]/20 bg-white/25 backdrop-blur md:block" />
    <div className="absolute right-[11%] top-[18%] hidden h-16 w-16 rounded-full border border-[#E7C873]/55 bg-white/25 backdrop-blur md:block" />
  </div>
);

const HeroDashboard = () => {
  const [active, setActive] = useState(heroModes[0]);

  return (
    <div className="relative mx-auto mt-12 w-full max-w-xl lg:mt-0">
      <div className="absolute -left-5 top-10 h-24 w-24 rounded-[2rem] bg-[#E7C873]/45 blur-2xl" />
      <div className="absolute -right-8 bottom-10 h-36 w-36 rounded-full bg-[#7C6CF6]/25 blur-2xl" />
      <div className="premium-card reveal relative overflow-hidden rounded-[2rem] border border-white/75 bg-white/64 p-4 shadow-[0_36px_100px_rgba(30,41,59,0.18)] backdrop-blur-2xl sm:p-5">
        <div className="rounded-[1.55rem] bg-[#1E293B] p-5 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E7C873]">Panel ucznia</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold tracking-[-0.04em]">Spokojna droga do wyniku</h3>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
              <LayoutDashboard className="h-5 w-5 text-[#E7C873]" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 rounded-full bg-white/8 p-1">
            {heroModes.map((mode) => (
              <button
                key={mode.key}
                onClick={() => setActive(mode)}
                className={cn(
                  "rounded-full px-3 py-2 text-xs font-bold transition-all duration-300",
                  active.key === mode.key ? "bg-white text-[#1E293B] shadow-lg" : "text-white/70 hover:text-white",
                )}
              >
                {mode.label}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-[1.12fr_0.88fr]">
            <div className="rounded-[1.35rem] bg-white p-4 text-[#1E293B]">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#EAF2FF] px-3 py-1 text-xs font-bold text-[#6D5DE8]">Nadchodzące</span>
                <Clock3 className="h-4 w-4 text-[#7C6CF6]" />
              </div>
              <h4 className="mt-5 text-xl font-bold tracking-[-0.04em]">{active.title}</h4>
              <p className="mt-2 text-sm text-[#64748B]">{active.meta}</p>
              <div className="mt-5 h-2 rounded-full bg-[#EEF2F6]">
                <div className="h-full w-[72%] rounded-full bg-[#7C6CF6]" />
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[#7C6CF6]">{active.value}</p>
            </div>
            <div className="grid gap-3">
              <div className="rounded-[1.25rem] bg-[#EAF2FF] p-4 text-[#1E293B]">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#526174]">PDF</p>
                <p className="mt-2 text-2xl font-black tracking-[-0.05em]">18</p>
                <p className="text-sm text-[#526174]">materiałów w bibliotece</p>
              </div>
              <div className="rounded-[1.25rem] bg-[#F5E7B7] p-4 text-[#1E293B]">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#526174]">Postęp</p>
                <div className="mt-3 flex items-end gap-1.5">
                  {[35, 54, 42, 72, 86].map((height, index) => (
                    <span key={index} className="w-full rounded-full bg-[#7C6CF6]" style={{ height: `${height}px` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 rounded-[1.35rem] bg-white/10 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold">Kalendarz lekcji</p>
                <p className="mt-1 text-sm text-white/62">Wtorek · konsultacja maturalna</p>
              </div>
              <span className="rounded-full bg-[#E7C873] px-3 py-1 text-xs font-black text-[#1E293B]">17:30</span>
            </div>
          </div>
        </div>
        <div className="absolute right-5 top-5 hidden rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-bold text-[#1E293B] shadow-xl backdrop-blur sm:flex">
          premium platform preview
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => (
  <section id="top" className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:pb-28 lg:pt-40">
    <AbstractAurora />
    <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.03fr_0.97fr]">
      <div className="reveal max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/60 px-4 py-2 shadow-sm backdrop-blur">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#7C6CF6] text-white">
            <Gem className="h-4 w-4" />
          </span>
          <span className="text-sm font-bold text-[#1E293B]">Premium przygotowanie do egzaminów — bez chaosu</span>
        </div>
        <h1 className="font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.07em] text-[#1E293B] sm:text-6xl lg:text-7xl xl:text-[5.65rem]">
          Kursy, warsztaty, materiały i korepetycje online z języka polskiego
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-[#526174] sm:text-xl">
          Przygotowanie do matury, egzaminu ósmoklasisty i indywidualne wsparcie w nauce — prosto, konkretnie i bez chaosu.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <PremiumButton href="#matura">Zapisz się na warsztaty</PremiumButton>
          <PremiumButton href="#sklep" variant="light">Kup materiały</PremiumButton>
          <PremiumButton href="#strefa-ucznia" variant="light">Strefa ucznia</PremiumButton>
          <PremiumButton href="#korepetycje" variant="ghost">Korepetycje indywidualne</PremiumButton>
        </div>
        <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
          {[
            ["96%", "uczniów ceni jasny plan nauki"],
            ["0 chaosu", "konkretne materiały i kroki"],
            ["premium", "opieka, kursy i PDF w jednym miejscu"],
          ].map(([value, label]) => (
            <div key={value} className="rounded-[1.5rem] border border-white/70 bg-white/54 p-4 shadow-sm backdrop-blur">
              <p className="text-2xl font-black tracking-[-0.05em] text-[#7C6CF6]">{value}</p>
              <p className="mt-1 text-sm font-medium leading-5 text-[#526174]">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <HeroDashboard />
    </div>
  </section>
);

const MaturaSection = () => {
  const [selectedEpoch, setSelectedEpoch] = useState("Romantyzm");

  return (
    <section id="matura" className="relative px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Strefa maturzysty"
          title="Nie uczysz się wszystkiego. Uczysz się tego, co naprawdę pracuje na wynik."
          description="Warsztaty i materiały porządkują lektury, epoki i argumentację tak, aby uczeń czuł kontrolę, pewność i gotowość do pisania."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="premium-card reveal rounded-[2rem] border border-white/75 bg-white/68 p-6 shadow-[0_28px_80px_rgba(30,41,59,0.1)] backdrop-blur-xl sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#7C6CF6]">Warsztaty premium</p>
                <h3 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.045em] text-[#1E293B]">Warsztaty z lektur obowiązkowych</h3>
                <p className="mt-4 text-[#526174]">Intensywne spotkania, które zamieniają lekturę w gotowy zestaw narzędzi do egzaminu.</p>
              </div>
              <span className="rounded-2xl bg-[#1E293B] p-3 text-[#E7C873]"><WandSparkles className="h-5 w-5" /></span>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {workshopFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl bg-[#FAF7F2]/75 p-3 text-sm font-semibold text-[#1E293B]">
                  <Check className="h-4 w-4 shrink-0 text-[#7C6CF6]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-6">
            <div className="premium-card reveal rounded-[2rem] bg-[#1E293B] p-6 text-white shadow-[0_28px_80px_rgba(30,41,59,0.22)] sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#E7C873]">Historia literatury pod klucz</p>
              <h3 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.045em]">6 godzin powtórki — tylko to, co najważniejsze</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {epochs.map((epoch) => (
                  <button
                    key={epoch}
                    onClick={() => setSelectedEpoch(epoch)}
                    className={cn(
                      "rounded-full border px-3 py-2 text-xs font-bold transition-all duration-300",
                      selectedEpoch === epoch
                        ? "border-[#E7C873] bg-[#E7C873] text-[#1E293B]"
                        : "border-white/15 bg-white/8 text-white/74 hover:border-white/35 hover:text-white",
                    )}
                  >
                    {epoch}
                  </button>
                ))}
              </div>
              <div className="mt-6 rounded-[1.5rem] bg-white/10 p-5">
                <p className="text-lg font-bold">{selectedEpoch}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {epochDetails.map((detail) => (
                    <span key={detail} className="flex items-center gap-2 text-sm text-white/78">
                      <Star className="h-3.5 w-3.5 text-[#E7C873]" />
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="premium-card reveal rounded-[2rem] border border-[#E7C873]/40 bg-[#FFF7DC] p-6 shadow-[0_24px_70px_rgba(231,200,115,0.18)] sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#7C6CF6]">Notatki PDF</p>
              <h3 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.045em] text-[#1E293B]">Najważniejsze epoki i lektury w jednym miejscu</h3>
              <p className="mt-4 text-[#526174]">Eleganckie, konkretne materiały do powtórek — stworzone po to, żeby skrócić drogę od stresu do pewności.</p>
              <a href="#sklep" className="mt-6 inline-flex items-center gap-2 font-bold text-[#7C6CF6]">Zobacz materiały <ChevronRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EighthGradeSection = () => (
  <section id="osmoklasista" className="px-4 py-20 sm:px-6 lg:py-28">
    <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2.5rem] border border-white/75 bg-[#EAF2FF]/75 p-6 shadow-[0_32px_100px_rgba(30,41,59,0.1)] backdrop-blur-xl sm:p-10 lg:grid-cols-[0.92fr_1.08fr]">
      <SectionIntro
        align="left"
        eyebrow="Strefa ósmoklasisty"
        title="Kurs kompleksowy, który daje poczucie prowadzenia krok po kroku."
        description="Lektury + formy wypowiedzi + przygotowanie do egzaminu — wszystko ułożone spokojnie, jasno i z myślą o realnym arkuszu."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {eighthGradeItems.map((item, index) => (
          <div key={item} className="premium-card reveal rounded-[1.55rem] border border-white/80 bg-white/76 p-5 shadow-sm backdrop-blur">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7C6CF6] font-black text-white">{index + 1}</div>
            <p className="text-lg font-bold tracking-[-0.03em] text-[#1E293B]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PdfShopSection = () => (
  <section id="sklep" className="px-4 py-20 sm:px-6 lg:py-28">
    <div className="mx-auto max-w-7xl">
      <SectionIntro
        eyebrow="Sklep z materiałami PDF"
        title="Cyfrowe materiały, które wyglądają i działają jak produkt premium."
        description="Każdy materiał prowadzi ucznia przez lekturę lub egzamin logicznie: od zrozumienia, przez zapamiętanie, aż po użycie wiedzy w wypowiedzi."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div key={product.title} className="premium-card group reveal overflow-hidden rounded-[2rem] border border-white/75 bg-white/72 p-5 shadow-[0_24px_70px_rgba(30,41,59,0.09)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(124,108,246,0.16)]">
            <div className={cn("relative h-36 overflow-hidden rounded-[1.55rem] p-5", product.tone)}>
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/45" />
              <div className="absolute bottom-5 right-5 grid h-14 w-14 place-items-center rounded-2xl bg-white/72 text-[#7C6CF6] shadow-lg">
                <ReceiptText className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#1E293B]">PDF premium</span>
            </div>
            <div className="p-2 pt-6">
              <h3 className="font-serif text-2xl font-semibold tracking-[-0.045em] text-[#1E293B]">{product.title}</h3>
              <p className="mt-3 min-h-14 text-sm leading-6 text-[#526174]">{product.description}</p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="text-lg font-black tracking-[-0.04em] text-[#1E293B]">Cena wkrótce</span>
                <Button className="rounded-full bg-[#7C6CF6] px-5 font-bold text-white hover:bg-[#6655EA]">Kup materiał</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FreeStudentZoneSection = () => (
  <section id="darmowe" className="px-4 py-20 sm:px-6 lg:py-28">
    <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2.5rem] bg-[#1E293B] p-6 text-white shadow-[0_36px_110px_rgba(30,41,59,0.24)] sm:p-10 lg:grid-cols-[1fr_0.9fr]">
      <div className="relative z-10">
        <p className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#E7C873]">Darmowa strefa ucznia</p>
        <h2 className="font-serif text-4xl font-semibold tracking-[-0.055em] sm:text-5xl lg:text-6xl">Darmowe materiały na dobry start</h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">Zbuduj pierwsze poczucie pewności bez presji zakupu — a potem naturalnie przejdź do pełnych materiałów, warsztatów lub korepetycji.</p>
        <div className="mt-8 rounded-[2rem] border border-white/15 bg-white/8 p-6 backdrop-blur">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#E7C873]">Materiał startowy</p>
          <h3 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.045em]">Jak napisać rozprawkę na 100%?</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {freeBenefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 text-sm text-white/78">
                <Check className="h-4 w-4 shrink-0 text-[#E7C873]" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
        <Button className="mt-8 rounded-full bg-[#E7C873] px-7 py-6 font-black text-[#1E293B] hover:bg-[#f0d888]">Załóż darmowe konto <ArrowRight /></Button>
      </div>
      <div className="relative min-h-[360px]">
        <div className="absolute inset-0 rounded-[2rem] bg-[#7C6CF6]/25 blur-3xl" />
        <div className="premium-card reveal relative ml-auto max-w-md rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur-2xl">
          <div className="rounded-[1.5rem] bg-[#FAF7F2] p-5 text-[#1E293B]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">Start pack</p>
                <h4 className="mt-2 text-xl font-black tracking-[-0.04em]">Rozprawka bez paniki</h4>
              </div>
              <ShieldCheck className="h-8 w-8 text-[#7C6CF6]" />
            </div>
            <div className="mt-6 space-y-3">
              {["Teza i argument", "Kontekst", "Wniosek", "Checklist PDF"].map((step, index) => (
                <div key={step} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                  <span className="font-bold">{step}</span>
                  <span className={cn("rounded-full px-3 py-1 text-xs font-black", index < 3 ? "bg-[#EAF2FF] text-[#7C6CF6]" : "bg-[#E7C873] text-[#1E293B]")}>{index < 3 ? "lekcja" : "PDF"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TutoringSection = () => {
  const [slot, setSlot] = useState("17:30");

  return (
    <section id="korepetycje" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionIntro
            align="left"
            eyebrow="Korepetycje indywidualne"
            title="Potrzebujesz indywidualnego wsparcia?"
            description="Elegancki, spokojny proces rezerwacji i lekcje online prowadzone pod konkretny cel: egzamin, zaległości albo pewność w pisaniu."
          />
          <div className="mt-8 grid gap-3">
            {tutoringBenefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-4 rounded-2xl border border-white/75 bg-white/68 p-4 shadow-sm backdrop-blur">
                <HeartHandshake className="h-5 w-5 shrink-0 text-[#7C6CF6]" />
                <span className="font-semibold text-[#1E293B]">{benefit}</span>
              </div>
            ))}
          </div>
          <Button className="mt-8 rounded-full bg-[#7C6CF6] px-7 py-6 font-black text-white hover:bg-[#6655EA]">Zarezerwuj termin <CalendarDays /></Button>
        </div>
        <div className="premium-card reveal rounded-[2.25rem] border border-white/75 bg-white/72 p-5 shadow-[0_32px_100px_rgba(30,41,59,0.12)] backdrop-blur-xl sm:p-7">
          <div className="rounded-[1.75rem] bg-[#FAF7F2] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">Kalendarz rezerwacji</p>
                <h3 className="mt-2 font-serif text-3xl font-semibold tracking-[-0.045em] text-[#1E293B]">Wybierz spokojny termin</h3>
              </div>
              <CalendarDays className="h-8 w-8 text-[#7C6CF6]" />
            </div>
            <div className="mt-7 grid grid-cols-5 gap-2">
              {["Pn", "Wt", "Śr", "Cz", "Pt"].map((day, index) => (
                <div key={day} className={cn("rounded-2xl p-3 text-center", index === 2 ? "bg-[#1E293B] text-white" : "bg-white text-[#1E293B]")}> 
                  <p className="text-xs font-bold text-current/70">{day}</p>
                  <p className="mt-1 text-lg font-black">{12 + index}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSlot(time)}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition-all duration-300",
                    slot === time ? "border-[#7C6CF6] bg-[#7C6CF6] text-white shadow-xl" : "border-[#1E293B]/8 bg-white text-[#1E293B] hover:border-[#7C6CF6]/40",
                  )}
                >
                  <span className="text-lg font-black">{time}</span>
                  <span className="mt-1 block text-sm opacity-75">wolny termin · online</span>
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-[1.5rem] bg-[#EAF2FF] p-5">
              <p className="font-bold text-[#1E293B]">Wybrany termin: {slot}</p>
              <p className="mt-2 text-sm leading-6 text-[#526174]">Po rezerwacji uczeń otrzymuje plan spotkania i jasny kierunek pracy przed lekcją.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StudentDashboardSection = () => {
  const [tab, setTab] = useState(dashboardTabs[0]);
  const TabIcon = tab.icon;

  return (
    <section id="strefa-ucznia" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Student area preview"
          title="Strefa ucznia, która wygląda jak prawdziwe centrum dowodzenia nauką."
          description="Uczniowie i rodzice widzą kursy, materiały, warsztaty, korepetycje i historię płatności w jednym pięknym, uporządkowanym miejscu."
        />
        <div className="premium-card reveal mt-14 overflow-hidden rounded-[2.5rem] border border-white/75 bg-white/70 p-4 shadow-[0_36px_110px_rgba(30,41,59,0.14)] backdrop-blur-2xl sm:p-6">
          <div className="grid gap-4 rounded-[2rem] bg-[#1E293B] p-4 text-white lg:grid-cols-[290px_1fr] sm:p-6">
            <aside className="rounded-[1.6rem] bg-white/8 p-4">
              <KlasaMistrzowLogo markClassName="bg-white" textClassName="[&_span:first-child]:text-white [&_span:last-child]:text-[#E7C873]" />
              <div className="mt-8 grid gap-2">
                {dashboardTabs.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setTab(item)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-4 py-3 text-left font-bold transition-all duration-300",
                        tab.label === item.label ? "bg-white text-[#1E293B]" : "text-white/72 hover:bg-white/10 hover:text-white",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </button>
                  );
                })}
                {[
                  ["Nadchodzące warsztaty", CalendarDays],
                  ["Historia płatności", ReceiptText],
                  ["Darmowe materiały", Sparkles],
                ].map(([label, Icon]) => {
                  const IconComponent = Icon as typeof CalendarDays;
                  return (
                    <div key={label as string} className="flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-white/50">
                      <IconComponent className="h-5 w-5" />
                      {label as string}
                    </div>
                  );
                })}
              </div>
            </aside>
            <main className="rounded-[1.6rem] bg-[#FAF7F2] p-5 text-[#1E293B] sm:p-7">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">{tab.label}</p>
                  <h3 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.045em]">{tab.title}</h3>
                  <p className="mt-3 max-w-2xl text-[#526174]">{tab.description}</p>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#7C6CF6] text-white shadow-xl">
                  <TabIcon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  ["Kursy aktywne", "3", "bg-[#EAF2FF]"],
                  ["Materiały PDF", "18", "bg-[#FFF5D7]"],
                  ["Plan tygodnia", "82%", "bg-white"],
                ].map(([label, value, tone]) => (
                  <div key={label} className={cn("rounded-[1.5rem] p-5 shadow-sm", tone)}>
                    <p className="text-sm font-bold text-[#526174]">{label}</p>
                    <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-[#1E293B]">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.7fr]">
                <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-black">Następny krok</p>
                    <span className="rounded-full bg-[#E7C873] px-3 py-1 text-xs font-black">dziś</span>
                  </div>
                  <div className="mt-5 space-y-3">
                    {[
                      "Powtórz motywy romantyczne",
                      "Pobierz checklistę rozprawki",
                      "Zapisz pytanie do konsultacji",
                    ].map((task, index) => (
                      <div key={task} className="flex items-center gap-3 rounded-2xl bg-[#FAF7F2] p-4">
                        <span className={cn("grid h-7 w-7 place-items-center rounded-full text-xs font-black", index === 0 ? "bg-[#7C6CF6] text-white" : "bg-[#EAF2FF] text-[#7C6CF6]")}>{index + 1}</span>
                        <span className="font-semibold">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-[#EAF2FF] p-5 shadow-sm">
                  <p className="font-black">Status nauki</p>
                  <div className="mt-5 grid place-items-center rounded-full bg-white p-8">
                    <div className="grid h-36 w-36 place-items-center rounded-full border-[14px] border-[#7C6CF6] bg-[#FAF7F2]">
                      <span className="text-3xl font-black tracking-[-0.06em]">82%</span>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustSection = () => (
  <section className="px-4 py-16 sm:px-6">
    <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
      {[
        [Target, "Strategia zamiast chaosu", "Uczeń wie, czego się uczy, po co i jak to wykorzystać na egzaminie."],
        [MessageCircle, "Ludzki język", "Bez akademickiego dystansu. Jasno, konkretnie i z szacunkiem do stresu ucznia."],
        [Zap, "Wysoka wartość", "Warsztaty, materiały i wsparcie tworzą spójny system przygotowania."],
      ].map(([Icon, title, text]) => {
        const IconComponent = Icon as typeof Target;
        return (
          <div key={title as string} className="premium-card reveal rounded-[2rem] border border-white/75 bg-white/62 p-6 shadow-sm backdrop-blur">
            <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-[#7C6CF6] text-white"><IconComponent className="h-5 w-5" /></div>
            <h3 className="font-serif text-2xl font-semibold tracking-[-0.045em] text-[#1E293B]">{title as string}</h3>
            <p className="mt-3 leading-7 text-[#526174]">{text as string}</p>
          </div>
        );
      })}
    </div>
  </section>
);

const SiteFooter = () => (
  <footer className="px-4 pb-8 pt-20 sm:px-6">
    <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/75 bg-white/62 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl sm:p-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <KlasaMistrzowLogo />
          <p className="mt-5 max-w-md leading-7 text-[#526174]">Premium platforma przygotowania z języka polskiego: warsztaty, PDF, korepetycje i strefa ucznia w jednym miejscu.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-black text-[#1E293B]">Oferta</p>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-[#526174]">
              <a href="#matura">Strefa maturzysty</a>
              <a href="#osmoklasista">Strefa ósmoklasisty</a>
              <a href="#sklep">Sklep PDF</a>
            </div>
          </div>
          <div>
            <p className="font-black text-[#1E293B]">Platforma</p>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-[#526174]">
              <a href="#darmowe">Darmowe materiały</a>
              <a href="#korepetycje">Korepetycje</a>
              <a href="#strefa-ucznia">Strefa ucznia</a>
            </div>
          </div>
          <div>
            <p className="font-black text-[#1E293B]">Kontakt</p>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-[#526174]">
              <span>kontakt@klasamistrzow.pl</span>
              <span>Instagram · TikTok · YouTube</span>
              <span>© 2026 Klasa Mistrzów</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export const KlasaMistrzowHome = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF7F2] text-[#1E293B]">
      <SiteHeader />
      <HeroSection />
      <TrustSection />
      <MaturaSection />
      <EighthGradeSection />
      <PdfShopSection />
      <FreeStudentZoneSection />
      <TutoringSection />
      <StudentDashboardSection />
      <SiteFooter />
    </main>
  );
};

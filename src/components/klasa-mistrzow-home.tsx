import { useState } from "react";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Bookmark,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  Download,
  Feather,
  FileText,
  GraduationCap,
  HeartHandshake,
  Lock,
  Menu,
  MessageCircle,
  NotebookPen,
  PenLine,
  ReceiptText,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
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

const TEACHER_PORTRAIT = "/assets/teacher-portrait.png";
const TEACHER_BOOK = "/assets/teacher-book.png";

const navigation = [
  { label: "O mnie", href: "#o-mnie" },
  { label: "Strefa maturzysty", href: "#matura" },
  { label: "Strefa ósmoklasisty", href: "#osmoklasista" },
  { label: "Sklep", href: "#sklep" },
  { label: "Darmowe materiały", href: "#darmowe" },
  { label: "Korepetycje", href: "#korepetycje" },
  { label: "Strefa ucznia", href: "#strefa-ucznia" },
];

const heroCards = [
  { label: "Matura bez chaosu", icon: GraduationCap, position: "left-0 top-12 md:-left-10" },
  { label: "Warsztaty online", icon: CalendarDays, position: "right-0 top-24 md:-right-8" },
  { label: "Materiały PDF premium", icon: FileText, position: "left-2 bottom-28 md:-left-6" },
  { label: "Korepetycje indywidualne", icon: HeartHandshake, position: "right-2 bottom-20 md:-right-10" },
  { label: "Nauka krok po kroku", icon: NotebookPen, position: "left-[32%] top-2" },
];

const credibilityBadges = [
  "Setki przeprowadzonych godzin zajęć",
  "Indywidualne podejście",
  "Materiały tworzone pod realne egzaminy",
  "Nauka oparta na zrozumieniu",
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
    author: "Bolesław Prus",
    description: "Fabuła, bohaterowie, konteksty i gotowe tropy do rozprawki.",
    cover: "bg-[linear-gradient(145deg,#263248_0%,#4B3A5E_58%,#D9BC6E_100%)]",
    accent: "Warszawa · pozytywizm",
  },
  {
    title: "Dziady III pod klucz",
    author: "Adam Mickiewicz",
    description: "Motywy, symbole, sceny i interpretacje bez chaosu.",
    cover: "bg-[linear-gradient(145deg,#1E293B_0%,#2D2353_60%,#7C6CF6_100%)]",
    accent: "romantyzm · dramat",
  },
  {
    title: "Chłopi pod klucz",
    author: "Władysław Reymont",
    description: "Plan pracy z lekturą, konteksty epoki i najważniejsze problemy.",
    cover: "bg-[linear-gradient(145deg,#2F3F2F_0%,#8B6B3D_62%,#E7C873_100%)]",
    accent: "wieś · natura · symbol",
  },
  {
    title: "Przedwiośnie pod klucz",
    author: "Stefan Żeromski",
    description: "Szybka powtórka, która porządkuje fabułę i idee utworu.",
    cover: "bg-[linear-gradient(145deg,#24364A_0%,#6B3C45_64%,#E8B67A_100%)]",
    accent: "Polska · idee · dojrzewanie",
  },
  {
    title: "Egzamin ósmoklasisty – komplet",
    author: "Pakiet egzaminacyjny",
    description: "Lektury, formy wypowiedzi i praktyczne arkusze w jednym pakiecie.",
    cover: "bg-[linear-gradient(145deg,#244559_0%,#4C7C8A_58%,#EAF2FF_100%)]",
    accent: "arkusze · formy wypowiedzi",
  },
  {
    title: "Inne lektury",
    author: "Biblioteka PDF",
    description: "Materiały do kolejnych lektur rozwijane zgodnie z potrzebami uczniów.",
    cover: "bg-[linear-gradient(145deg,#6D5DE8_0%,#8D7AF7_55%,#E7C873_100%)]",
    accent: "notatki · motywy · konteksty",
  },
];

const freeBenefits = [
  "bezpłatny dostęp po założeniu konta",
  "materiały PDF do pobrania",
  "wskazówki pisane prostym językiem",
  "naturalna ścieżka do pełnych materiałów",
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
    icon: BookOpen,
    title: "Realny plan nauki z jasnym następnym krokiem",
    description: "Uczeń widzi, co już przerobił, co jest w toku i jaki krok wykonać dalej.",
  },
  {
    label: "Moje materiały PDF",
    icon: FileText,
    title: "PDF-y i notatki zawsze pod ręką",
    description: "Lektury, checklisty i arkusze są uporządkowane jak prywatna biblioteka przygotowań.",
  },
  {
    label: "Korepetycje",
    icon: UserRound,
    title: "Lekcje i warsztaty w jednym rytmie",
    description: "Najbliższe spotkania, pobrane materiały i aktualny moduł są widoczne od razu.",
  },
];

const dashboardModules = [
  { name: "Lalka", status: "ukończono", tone: "bg-[#E8F7EF] text-[#24553A]", icon: Check },
  { name: "Dziady III", status: "w trakcie", tone: "bg-[#EAF2FF] text-[#315EA8]", icon: NotebookPen },
  { name: "Romantyzm", status: "ukończono", tone: "bg-[#E8F7EF] text-[#24553A]", icon: Check },
  { name: "Przedwiośnie", status: "odblokuj", tone: "bg-[#F3EDE4] text-[#7A5B2F]", icon: Lock },
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
    <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E7C873]/45 bg-white/60 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#6D5DE8] shadow-sm backdrop-blur">
      <Feather className="h-3 w-3" />
      {eyebrow}
    </p>
    <h2 className="font-serif text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[#1E293B] sm:text-4xl lg:text-5xl">
      {title}
    </h2>
    <p className="mt-4 text-base leading-7 text-[#526174] sm:text-[1.05rem]">{description}</p>
  </div>
);

const PremiumButton = ({
  children,
  href,
  variant = "primary",
}: {
  children: string;
  href: string;
  variant?: "primary" | "light" | "ghost";
}) => (
  <Button
    asChild
    className={cn(
      "group h-11 rounded-full px-5 text-sm font-bold tracking-[-0.01em] shadow-[0_14px_32px_rgba(124,108,246,0.18)] transition-all duration-300 hover:-translate-y-0.5",
      variant === "primary" && "bg-[#7C6CF6] text-white hover:bg-[#6655EA]",
      variant === "light" && "border border-[#1E293B]/10 bg-white/80 text-[#1E293B] shadow-[0_14px_32px_rgba(30,41,59,0.07)] hover:bg-white",
      variant === "ghost" && "bg-[#1E293B] text-white hover:bg-[#172033]",
    )}
  >
    <a href={href}>
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  </Button>
);

const SiteHeader = () => (
  <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
    <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-[#FAF7F2]/82 px-4 py-3 shadow-[0_18px_70px_rgba(30,41,59,0.09)] backdrop-blur-2xl sm:px-5">
      <KlasaMistrzowLogo />
      <nav className="hidden items-center gap-1 lg:flex">
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full px-3 py-2 text-[0.82rem] font-semibold text-[#425069] transition-colors hover:bg-white/70 hover:text-[#7C6CF6]"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <Button asChild className="hidden rounded-full bg-[#1E293B] px-5 text-white hover:bg-[#172033] lg:inline-flex">
        <a href="#strefa-ucznia">Zaloguj się</a>
      </Button>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full bg-white/70 text-[#1E293B] lg:hidden">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Otwórz menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="border-l border-white/70 bg-[#FAF7F2]">
          <SheetHeader>
            <SheetTitle className="text-left">
              <KlasaMistrzowLogo />
            </SheetTitle>
          </SheetHeader>
          <div className="mt-9 grid gap-3">
            {navigation.map((item) => (
              <SheetClose asChild key={item.href}>
                <a href={item.href} className="rounded-2xl border border-[#1E293B]/10 bg-white/65 px-4 py-4 text-base font-semibold text-[#1E293B] shadow-sm">
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

const SoftBackground = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-[#E7C873]/22 blur-3xl" />
    <div className="absolute right-[-12%] top-36 h-80 w-80 rounded-full bg-[#7C6CF6]/14 blur-3xl" />
    <div className="absolute bottom-8 left-[38%] h-56 w-56 rounded-full bg-[#EAF2FF] blur-3xl" />
  </div>
);

const HeroPortrait = () => (
  <div className="relative mx-auto mt-10 flex min-h-[560px] w-full max-w-xl items-end justify-center lg:mt-0">
    <div className="absolute bottom-8 h-[76%] w-[72%] rounded-t-[16rem] rounded-b-[3rem] border border-white/80 bg-[linear-gradient(180deg,rgba(234,242,255,0.86),rgba(255,255,255,0.45))] shadow-[0_38px_110px_rgba(30,41,59,0.15)]" />
    <div className="absolute bottom-0 h-40 w-[86%] rounded-[50%] bg-[#1E293B]/10 blur-2xl" />
    <img
      src={TEACHER_PORTRAIT}
      alt="Paulina Spruch-Wójtowicz, twórczyni Klasy Mistrzów"
      className="reveal relative z-10 max-h-[560px] w-auto object-contain drop-shadow-[0_28px_48px_rgba(30,41,59,0.22)]"
    />
    {heroCards.map((card, index) => {
      const Icon = card.icon;
      return (
        <div
          key={card.label}
          className={cn(
            "float-card absolute z-20 hidden items-center gap-2 rounded-2xl border border-white/80 bg-white/78 px-3.5 py-3 text-sm font-bold text-[#1E293B] shadow-[0_18px_45px_rgba(30,41,59,0.12)] backdrop-blur-xl sm:flex",
            card.position,
          )}
          style={{ animationDelay: `${index * 120}ms` }}
        >
          <Icon className="h-3.5 w-3.5 text-[#7C6CF6]" />
          {card.label}
        </div>
      );
    })}
    <div className="absolute bottom-7 left-1/2 z-20 w-[88%] -translate-x-1/2 rounded-[1.6rem] border border-white/80 bg-[#FAF7F2]/86 p-4 shadow-[0_20px_70px_rgba(30,41,59,0.14)] backdrop-blur-xl sm:hidden">
      <p className="font-serif text-xl font-semibold tracking-[-0.04em] text-[#1E293B]">Matura bez chaosu</p>
      <p className="mt-1 text-sm text-[#526174]">warsztaty · PDF · korepetycje</p>
    </div>
  </div>
);

const HeroSection = () => (
  <section id="top" className="relative overflow-hidden px-4 pb-14 pt-32 sm:px-6 lg:pb-20 lg:pt-36">
    <SoftBackground />
    <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.98fr_1.02fr]">
      <div className="reveal max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/62 px-4 py-2 shadow-sm backdrop-blur">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#7C6CF6] text-white">
            <Feather className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm font-bold text-[#1E293B]">Język polski prowadzony spokojnie, logicznie i z klasą</span>
        </div>
        <h1 className="font-serif text-[2.85rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#1E293B] sm:text-5xl lg:text-[4.35rem] xl:text-[4.85rem]">
          Nazywam się Paulina Spruch-Wójtowicz.
        </h1>
        <div className="mt-6 max-w-2xl space-y-4 text-[1.02rem] leading-8 text-[#526174] sm:text-lg">
          <p>
            Od lat pomagam uczniom przygotować się do matury, egzaminu ósmoklasisty oraz codziennej nauki języka polskiego w sposób uporządkowany, spokojny i przede wszystkim skuteczny.
          </p>
          <p>
            Stworzyłam Klasę Mistrzów, aby pokazać, że język polski nie musi oznaczać chaosu, stresu i nauki wszystkiego naraz.
          </p>
          <p className="font-semibold text-[#1E293B]">Tutaj uczysz się tego, co naprawdę pomaga osiągać wyniki.</p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <PremiumButton href="#matura">Zapisz się na warsztaty</PremiumButton>
          <PremiumButton href="#sklep" variant="light">Kup materiały</PremiumButton>
          <PremiumButton href="#korepetycje" variant="ghost">Korepetycje indywidualne</PremiumButton>
        </div>
        <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
          {[
            ["spokój", "plan nauki bez chaosu"],
            ["wynik", "praca na realnych zadaniach"],
            ["opieka", "nauczyciel jako przewodnik"],
          ].map(([value, label]) => (
            <div key={value} className="rounded-[1.35rem] border border-white/70 bg-white/58 p-4 shadow-sm backdrop-blur">
              <p className="font-serif text-2xl font-semibold tracking-[-0.05em] text-[#7C6CF6]">{value}</p>
              <p className="mt-1 text-sm font-medium leading-5 text-[#526174]">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <HeroPortrait />
    </div>
  </section>
);

const AboutSection = () => (
  <section id="o-mnie" className="px-4 py-14 sm:px-6 lg:py-20">
    <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[2.2rem] border border-white/75 bg-white/58 p-5 shadow-[0_28px_85px_rgba(30,41,59,0.1)] backdrop-blur-xl sm:p-8 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="relative min-h-[520px] overflow-hidden rounded-[1.9rem] bg-[linear-gradient(180deg,#EAF2FF_0%,#FAF7F2_100%)]">
        <div className="absolute inset-x-8 bottom-8 h-20 rounded-[50%] bg-[#1E293B]/10 blur-2xl" />
        <div className="absolute left-6 top-6 rounded-2xl bg-white/70 px-4 py-3 text-sm font-bold text-[#1E293B] shadow-lg backdrop-blur">
          <BookOpen className="mr-2 inline h-3.5 w-3.5 text-[#7C6CF6]" />
          praca z tekstem
        </div>
        <img src={TEACHER_BOOK} alt="Paulina podczas pracy z książką" className="absolute inset-x-0 bottom-0 mx-auto h-[520px] w-auto object-contain drop-shadow-[0_24px_40px_rgba(30,41,59,0.2)]" />
      </div>
      <div className="py-2 lg:py-6">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E7C873]/45 bg-[#FFF7DC] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#6D5DE8]">
          <UserRound className="h-3 w-3" />
          O mnie
        </p>
        <h2 className="font-serif text-[2.15rem] font-semibold leading-[1.03] tracking-[-0.05em] text-[#1E293B] sm:text-4xl lg:text-5xl">
          Poznaj osobę, która poprowadzi Cię do wyniku
        </h2>
        <div className="mt-6 space-y-4 text-[1.02rem] leading-8 text-[#526174]">
          <p className="font-semibold text-[#1E293B]">Cześć, jestem Paulina.</p>
          <p>
            Od początku mojej pracy wierzę, że skuteczna nauka nie polega na zapamiętywaniu wszystkiego, ale na zrozumieniu schematów, logicznym myśleniu i pracy na tym, co naprawdę pojawia się na egzaminach.
          </p>
          <p>
            Na co dzień pomagam uczniom przygotować się do matury oraz egzaminu ósmoklasisty, tworząc materiały, warsztaty i indywidualne lekcje, które porządkują wiedzę i dają poczucie kontroli.
          </p>
          <p>
            Moim celem jest nie tylko przygotować Cię do egzaminu, ale pokazać, że język polski można zrozumieć w sposób prosty, logiczny i przewidywalny.
          </p>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {credibilityBadges.map((badge) => (
            <div key={badge} className="flex items-center gap-3 rounded-2xl bg-[#FAF7F2] p-3 text-sm font-bold text-[#1E293B]">
              <Check className="h-3.5 w-3.5 shrink-0 text-[#7C6CF6]" />
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const TrustSection = () => (
  <section className="px-4 py-12 sm:px-6 lg:py-16">
    <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
      {[
        [Target, "Strategia zamiast chaosu", "Uczeń wie, czego się uczy, po co i jak to wykorzystać na egzaminie."],
        [MessageCircle, "Ludzki język", "Bez akademickiego dystansu. Jasno, konkretnie i z szacunkiem do stresu ucznia."],
        [ShieldCheck, "Autorytet i opieka", "Produkty edukacyjne prowadzą tak, jak prowadzi dobry nauczyciel: krok po kroku."],
      ].map(([Icon, title, text]) => {
        const IconComponent = Icon as typeof Target;
        return (
          <div key={title as string} className="premium-card reveal rounded-[1.8rem] border border-white/75 bg-white/62 p-5 shadow-sm backdrop-blur">
            <div className="mb-5 grid h-10 w-10 place-items-center rounded-2xl bg-[#7C6CF6] text-white">
              <IconComponent className="h-4 w-4" />
            </div>
            <h3 className="font-serif text-[1.55rem] font-semibold tracking-[-0.045em] text-[#1E293B]">{title as string}</h3>
            <p className="mt-3 leading-7 text-[#526174]">{text as string}</p>
          </div>
        );
      })}
    </div>
  </section>
);

const StudyDeskPreview = () => (
  <div className="relative min-h-[300px] rounded-[1.8rem] bg-[#FAF7F2] p-5 shadow-inner">
    <div className="absolute left-6 top-8 w-56 rotate-[-4deg] rounded-[1.2rem] border border-[#1E293B]/10 bg-white p-5 shadow-[0_18px_45px_rgba(30,41,59,0.12)]">
      <p className="font-serif text-xl font-semibold tracking-[-0.04em] text-[#1E293B]">Plan lektury</p>
      <div className="mt-4 space-y-2 text-sm text-[#526174]">
        <p>1. Fabuła krok po kroku</p>
        <p>2. Motywy i konteksty</p>
        <p>3. Argumenty do rozprawki</p>
      </div>
    </div>
    <div className="absolute bottom-8 right-6 w-64 rotate-[3deg] rounded-[1.2rem] bg-[#FFF7DC] p-5 shadow-[0_18px_45px_rgba(30,41,59,0.1)]">
      <p className="font-serif text-lg font-semibold tracking-[-0.04em] text-[#1E293B]">Notatka z warsztatu</p>
      <div className="mt-4 space-y-2">
        <span className="block h-2 w-full rounded bg-[#1E293B]/20" />
        <span className="block h-2 w-10/12 rounded bg-[#1E293B]/15" />
        <span className="block h-2 w-8/12 rounded bg-[#7C6CF6]/30" />
      </div>
    </div>
    <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#7C6CF6] text-white shadow-xl">
      <PenLine className="h-5 w-5" />
    </div>
  </div>
);

const MaturaSection = () => {
  const [selectedEpoch, setSelectedEpoch] = useState("Romantyzm");

  return (
    <section id="matura" className="relative px-4 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Strefa maturzysty"
          title="Nie uczysz się wszystkiego. Uczysz się tego, co naprawdę pracuje na wynik."
          description="Warsztaty i materiały porządkują lektury, epoki i argumentację tak, aby uczeń czuł kontrolę, pewność i gotowość do pisania."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="premium-card reveal rounded-[1.9rem] border border-white/75 bg-white/68 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.09)] backdrop-blur-xl sm:p-7">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">Warsztaty premium</p>
                <h3 className="mt-3 font-serif text-[1.9rem] font-semibold tracking-[-0.045em] text-[#1E293B]">Warsztaty z lektur obowiązkowych</h3>
                <p className="mt-3 text-[#526174]">Intensywne spotkania, które zamieniają lekturę w gotowy zestaw narzędzi do egzaminu.</p>
              </div>
              <span className="rounded-2xl bg-[#1E293B] p-3 text-[#E7C873]"><BookMarked className="h-4 w-4" /></span>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {workshopFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl bg-[#FAF7F2]/78 p-3 text-sm font-semibold text-[#1E293B]">
                  <Check className="h-3.5 w-3.5 shrink-0 text-[#7C6CF6]" />
                  {feature}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <StudyDeskPreview />
            </div>
          </div>
          <div className="grid gap-5">
            <div className="premium-card reveal rounded-[1.9rem] bg-[#1E293B] p-6 text-white shadow-[0_24px_70px_rgba(30,41,59,0.2)] sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E7C873]">Historia literatury pod klucz</p>
              <h3 className="mt-3 font-serif text-[1.9rem] font-semibold tracking-[-0.045em]">6 godzin powtórki — tylko to, co najważniejsze</h3>
              <div className="mt-5 flex flex-wrap gap-2">
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
              <div className="mt-5 rounded-[1.4rem] bg-white/10 p-5">
                <p className="font-serif text-xl font-semibold">{selectedEpoch}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {epochDetails.map((detail) => (
                    <span key={detail} className="flex items-center gap-2 text-sm text-white/78">
                      <Bookmark className="h-3.5 w-3.5 text-[#E7C873]" />
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="premium-card reveal rounded-[1.9rem] border border-[#E7C873]/40 bg-[#FFF7DC] p-6 shadow-[0_20px_60px_rgba(231,200,115,0.16)] sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">Notatki PDF</p>
              <h3 className="mt-3 font-serif text-[1.9rem] font-semibold tracking-[-0.045em] text-[#1E293B]">Najważniejsze epoki i lektury w jednym miejscu</h3>
              <p className="mt-3 text-[#526174]">Materiały przypominające dobrze przygotowane notatki: czytelne, konkretne i gotowe do powtórki.</p>
              <a href="#sklep" className="mt-5 inline-flex items-center gap-2 font-bold text-[#7C6CF6]">Zobacz materiały <ChevronRight className="h-3.5 w-3.5" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EighthGradeSection = () => (
  <section id="osmoklasista" className="px-4 py-14 sm:px-6 lg:py-20">
    <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[2.2rem] border border-white/75 bg-[#EAF2FF]/75 p-6 shadow-[0_28px_80px_rgba(30,41,59,0.09)] backdrop-blur-xl sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
      <SectionIntro
        align="left"
        eyebrow="Strefa ósmoklasisty"
        title="Kurs kompleksowy, który daje poczucie prowadzenia krok po kroku."
        description="Lektury + formy wypowiedzi + przygotowanie do egzaminu — wszystko ułożone spokojnie, jasno i z myślą o realnym arkuszu."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {eighthGradeItems.map((item, index) => (
          <div key={item} className="premium-card reveal rounded-[1.4rem] border border-white/80 bg-white/78 p-4 shadow-sm backdrop-blur">
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-2xl bg-[#7C6CF6] text-sm font-black text-white">{index + 1}</div>
            <p className="font-bold tracking-[-0.03em] text-[#1E293B]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BookCover = ({ product }: { product: (typeof products)[number] }) => (
  <div className="relative h-56 overflow-hidden rounded-[1.35rem] bg-[#1E293B] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]">
    <div className={cn("absolute inset-0", product.cover)} />
    <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:18px_18px]" />
    <div className="relative flex h-full flex-col justify-between rounded-[1rem] border border-white/35 p-4 text-white shadow-inner">
      <div>
        <p className="text-[0.62rem] font-black uppercase tracking-[0.24em] text-[#E7C873]">Klasa Mistrzów PDF</p>
        <h3 className="mt-5 font-serif text-3xl font-semibold leading-none tracking-[-0.055em]">{product.title.replace(" pod klucz", "")}</h3>
        <p className="mt-2 text-xs font-semibold text-white/70">{product.author}</p>
      </div>
      <div>
        <div className="mb-4 h-px w-full bg-white/35" />
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/78">{product.accent}</p>
      </div>
    </div>
  </div>
);

const PdfShopSection = () => (
  <section id="sklep" className="px-4 py-14 sm:px-6 lg:py-20">
    <div className="mx-auto max-w-7xl">
      <SectionIntro
        eyebrow="Sklep z materiałami PDF"
        title="Materiały, które wyglądają jak wartościowe narzędzia do nauki — nie przypadkowe pliki."
        description="Każdy produkt prowadzi przez lekturę lub egzamin: od zrozumienia, przez zapamiętanie, aż po użycie wiedzy w wypowiedzi."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div key={product.title} className="premium-card group reveal rounded-[1.9rem] border border-white/75 bg-white/72 p-4 shadow-[0_22px_65px_rgba(30,41,59,0.09)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(124,108,246,0.14)]">
            <BookCover product={product} />
            <div className="p-2 pt-5">
              <h3 className="font-serif text-[1.55rem] font-semibold tracking-[-0.045em] text-[#1E293B]">{product.title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-[#526174]">{product.description}</p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-base font-black tracking-[-0.04em] text-[#1E293B]">Cena wkrótce</span>
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
  <section id="darmowe" className="px-4 py-14 sm:px-6 lg:py-20">
    <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2.2rem] bg-[#1E293B] p-6 text-white shadow-[0_30px_95px_rgba(30,41,59,0.22)] sm:p-8 lg:grid-cols-[1fr_0.9fr]">
      <div className="relative z-10">
        <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#E7C873]">Darmowa strefa ucznia</p>
        <h2 className="font-serif text-[2.15rem] font-semibold leading-[1.03] tracking-[-0.05em] sm:text-4xl lg:text-5xl">Darmowe materiały na dobry start</h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">Zbuduj pierwsze poczucie pewności bez presji zakupu — a potem naturalnie przejdź do pełnych materiałów, warsztatów lub korepetycji.</p>
        <div className="mt-7 rounded-[1.8rem] border border-white/15 bg-white/8 p-5 backdrop-blur">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E7C873]">Materiał startowy</p>
          <h3 className="mt-3 font-serif text-[1.9rem] font-semibold tracking-[-0.045em]">Jak napisać rozprawkę na 100%?</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {freeBenefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 text-sm text-white/78">
                <Check className="h-3.5 w-3.5 shrink-0 text-[#E7C873]" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
        <Button className="mt-7 rounded-full bg-[#E7C873] px-7 py-6 font-black text-[#1E293B] hover:bg-[#f0d888]">Załóż darmowe konto <ArrowRight className="h-4 w-4" /></Button>
      </div>
      <div className="relative min-h-[330px]">
        <div className="absolute inset-0 rounded-[2rem] bg-[#7C6CF6]/20 blur-3xl" />
        <div className="relative ml-auto max-w-md rounded-[1.9rem] border border-white/15 bg-white/10 p-5 backdrop-blur-2xl">
          <div className="rounded-[1.5rem] bg-[#FAF7F2] p-5 text-[#1E293B]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">PDF startowy</p>
                <h4 className="mt-2 text-xl font-black tracking-[-0.04em]">Rozprawka bez paniki</h4>
              </div>
              <ClipboardCheck className="h-5 w-5 text-[#7C6CF6]" />
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
    <section id="korepetycje" className="px-4 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionIntro
            align="left"
            eyebrow="Korepetycje indywidualne"
            title="Potrzebujesz indywidualnego wsparcia?"
            description="Elegancki, spokojny proces rezerwacji i lekcje online prowadzone pod konkretny cel: egzamin, zaległości albo pewność w pisaniu."
          />
          <div className="mt-7 grid gap-3">
            {tutoringBenefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-4 rounded-2xl border border-white/75 bg-white/68 p-4 shadow-sm backdrop-blur">
                <HeartHandshake className="h-4 w-4 shrink-0 text-[#7C6CF6]" />
                <span className="font-semibold text-[#1E293B]">{benefit}</span>
              </div>
            ))}
          </div>
          <Button className="mt-7 rounded-full bg-[#7C6CF6] px-7 py-6 font-black text-white hover:bg-[#6655EA]">Zarezerwuj termin <CalendarDays className="h-4 w-4" /></Button>
        </div>
        <div className="premium-card reveal rounded-[2rem] border border-white/75 bg-white/72 p-5 shadow-[0_28px_85px_rgba(30,41,59,0.11)] backdrop-blur-xl sm:p-6">
          <div className="rounded-[1.6rem] bg-[#FAF7F2] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">Kalendarz rezerwacji</p>
                <h3 className="mt-2 font-serif text-[1.9rem] font-semibold tracking-[-0.045em] text-[#1E293B]">Wybierz spokojny termin</h3>
              </div>
              <CalendarDays className="h-5 w-5 text-[#7C6CF6]" />
            </div>
            <div className="mt-6 grid grid-cols-5 gap-2">
              {["Pn", "Wt", "Śr", "Cz", "Pt"].map((day, index) => (
                <div key={day} className={cn("rounded-2xl p-3 text-center", index === 2 ? "bg-[#1E293B] text-white" : "bg-white text-[#1E293B]")}> 
                  <p className="text-xs font-bold text-current/70">{day}</p>
                  <p className="mt-1 text-base font-black">{12 + index}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSlot(time)}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition-all duration-300",
                    slot === time ? "border-[#7C6CF6] bg-[#7C6CF6] text-white shadow-xl" : "border-[#1E293B]/8 bg-white text-[#1E293B] hover:border-[#7C6CF6]/40",
                  )}
                >
                  <span className="text-base font-black">{time}</span>
                  <span className="mt-1 block text-sm opacity-75">wolny termin · online</span>
                </button>
              ))}
            </div>
            <div className="mt-5 rounded-[1.4rem] bg-[#EAF2FF] p-5">
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
    <section id="strefa-ucznia" className="px-4 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Strefa ucznia"
          title="Panel ucznia jako uporządkowana biblioteka nauki."
          description="Platforma jest dodatkiem do pracy z nauczycielem: pomaga przechowywać materiały, sprawdzać moduły i pamiętać o warsztatach."
        />
        <div className="premium-card reveal mt-10 overflow-hidden rounded-[2.2rem] border border-white/75 bg-white/70 p-4 shadow-[0_30px_95px_rgba(30,41,59,0.12)] backdrop-blur-2xl sm:p-6">
          <div className="grid gap-4 rounded-[1.9rem] bg-[#1E293B] p-4 text-white lg:grid-cols-[280px_1fr] sm:p-6">
            <aside className="rounded-[1.5rem] bg-white/8 p-4">
              <KlasaMistrzowLogo markClassName="bg-white" textClassName="[&_span:first-child]:text-white [&_span:last-child]:text-[#E7C873]" />
              <div className="mt-7 grid gap-2">
                {dashboardTabs.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setTab(item)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition-all duration-300",
                        tab.label === item.label ? "bg-white text-[#1E293B]" : "text-white/72 hover:bg-white/10 hover:text-white",
                      )}
                    >
                      <Icon className="h-4 w-4" />
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
                    <div key={label as string} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-white/50">
                      <IconComponent className="h-4 w-4" />
                      {label as string}
                    </div>
                  );
                })}
              </div>
            </aside>
            <main className="rounded-[1.5rem] bg-[#FAF7F2] p-5 text-[#1E293B] sm:p-6">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">{tab.label}</p>
                  <h3 className="mt-3 font-serif text-[1.9rem] font-semibold tracking-[-0.045em]">{tab.title}</h3>
                  <p className="mt-3 max-w-2xl text-[#526174]">{tab.description}</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#7C6CF6] text-white shadow-xl">
                  <TabIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_0.78fr]">
                <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-black">Moje kursy i lektury</p>
                    <span className="rounded-full bg-[#E7C873] px-3 py-1 text-xs font-black">realny plan</span>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {dashboardModules.map((module) => {
                      const Icon = module.icon;
                      return (
                        <div key={module.name} className="rounded-2xl bg-[#FAF7F2] p-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-bold">{module.name}</p>
                            <Icon className="h-4 w-4 text-[#7C6CF6]" />
                          </div>
                          <span className={cn("mt-3 inline-flex rounded-full px-3 py-1 text-xs font-black", module.tone)}>{module.status}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-[#EAF2FF] p-5 shadow-sm">
                  <p className="font-black">Najważniejsze teraz</p>
                  <div className="mt-5 space-y-3 text-sm font-semibold text-[#1E293B]">
                    <div className="flex items-center gap-3 rounded-2xl bg-white p-4"><Download className="h-4 w-4 text-[#7C6CF6]" /> Pobrane PDF: 8</div>
                    <div className="flex items-center gap-3 rounded-2xl bg-white p-4"><CalendarDays className="h-4 w-4 text-[#7C6CF6]" /> Najbliższy warsztat: Czwartek 18:00</div>
                    <div className="flex items-center gap-3 rounded-2xl bg-white p-4"><ScrollText className="h-4 w-4 text-[#7C6CF6]" /> Aktualny moduł: Rozprawka</div>
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

const SiteFooter = () => (
  <footer className="px-4 pb-8 pt-14 sm:px-6">
    <div className="mx-auto max-w-7xl rounded-[2.2rem] border border-white/75 bg-white/62 p-6 shadow-[0_22px_65px_rgba(30,41,59,0.08)] backdrop-blur-xl sm:p-8">
      <div className="grid gap-9 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <KlasaMistrzowLogo />
          <p className="mt-5 max-w-md leading-7 text-[#526174]">Premium marka edukacyjna Pauliny Spruch-Wójtowicz: warsztaty, PDF, korepetycje i strefa ucznia w jednym spokojnym systemie nauki.</p>
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
            <p className="font-black text-[#1E293B]">Nauka</p>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-[#526174]">
              <a href="#o-mnie">O mnie</a>
              <a href="#darmowe">Darmowe materiały</a>
              <a href="#korepetycje">Korepetycje</a>
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
      <AboutSection />
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

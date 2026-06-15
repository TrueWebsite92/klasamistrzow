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
  FileText,
  GraduationCap,
  HeartHandshake,
  Library,
  Lock,
  Mail,
  Megaphone,
  Menu,
  NotebookPen,
  NotebookTabs,
  Pencil,
  ReceiptText,
  ScrollText,
  Sparkles,
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

const trustBadges = [
  {
    title: "Plan nauki",
    description: "uporządkowana ścieżka działania",
    icon: BookOpen,
  },
  {
    title: "Nauka krok po kroku",
    description: "jasny system przygotowania",
    icon: NotebookPen,
  },
  {
    title: "Materiały egzaminacyjne",
    description: "tylko to, co naprawdę potrzebne",
    icon: FileText,
  },
  {
    title: "Indywidualne podejście",
    description: "wsparcie dopasowane do ucznia",
    icon: UserRound,
  },
  {
    title: "Realne efekty",
    description: "praca pod wynik i pewność",
    icon: GraduationCap,
  },
  {
    title: "Stałe wsparcie",
    description: "spokojny kontakt i jasne kroki",
    icon: HeartHandshake,
  },
];

const credibilityBadges = [
  "Setki przeprowadzonych godzin zajęć",
  "Indywidualne podejście",
  "Materiały tworzone pod realne egzaminy",
  "Nauka oparta na zrozumieniu",
];

const maturaFeatures = [
  { title: "Bohaterowie", text: "Najważniejsze postacie i relacje bez zbędnych dygresji.", icon: UserRound },
  { title: "Gotowe pomysły do rozprawki", text: "Argumenty, tezy i konteksty gotowe do użycia w pracy.", icon: Pencil },
  { title: "Fabuła krok po kroku", text: "Lektura uporządkowana logicznie, scena po scenie.", icon: BookOpen },
  { title: "Konteksty", text: "To, co naprawdę wzmacnia interpretację na egzaminie.", icon: Library },
  { title: "Motywy", text: "Najważniejsze tropy z przykładami i zastosowaniem.", icon: Bookmark },
  { title: "Pytania i PDF", text: "Możliwość zadawania pytań oraz materiały po spotkaniu.", icon: FileText },
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

const eighthGradeCards = [
  { title: "Omówienie lektur", icon: BookOpen },
  { title: "Rozprawka", icon: Pencil },
  { title: "Opowiadanie", icon: NotebookPen },
  { title: "Ogłoszenie", icon: Megaphone },
  { title: "Arkusze egzaminacyjne", icon: FileText },
  { title: "Czytanie ze zrozumieniem", icon: BookMarked },
  { title: "Charakterystyka", icon: UserRound },
  { title: "Zaproszenie", icon: Mail },
];

const products = [
  {
    title: "Lalka pod klucz",
    description: "Fabuła, bohaterowie, konteksty i gotowe tropy do rozprawki.",
  },
  {
    title: "Dziady III pod klucz",
    description: "Motywy, symbole, sceny i interpretacje bez chaosu.",
  },
  {
    title: "Chłopi pod klucz",
    description: "Plan pracy z lekturą, konteksty epoki i najważniejsze problemy.",
  },
  {
    title: "Przedwiośnie pod klucz",
    description: "Szybka powtórka, która porządkuje fabułę i idee utworu.",
  },
  {
    title: "Egzamin ósmoklasisty – komplet",
    description: "Lektury, formy wypowiedzi i praktyczne arkusze w jednym pakiecie.",
  },
  {
    title: "Inne lektury",
    description: "Materiały do kolejnych lektur rozwijane zgodnie z potrzebami uczniów.",
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
    description: "Lektury, listy kontrolne i arkusze są uporządkowane jak prywatna biblioteka przygotowań.",
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
      <BookOpen className="h-3 w-3" />
      {eyebrow}
    </p>
    <h2 className="font-serif text-[2rem] font-semibold leading-[1.05] tracking-[-0.05em] text-[#1E293B] sm:text-[2.55rem] lg:text-[3.15rem]">
      {title}
    </h2>
    <p className="mt-4 text-base leading-7 text-[#526174] sm:text-[1.03rem]">{description}</p>
  </div>
);

const GlownyPrzycisk = ({
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
  <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
    <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-[#FAF7F2]/84 px-3 py-2.5 shadow-[0_18px_70px_rgba(30,41,59,0.09)] backdrop-blur-2xl sm:px-5 sm:py-3">
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
          <div className="mt-8 grid gap-2.5">
            {navigation.map((item) => (
              <SheetClose asChild key={item.href}>
                <a href={item.href} className="rounded-2xl border border-[#1E293B]/10 bg-white/65 px-4 py-3.5 text-sm font-semibold text-[#1E293B] shadow-sm">
                  {item.label}
                </a>
              </SheetClose>
            ))}
            <SheetClose asChild>
              <a href="#strefa-ucznia" className="mt-2 rounded-full bg-[#7C6CF6] px-5 py-3.5 text-center font-bold text-white shadow-xl">
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
    <div className="absolute left-[-14%] top-16 h-64 w-64 rounded-full bg-[#E7C873]/22 blur-3xl" />
    <div className="absolute right-[-12%] top-32 h-80 w-80 rounded-full bg-[#7C6CF6]/13 blur-3xl" />
    <div className="absolute bottom-8 left-[36%] h-48 w-48 rounded-full bg-[#EAF2FF] blur-3xl" />
  </div>
);

const HeroStudyScene = () => (
  <div className="academic-scene group relative mx-auto mt-8 min-h-[390px] w-full max-w-xl lg:mt-0 lg:min-h-[500px]">
    <div className="absolute inset-x-8 bottom-6 h-28 rounded-[50%] bg-[#1E293B]/14 blur-2xl" />
    <div className="absolute inset-0 overflow-hidden rounded-[2.3rem] border border-white/70 bg-[#8B6642] shadow-[0_34px_95px_rgba(30,41,59,0.14)]">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(rgba(30,41,59,.12)_1px,transparent_1px)] [background-size:42px_100%,100%_34px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(231,200,115,0.42),transparent_32%),linear-gradient(145deg,rgba(255,244,221,0.42),rgba(30,41,59,0.05))]" />
    </div>

    <div className="scene-layer absolute inset-4 rounded-[2rem] transition-transform duration-700 group-hover:rotate-[0.45deg] group-hover:scale-[1.01] sm:inset-6">
      <div className="desk-paper absolute left-4 top-7 w-[52%] -rotate-6 rounded-[1.2rem] border border-[#1E293B]/10 bg-[#FBFAF7] p-4 shadow-[0_20px_50px_rgba(30,41,59,0.16)] sm:left-6 sm:top-8 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-[#7C6CF6]">Arkusz maturalny</span>
          <FileText className="h-3.5 w-3.5 text-[#7C6CF6]" />
        </div>
        <div className="space-y-2">
          <span className="block h-2 w-full rounded bg-[#1E293B]/18" />
          <span className="block h-2 w-11/12 rounded bg-[#1E293B]/14" />
          <span className="block h-2 w-9/12 rounded bg-[#E7C873]/70" />
          <span className="block h-2 w-10/12 rounded bg-[#1E293B]/14" />
        </div>
        <div className="mt-5 rounded-xl bg-[#EAF2FF] p-3 text-xs font-bold leading-5 text-[#1E293B]">
          Temat: rola kontekstu w interpretacji lektury
        </div>
      </div>

      <div className="absolute bottom-8 left-10 w-[58%] rotate-3 rounded-[1.5rem] border border-[#1E293B]/10 bg-[#FFFDF8] p-4 shadow-[0_24px_60px_rgba(30,41,59,0.18)] sm:p-5">
        <div className="absolute left-1/2 top-0 h-full w-px bg-[#E7C873]/55" />
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="font-serif text-xl font-semibold tracking-[-0.04em] text-[#1E293B]">Notatnik</p>
            <div className="mt-4 space-y-2 text-xs font-medium text-[#526174]">
              <p>teza → argument → przykład</p>
              <p>motyw: dojrzewanie</p>
              <p>kontekst: epoka</p>
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <span className="block h-2 w-full rounded bg-[#1E293B]/14" />
            <span className="block h-2 w-10/12 rounded bg-[#1E293B]/14" />
            <span className="block h-2 w-8/12 rounded bg-[#7C6CF6]/28" />
            <span className="block h-2 w-11/12 rounded bg-[#1E293B]/12" />
          </div>
        </div>
      </div>

      <div className="desk-note absolute right-7 top-10 w-32 rotate-6 rounded-[1rem] bg-[#FFF7DC] p-4 shadow-[0_16px_40px_rgba(30,41,59,0.14)]">
        <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#7C6CF6]">do powtórki</p>
        <p className="mt-2 font-serif text-lg font-semibold leading-5 tracking-[-0.04em] text-[#1E293B]">motywy i konteksty</p>
      </div>

      <div className="absolute bottom-14 right-7 h-3 w-44 -rotate-[24deg] rounded-full bg-[#1E293B] shadow-[0_12px_24px_rgba(30,41,59,0.26)]">
        <span className="absolute -right-3 -top-1 h-5 w-8 rounded-full bg-[#E7C873]" />
        <span className="absolute -left-5 -top-0.5 h-4 w-8 rounded-full border border-[#E7C873] bg-[#FAF7F2]" />
      </div>

      <div className="absolute right-12 top-36 hidden w-36 -rotate-3 rounded-[1.1rem] border border-[#1E293B]/10 bg-white/92 p-4 shadow-[0_16px_40px_rgba(30,41,59,0.13)] sm:block">
        <p className="text-xs font-bold text-[#526174]">fragment tekstu</p>
        <div className="mt-3 space-y-2">
          <span className="block h-2 w-full rounded bg-[#1E293B]/13" />
          <span className="block h-2 w-10/12 rounded bg-[#E7C873]/80" />
          <span className="block h-2 w-9/12 rounded bg-[#1E293B]/13" />
        </div>
      </div>
    </div>
  </div>
);

const HeroSection = () => (
  <section id="top" className="relative overflow-hidden px-4 pb-9 pt-28 sm:px-6 sm:pb-12 lg:pb-14 lg:pt-32">
    <SoftBackground />
    <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="reveal max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/62 px-4 py-2 shadow-sm backdrop-blur">
          <BookOpen className="h-4 w-4 text-[#7C6CF6]" />
          <span className="text-sm font-bold text-[#1E293B]">Eleganckie przygotowanie do egzaminów z języka polskiego</span>
        </div>
        <h1 className="font-serif text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#1E293B] sm:text-[4rem] lg:text-[4.65rem]">
          Język polski bez chaosu. Matura bez stresu. Wyniki z pewnością.
        </h1>
        <p className="mt-6 max-w-2xl text-[1.02rem] leading-8 text-[#526174] sm:text-lg">
          Uporządkowane kursy, warsztaty, materiały PDF i korepetycje online, które prowadzą ucznia krok po kroku — od zagubienia do jasnego planu działania przed egzaminem.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <GlownyPrzycisk href="#matura">Zapisz się na warsztaty</GlownyPrzycisk>
          <GlownyPrzycisk href="#sklep" variant="light">Kup materiały</GlownyPrzycisk>
          <GlownyPrzycisk href="#korepetycje" variant="ghost">Korepetycje indywidualne</GlownyPrzycisk>
        </div>
      </div>
      <HeroStudyScene />
    </div>
  </section>
);

const TrustBadgesSection = () => (
  <section className="px-4 py-6 sm:px-6 lg:py-8">
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2.5 lg:grid-cols-3">
      {trustBadges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div key={badge.title} className="reveal group rounded-[1.15rem] border border-white/75 bg-white/62 p-3 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/86 hover:shadow-[0_14px_36px_rgba(30,41,59,0.08)] sm:p-3.5">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-[#EAF2FF] text-[#7C6CF6] transition-colors group-hover:bg-[#7C6CF6] group-hover:text-white">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-sm font-black leading-5 text-[#1E293B]">{badge.title}</p>
                <p className="mt-0.5 text-xs leading-5 text-[#526174]">{badge.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

const AboutSection = () => (
  <section id="o-mnie" className="px-4 py-10 sm:px-6 lg:py-14">
    <div className="mx-auto grid max-w-7xl items-center gap-7 rounded-[2rem] border border-white/75 bg-white/58 p-4 shadow-[0_26px_75px_rgba(30,41,59,0.09)] backdrop-blur-xl sm:p-7 lg:grid-cols-[0.86fr_1.14fr]">
      <div className="relative min-h-[430px] overflow-hidden rounded-[1.75rem] bg-[linear-gradient(180deg,#EAF2FF_0%,#FAF7F2_100%)] sm:min-h-[500px]">
        <div className="absolute inset-x-8 bottom-8 h-20 rounded-[50%] bg-[#1E293B]/10 blur-2xl" />
        <div className="absolute left-5 top-5 z-20 rounded-2xl bg-white/72 px-4 py-3 text-sm font-bold text-[#1E293B] shadow-lg backdrop-blur">
          <BookOpen className="mr-2 inline h-3.5 w-3.5 text-[#7C6CF6]" />
          praca z tekstem
        </div>
        <img src={TEACHER_BOOK} alt="Paulina podczas pracy z książką" className="absolute inset-x-0 bottom-0 mx-auto h-[440px] w-auto object-contain object-bottom drop-shadow-[0_24px_40px_rgba(30,41,59,0.2)] sm:h-[500px]" />
      </div>
      <div className="max-w-2xl py-2 lg:py-4">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E7C873]/45 bg-[#FFF7DC] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#6D5DE8]">
          <UserRound className="h-3 w-3" />
          O mnie
        </p>
        <h2 className="font-serif text-[2rem] font-semibold leading-[1.05] tracking-[-0.05em] text-[#1E293B] sm:text-[2.65rem] lg:text-[3.1rem]">
          Poznaj osobę, która poprowadzi Cię do wyniku
        </h2>
        <div className="mt-5 max-w-xl space-y-3.5 text-[1rem] leading-7 text-[#526174]">
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
        <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
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

const MaturaSection = () => {
  const [selectedEpoch, setSelectedEpoch] = useState("Romantyzm");

  return (
    <section id="matura" className="relative px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Strefa maturzysty"
          title="Materiały i warsztaty, które zamieniają stres przed maturą w plan działania."
          description="Zamiast długiej listy tematów — konkretne moduły pracy: lektura, motyw, kontekst, argument i gotowość do pisania."
        />
        <div className="mt-9 grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-[1.9rem] border border-white/75 bg-white/66 p-5 shadow-[0_24px_70px_rgba(30,41,59,0.09)] backdrop-blur-xl sm:p-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">Warsztaty z lektur obowiązkowych</p>
                <h3 className="mt-3 font-serif text-[1.9rem] font-semibold tracking-[-0.045em] text-[#1E293B]">2 godziny intensywnej pracy na tym, co naprawdę pojawia się na egzaminie</h3>
              </div>
              <BookMarked className="mt-1 h-5 w-5 shrink-0 text-[#7C6CF6]" />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {maturaFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="group rounded-[1.35rem] border border-[#1E293B]/7 bg-[#FAF7F2]/82 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_45px_rgba(30,41,59,0.09)]">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#EAF2FF] text-[#7C6CF6] transition-colors group-hover:bg-[#7C6CF6] group-hover:text-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-serif text-xl font-semibold tracking-[-0.045em] text-[#1E293B]">{feature.title}</h4>
                    </div>
                    <p className="text-sm leading-6 text-[#526174]">{feature.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[1.9rem] bg-[#1E293B] p-5 text-white shadow-[0_24px_70px_rgba(30,41,59,0.2)] sm:p-6">
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
            <div className="rounded-[1.9rem] border border-[#E7C873]/40 bg-[#FFF7DC] p-5 shadow-[0_20px_60px_rgba(231,200,115,0.16)] sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">Notatki PDF</p>
              <h3 className="mt-3 font-serif text-[1.85rem] font-semibold tracking-[-0.045em] text-[#1E293B]">Najważniejsze epoki i lektury w jednym miejscu</h3>
              <p className="mt-3 text-[#526174]">Czytelne materiały do powtórki — stworzone pod realny egzamin, nie pod teorię dla teorii.</p>
              <a href="#sklep" className="mt-5 inline-flex items-center gap-2 font-bold text-[#7C6CF6]">Zobacz materiały <ChevronRight className="h-3.5 w-3.5" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EighthGradeSection = () => (
  <section id="osmoklasista" className="px-4 py-9 sm:px-6 lg:py-12">
    <div className="mx-auto max-w-7xl rounded-[1.85rem] border border-white/75 bg-[#EAF2FF]/72 p-4 shadow-[0_22px_64px_rgba(30,41,59,0.08)] backdrop-blur-xl sm:p-6">
      <div className="grid items-start gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <SectionIntro
          align="left"
          eyebrow="Strefa ósmoklasisty"
          title="Kurs kompleksowy bez ciężkich bloków i bez zgadywania, co powtórzyć."
          description="Lektury, formy wypowiedzi i arkusze ułożone w krótkie moduły, które pomagają przygotować się spokojnie i regularnie."
        />
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {eighthGradeCards.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="group min-h-[88px] rounded-[1.15rem] border border-white/80 bg-white/78 p-3 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_34px_rgba(30,41,59,0.08)]">
                <span className="mb-2.5 grid h-8 w-8 place-items-center rounded-xl bg-[#FAF7F2] text-[#7C6CF6] transition-colors group-hover:bg-[#7C6CF6] group-hover:text-white">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <p className="text-[0.82rem] font-bold leading-5 tracking-[-0.02em] text-[#1E293B] sm:text-sm">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

const PdfShopSection = () => (
  <section id="sklep" className="px-4 py-10 sm:px-6 lg:py-14">
    <div className="mx-auto max-w-7xl">
      <SectionIntro
        eyebrow="Sklep z materiałami PDF"
        title="Cyfrowe materiały do spokojnej, konkretnej powtórki."
        description="Sekcję wizualną produktów dopracujemy po dodaniu właściwych okładek. Teraz najważniejsza jest czytelna oferta i szybka ścieżka zakupu."
      />
      <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div key={product.title} className="group rounded-[1.65rem] border border-white/75 bg-white/70 p-5 shadow-[0_18px_55px_rgba(30,41,59,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_22px_70px_rgba(124,108,246,0.12)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#EAF2FF] text-[#7C6CF6]">
                <FileText className="h-4 w-4" />
              </span>
              <span className="rounded-full bg-[#FFF7DC] px-3 py-1 text-xs font-black text-[#1E293B]">PDF</span>
            </div>
            <h3 className="font-serif text-[1.55rem] font-semibold tracking-[-0.045em] text-[#1E293B]">{product.title}</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-[#526174]">{product.description}</p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-base font-black tracking-[-0.04em] text-[#1E293B]">Cena wkrótce</span>
              <Button className="rounded-full bg-[#7C6CF6] px-5 font-bold text-white hover:bg-[#6655EA]">Kup materiał</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FreeStudentZoneSection = () => (
  <section id="darmowe" className="px-4 py-10 sm:px-6 lg:py-14">
    <div className="mx-auto grid max-w-7xl gap-6 overflow-hidden rounded-[2rem] bg-[#1E293B] p-5 text-white shadow-[0_28px_82px_rgba(30,41,59,0.2)] sm:p-7 lg:grid-cols-[1fr_0.9fr]">
      <div className="relative z-10">
        <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#E7C873]">Darmowa strefa ucznia</p>
        <h2 className="font-serif text-[2rem] font-semibold leading-[1.05] tracking-[-0.05em] sm:text-[2.65rem] lg:text-[3.15rem]">Darmowe materiały na dobry start</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/74 sm:text-lg">Zbuduj pierwsze poczucie pewności bez presji zakupu — a potem naturalnie przejdź do pełnych materiałów, warsztatów lub korepetycji.</p>
        <div className="mt-6 rounded-[1.65rem] border border-white/15 bg-white/8 p-5 backdrop-blur">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E7C873]">Materiał startowy</p>
          <h3 className="mt-3 font-serif text-[1.75rem] font-semibold tracking-[-0.045em]">Jak napisać rozprawkę na 100%?</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {freeBenefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 text-sm text-white/78">
                <Check className="h-3.5 w-3.5 shrink-0 text-[#E7C873]" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
        <Button className="mt-6 rounded-full bg-[#E7C873] px-7 py-6 font-black text-[#1E293B] hover:bg-[#f0d888]">Załóż darmowe konto <ArrowRight className="h-4 w-4" /></Button>
      </div>
      <div className="relative min-h-[300px]">
        <div className="relative ml-auto max-w-md rounded-[1.75rem] border border-white/15 bg-white/10 p-4 backdrop-blur-2xl">
          <div className="rounded-[1.4rem] bg-[#FAF7F2] p-5 text-[#1E293B]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">PDF startowy</p>
                <h4 className="mt-2 text-xl font-black tracking-[-0.04em]">Rozprawka bez paniki</h4>
              </div>
              <ClipboardCheck className="h-5 w-5 text-[#7C6CF6]" />
            </div>
            <div className="mt-5 space-y-3">
              {["Teza i argument", "Kontekst", "Wniosek", "Lista kontrolna"].map((step, index) => (
                <div key={step} className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-sm">
                  <span className="font-bold">{step}</span>
                  <span className={cn("rounded-full px-3 py-1 text-xs font-black", index < 3 ? "bg-[#EAF2FF] text-[#7C6CF6]" : "bg-[#E7C873] text-[#1E293B]")}>{index < 3 ? "lekcja" : "plan"}</span>
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
    <section id="korepetycje" className="px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-7 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionIntro
            align="left"
            eyebrow="Korepetycje indywidualne"
            title="Potrzebujesz indywidualnego wsparcia?"
            description="Elegancki, spokojny proces rezerwacji i lekcje online prowadzone pod konkretny cel: egzamin, zaległości albo pewność w pisaniu."
          />
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {tutoringBenefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-white/75 bg-white/68 p-3.5 shadow-sm backdrop-blur">
                <HeartHandshake className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7C6CF6]" />
                <span className="text-sm font-semibold leading-6 text-[#1E293B]">{benefit}</span>
              </div>
            ))}
          </div>
          <Button className="mt-6 rounded-full bg-[#7C6CF6] px-7 py-6 font-black text-white hover:bg-[#6655EA]">Zarezerwuj termin <CalendarDays className="h-4 w-4" /></Button>
        </div>
        <div className="rounded-[1.9rem] border border-white/75 bg-white/72 p-5 shadow-[0_26px_75px_rgba(30,41,59,0.1)] backdrop-blur-xl sm:p-6">
          <div className="rounded-[1.55rem] bg-[#FAF7F2] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">Kalendarz rezerwacji</p>
                <h3 className="mt-2 font-serif text-[1.75rem] font-semibold tracking-[-0.045em] text-[#1E293B]">Wybierz spokojny termin</h3>
              </div>
              <CalendarDays className="h-5 w-5 text-[#7C6CF6]" />
            </div>
            <div className="mt-5 grid grid-cols-5 gap-2">
              {["Pn", "Wt", "Śr", "Cz", "Pt"].map((day, index) => (
                <div key={day} className={cn("rounded-2xl p-3 text-center", index === 2 ? "bg-[#1E293B] text-white" : "bg-white text-[#1E293B]")}> 
                  <p className="text-xs font-bold text-current/70">{day}</p>
                  <p className="mt-1 text-base font-black">{12 + index}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
            <div className="mt-5 rounded-[1.35rem] bg-[#EAF2FF] p-5">
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
    <section id="strefa-ucznia" className="px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Strefa ucznia"
          title="Panel ucznia jako uporządkowana biblioteka nauki."
          description="Platforma jest dodatkiem do pracy z nauczycielem: pomaga przechowywać materiały, sprawdzać moduły i pamiętać o warsztatach."
        />
        <div className="mt-9 overflow-hidden rounded-[2rem] border border-white/75 bg-white/70 p-4 shadow-[0_28px_82px_rgba(30,41,59,0.11)] backdrop-blur-2xl sm:p-5">
          <div className="grid gap-4 rounded-[1.75rem] bg-[#1E293B] p-4 text-white lg:grid-cols-[270px_1fr] sm:p-5">
            <aside className="rounded-[1.4rem] bg-white/8 p-4">
              <KlasaMistrzowLogo markClassName="bg-white" textClassName="[&_span:first-child]:text-white [&_span:last-child]:text-[#E7C873]" />
              <div className="mt-6 grid gap-2">
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
            <main className="rounded-[1.4rem] bg-[#FAF7F2] p-5 text-[#1E293B]">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">{tab.label}</p>
                  <h3 className="mt-3 font-serif text-[1.75rem] font-semibold tracking-[-0.045em]">{tab.title}</h3>
                  <p className="mt-3 max-w-2xl text-[#526174]">{tab.description}</p>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7C6CF6] text-white shadow-xl">
                  <TabIcon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.78fr]">
                <div className="rounded-[1.4rem] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-black">Moje kursy i lektury</p>
                    <span className="rounded-full bg-[#E7C873] px-3 py-1 text-xs font-black">realny plan</span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
                <div className="rounded-[1.4rem] bg-[#EAF2FF] p-5 shadow-sm">
                  <p className="font-black">Najważniejsze teraz</p>
                  <div className="mt-4 space-y-3 text-sm font-semibold text-[#1E293B]">
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
  <footer className="px-4 pb-7 pt-10 sm:px-6">
    <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/75 bg-white/62 p-6 shadow-[0_22px_65px_rgba(30,41,59,0.08)] backdrop-blur-xl sm:p-7">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <KlasaMistrzowLogo />
          <p className="mt-5 max-w-md leading-7 text-[#526174]">Marka edukacyjna Pauliny Spruch-Wójtowicz: warsztaty, PDF, korepetycje i strefa ucznia w jednym spokojnym systemie nauki.</p>
        </div>
        <div className="grid gap-7 sm:grid-cols-3">
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
      <TrustBadgesSection />
      <AboutSection />
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

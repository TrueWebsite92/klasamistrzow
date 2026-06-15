import type { ReactNode } from "react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { KlasaMistrzowLogo } from "@/components/klasa-mistrzow-logo";

type StoreShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export const StoreShell = ({ title, subtitle, children }: StoreShellProps) => {
  return (
    <main className="min-h-screen bg-[#FAF7F2] px-4 pb-10 pt-6 text-[#1E293B] sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] border border-white/75 bg-white/72 p-4 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <KlasaMistrzowLogo />
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/">Strona główna</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/sklep">Sklep</Link>
              </Button>
              <Button asChild className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]">
                <Link to="/koszyk">
                  <ShoppingBag className="h-4 w-4" />
                  Koszyk
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <section className="mt-6 rounded-[2rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">Klasa Mistrzów</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.05em] text-[#1E293B] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#526174]">{subtitle}</p>
        </section>

        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
};
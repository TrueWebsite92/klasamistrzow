import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { KlasaMistrzowLogo } from "@/components/klasa-mistrzow-logo";
import { usePlatformDemo } from "@/hooks/use-platform-demo";

type PlatformShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export const PlatformShell = ({ title, subtitle, children }: PlatformShellProps) => {
  const { currentUser, logout } = usePlatformDemo();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B]">
      <header className="sticky top-0 z-40 border-b border-white/70 bg-[#FAF7F2]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <KlasaMistrzowLogo />
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">{currentUser?.name}</p>
              <p className="text-xs text-[#526174]">{currentUser?.email}</p>
            </div>
            <Button
              variant="outline"
              className="rounded-full border-[#1E293B]/10 bg-white/80"
              onClick={logout}
              asChild
            >
              <Link to="/login">
                Wyloguj
                <LogOut className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 inline-flex rounded-full border border-[#E7C873]/45 bg-white/70 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#7C6CF6]">
            Klasa Mistrzów
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#526174]">{subtitle}</p>
        </div>
        {children}
      </main>
    </div>
  );
};
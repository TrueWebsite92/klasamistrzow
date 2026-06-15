import { GraduationCap, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KlasaMistrzowLogo } from "@/components/klasa-mistrzow-logo";
import { usePlatformDemo } from "@/hooks/use-platform-demo";
import type { UserRole } from "@/lib/platform-types";

const testUsers: { role: UserRole; label: string; icon: typeof UserRound }[] = [
  { role: "uczen", label: "Wejdź jako Uczeń", icon: GraduationCap },
  { role: "nauczyciel", label: "Wejdź jako Nauczyciel", icon: UserRound },
];

const roleRouteMap: Record<UserRole, string> = {
  uczen: "/uczen",
  nauczyciel: "/nauczyciel",
};

type DemoAuthCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkLabel: string;
  footerLinkTo: string;
};

export const DemoAuthCard = ({
  title,
  subtitle,
  children,
  footerText,
  footerLinkLabel,
  footerLinkTo,
}: DemoAuthCardProps) => {
  const navigate = useNavigate();
  const { loginAsRole } = usePlatformDemo();

  const handleTestLogin = (role: UserRole) => {
    loginAsRole(role);
    navigate(roleRouteMap[role]);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 py-8 text-[#1E293B] sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="rounded-[2rem] border border-white/75 bg-white/60 p-6 shadow-[0_28px_80px_rgba(30,41,59,0.08)] backdrop-blur-xl sm:p-8">
          <KlasaMistrzowLogo />
          <h1 className="mt-8 font-serif text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#526174]">
            {subtitle}
          </p>

          <div className="mt-10 rounded-[1.6rem] border border-[#1E293B]/8 bg-[#FAF7F2] p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">Tryb testowy</p>
            <div className="mt-4 grid gap-3">
              {testUsers.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.role}
                    onClick={() => handleTestLogin(item.role)}
                    className="flex items-center justify-between rounded-[1.2rem] border border-[#1E293B]/8 bg-white px-4 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7C6CF6]/30"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#EAF2FF] text-[#7C6CF6]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="font-bold text-[#1E293B]">{item.label}</p>
                    </div>
                    <span className="text-sm font-bold text-[#7C6CF6]">Wejdź</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <Card className="rounded-[2rem] border-white/75 bg-white/72 shadow-[0_28px_80px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <CardHeader className="pb-4">
            <CardTitle className="font-serif text-3xl tracking-[-0.04em]">{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {children}
            <p className="text-sm text-[#526174]">
              {footerText}{" "}
              <Link to={footerLinkTo} className="font-bold text-[#7C6CF6]">
                {footerLinkLabel}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
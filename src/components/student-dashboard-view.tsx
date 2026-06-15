import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  PlayCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlatformShell } from "@/components/platform-shell";
import { usePlatformDemo } from "@/hooks/use-platform-demo";

export const StudentDashboardView = () => {
  const { currentUser, state, studentBookings, studentProgress, studentPurchases, addBooking } = usePlatformDemo();

  const darmoweMaterialy = state.materials.filter((material) => material.accessType === "darmowy");
  const mojeMaterialy = state.materials.filter((material) =>
    studentPurchases.some((purchase) => purchase.materialId === material.id),
  );
  const zakupioneProdukty = mojeMaterialy.filter((material) => material.accessType === "platny");
  const lekcjeWideo = state.videos.filter((video) => video.status === "widoczny");
  const dostepneTerminy = state.calendarSlots.filter((slot) => slot.status === "dostepny");
  const mojeTerminy = studentBookings
    .map((booking) => {
      const slot = state.calendarSlots.find((item) => item.id === booking.slotId);
      return slot ? { ...slot, topic: booking.topic } : null;
    })
    .filter(Boolean);

  return (
    <PlatformShell
      title={`Witaj, ${currentUser?.name ?? "Uczniu"}`}
      subtitle="Tutaj znajdziesz swoje materiały, lekcje wideo, konsultacje oraz postęp nauki uporządkowany w spokojny i czytelny sposób."
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">Twoja ścieżka nauki</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.04em] text-[#1E293B]">
            {currentUser?.learningPath ?? "Ścieżka startowa"}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.3rem] bg-[#FAF7F2] p-4">
              <p className="text-sm font-bold text-[#526174]">Następny krok</p>
              <p className="mt-2 font-semibold text-[#1E293B]">Powtórz rozprawkę krok po kroku</p>
            </div>
            <div className="rounded-[1.3rem] bg-[#EAF2FF] p-4">
              <p className="text-sm font-bold text-[#526174]">Najbliższy cel</p>
              <p className="mt-2 font-semibold text-[#1E293B]">Utrwalić motywy literackie</p>
            </div>
            <div className="rounded-[1.3rem] bg-[#FFF7DC] p-4">
              <p className="text-sm font-bold text-[#526174]">Rekomendacja</p>
              <p className="mt-2 font-semibold text-[#1E293B]">Umów konsultację przed próbną maturą</p>
            </div>
          </div>
        </section>

        <section className="rounded-[1.8rem] border border-white/75 bg-[#1E293B] p-6 text-white shadow-[0_24px_70px_rgba(30,41,59,0.16)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E7C873]">Postęp nauki</p>
          <div className="mt-5 grid gap-3">
            {studentProgress.map((item) => (
              <div key={item.id} className="rounded-[1.2rem] bg-white/8 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{item.title}</p>
                  <Badge className="border-0 bg-white/12 text-white hover:bg-white/12">{item.status}</Badge>
                </div>
                {typeof item.progress === "number" && (
                  <div className="mt-3">
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-[#E7C873]" style={{ width: `${item.progress}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-white/70">{item.progress}% ukończono</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#EAF2FF] text-[#7C6CF6]">
              <BookOpen className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Moje materiały</h3>
              <p className="text-sm text-[#526174]">Wszystko, co zostało przypisane do Twojego konta</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {mojeMaterialy.map((material) => (
              <div key={material.id} className="flex items-center justify-between rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <div>
                  <p className="font-semibold text-[#1E293B]">{material.title}</p>
                  <p className="text-sm text-[#526174]">{material.description}</p>
                </div>
                <Badge className="border-0 bg-[#EAF2FF] text-[#7C6CF6] hover:bg-[#EAF2FF]">Dostęp</Badge>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#FFF7DC] text-[#1E293B]">
              <Download className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Materiały darmowe</h3>
              <p className="text-sm text-[#526174]">Dostępne automatycznie po założeniu konta</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {darmoweMaterialy.map((material) => (
              <div key={material.id} className="flex items-center justify-between rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <div>
                  <p className="font-semibold text-[#1E293B]">{material.title}</p>
                  <p className="text-sm text-[#526174]">{material.description}</p>
                </div>
                <Badge className="border-0 bg-[#FFF7DC] text-[#1E293B] hover:bg-[#FFF7DC]">Dostępne</Badge>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#FFF7DC] text-[#1E293B]">
              <FileText className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Zakupione produkty</h3>
              <p className="text-sm text-[#526174]">Twoje materiały i kursy dostępne na koncie</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {zakupioneProdukty.map((material) => (
              <div key={material.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <p className="font-semibold text-[#1E293B]">{material.title}</p>
                <p className="mt-1 text-sm text-[#526174]">{material.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#EAF2FF] text-[#7C6CF6]">
              <PlayCircle className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Lekcje wideo</h3>
              <p className="text-sm text-[#526174]">Nagrania do spokojnej i uporządkowanej nauki</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {lekcjeWideo.map((video) => (
              <div key={video.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[#1E293B]">{video.title}</p>
                  <Badge className="border-0 bg-[#EAF2FF] text-[#7C6CF6] hover:bg-[#EAF2FF]">Wideo</Badge>
                </div>
                <p className="mt-2 text-sm text-[#526174]">{video.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#FFF7DC] text-[#1E293B]">
              <CalendarDays className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Umów konsultację</h3>
              <p className="text-sm text-[#526174]">Wybierz dogodny termin spotkania</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {dostepneTerminy.map((slot) => (
              <div key={slot.id} className="flex flex-col gap-3 rounded-[1.2rem] bg-[#FAF7F2] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-[#1E293B]">{slot.date} · {slot.time}</p>
                  <p className="text-sm text-[#526174]">{slot.duration} · {slot.price} zł</p>
                </div>
                <Button
                  className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]"
                  onClick={() => currentUser && addBooking(currentUser.id, slot.id, "Konsultacja indywidualna")}
                >
                  Zarezerwuj termin
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.8rem] border border-white/75 bg-[#1E293B] p-6 text-white shadow-[0_24px_70px_rgba(30,41,59,0.16)]">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-[#E7C873]" />
            <p className="font-serif text-2xl font-semibold tracking-[-0.04em]">Moje terminy</p>
          </div>
          <div className="mt-5 grid gap-3">
            {mojeTerminy.length > 0 ? (
              mojeTerminy.map((slot) => (
                <div key={slot?.id} className="rounded-[1rem] bg-white/8 p-4">
                  <p className="font-semibold">{slot?.date} · {slot?.time}</p>
                  <p className="mt-1 text-sm text-white/70">{slot?.topic}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-white/70">Nie masz jeszcze zapisanych terminów.</p>
            )}
          </div>
        </section>
      </div>

      <div className="mt-6 rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#EAF2FF] text-[#7C6CF6]">
            <GraduationCap className="h-4 w-4" />
          </span>
          <div>
            <h3 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Postęp nauki</h3>
            <p className="text-sm text-[#526174]">Realny obraz pracy zamiast przypadkowych wykresów</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {studentProgress.map((item) => (
            <div key={item.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#7C6CF6]" />
                <p className="font-semibold text-[#1E293B]">{item.title}</p>
              </div>
              <p className="mt-3 text-sm text-[#526174]">
                {item.progress ? `${item.progress}%` : item.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PlatformShell>
  );
};
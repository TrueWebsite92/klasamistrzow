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

  const freeMaterials = state.materials.filter((material) => material.accessType === "free");
  const purchasedMaterials = state.materials.filter((material) =>
    studentPurchases.some((purchase) => purchase.materialId === material.id) && material.accessType === "paid",
  );
  const availableSlots = state.calendarSlots.filter((slot) => slot.status === "available");
  const mySlots = studentBookings.map((booking) => {
    const slot = state.calendarSlots.find((item) => item.id === booking.slotId);
    return slot ? { ...slot, topic: booking.topic } : null;
  }).filter(Boolean);

  return (
    <PlatformShell
      title={`Witaj, ${currentUser?.name ?? "Uczniu"}`}
      subtitle="To jest demonstracyjna wersja panelu ucznia — pokazuje, jak będzie wyglądać dostęp do materiałów, lekcji, terminów i postępów po wdrożeniu pełnej platformy."
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7C6CF6]">Twoja ścieżka</p>
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
              <p className="mt-2 font-semibold text-[#1E293B]">Zarezerwuj konsultację przed próbną maturą</p>
            </div>
          </div>
        </section>

        <section className="rounded-[1.8rem] border border-white/75 bg-[#1E293B] p-6 text-white shadow-[0_24px_70px_rgba(30,41,59,0.16)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E7C873]">Postęp</p>
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
              <Download className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Darmowe materiały</h3>
              <p className="text-sm text-[#526174]">Odblokowane automatycznie po rejestracji</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {freeMaterials.map((material) => (
              <div key={material.id} className="flex items-center justify-between rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <div>
                  <p className="font-semibold text-[#1E293B]">{material.title}</p>
                  <p className="text-sm text-[#526174]">{material.description}</p>
                </div>
                <Badge className="border-0 bg-[#EAF2FF] text-[#7C6CF6] hover:bg-[#EAF2FF]">Dostępne</Badge>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#FFF7DC] text-[#1E293B]">
              <FileText className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Kupione materiały PDF</h3>
              <p className="text-sm text-[#526174]">Materiały przypisane do konta ucznia</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {purchasedMaterials.map((material) => (
              <div key={material.id} className="flex items-center justify-between rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <div>
                  <p className="font-semibold text-[#1E293B]">{material.title}</p>
                  <p className="text-sm text-[#526174]">{material.description}</p>
                </div>
                <Badge className="border-0 bg-[#FFF7DC] text-[#1E293B] hover:bg-[#FFF7DC]">PDF</Badge>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#EAF2FF] text-[#7C6CF6]">
              <PlayCircle className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Lekcje wideo</h3>
              <p className="text-sm text-[#526174]">Demo biblioteki lekcji</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {state.videos.map((video) => (
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

        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#FFF7DC] text-[#1E293B]">
              <CalendarDays className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Kalendarz konsultacji</h3>
              <p className="text-sm text-[#526174]">Wybierz termin demonstracyjny</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {availableSlots.map((slot) => (
              <div key={slot.id} className="flex flex-col gap-3 rounded-[1.2rem] bg-[#FAF7F2] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-[#1E293B]">{slot.date} · {slot.time}</p>
                  <p className="text-sm text-[#526174]">{slot.duration} · {slot.price} zł</p>
                </div>
                <Button
                  className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]"
                  onClick={() => currentUser && addBooking(currentUser.id, slot.id, "Konsultacja demonstracyjna")}
                >
                  Zarezerwuj demo
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.3rem] bg-[#1E293B] p-5 text-white">
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-[#E7C873]" />
              <p className="font-semibold">Moje terminy</p>
            </div>
            <div className="mt-4 grid gap-3">
              {mySlots.length > 0 ? (
                mySlots.map((slot) => (
                  <div key={slot?.id} className="rounded-[1rem] bg-white/8 p-4">
                    <p className="font-semibold">{slot?.date} · {slot?.time}</p>
                    <p className="mt-1 text-sm text-white/70">{slot?.topic}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/70">Nie masz jeszcze zapisanych terminów.</p>
              )}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-6 rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#EAF2FF] text-[#7C6CF6]">
            <GraduationCap className="h-4 w-4" />
          </span>
          <div>
            <h3 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Twoja nauka w praktyce</h3>
            <p className="text-sm text-[#526174]">Statusy zamiast wykresów i sztucznych analiz</p>
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
import { BookOpen, CalendarDays, FileText, NotebookPen, UserRound } from "lucide-react";

import { PlatformShell } from "@/components/platform-shell";
import { usePlatformDemo } from "@/hooks/use-platform-demo";

export const TeacherDashboardView = () => {
  const { state } = usePlatformDemo();

  const upcomingConsultations = state.bookings.map((booking) => {
    const slot = state.calendarSlots.find((item) => item.id === booking.slotId);
    const student = state.users.find((item) => item.id === booking.userId);
    return slot && student
      ? {
          id: booking.id,
          studentName: student.name,
          date: slot.date,
          time: slot.time,
          topic: booking.topic,
        }
      : null;
  }).filter(Boolean);

  const students = state.users.filter((user) => user.role === "student");

  return (
    <PlatformShell
      title="Panel nauczyciela"
      subtitle="Prosty widok demonstracyjny dla prowadzącej: konsultacje, uczniowie, materiały, kalendarz i szybkie notatki."
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-[#7C6CF6]" />
            <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Nadchodzące konsultacje</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {upcomingConsultations.map((item) => (
              <div key={item?.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <p className="font-semibold text-[#1E293B]">{item?.studentName}</p>
                <p className="mt-1 text-sm text-[#526174]">{item?.date} · {item?.time}</p>
                <p className="mt-2 text-sm text-[#526174]">{item?.topic}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <UserRound className="h-5 w-5 text-[#7C6CF6]" />
            <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Uczniowie</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {students.map((student) => (
              <div key={student.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <p className="font-semibold text-[#1E293B]">{student.name}</p>
                <p className="mt-1 text-sm text-[#526174]">{student.email}</p>
                <p className="mt-2 text-sm text-[#526174]">{student.learningPath}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-[#7C6CF6]" />
            <h2 className="font-serif text-xl font-semibold tracking-[-0.04em]">Materiały</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {state.materials.slice(0, 4).map((material) => (
              <div key={material.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4 text-sm">
                <p className="font-semibold text-[#1E293B]">{material.title}</p>
                <p className="mt-1 text-[#526174]">{material.category}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-[#7C6CF6]" />
            <h2 className="font-serif text-xl font-semibold tracking-[-0.04em]">Kalendarz</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {state.calendarSlots.slice(0, 4).map((slot) => (
              <div key={slot.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4 text-sm">
                <p className="font-semibold text-[#1E293B]">{slot.date} · {slot.time}</p>
                <p className="mt-1 text-[#526174]">{slot.status}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <NotebookPen className="h-5 w-5 text-[#7C6CF6]" />
            <h2 className="font-serif text-xl font-semibold tracking-[-0.04em]">Szybkie notatki</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {state.teacherNotes.map((note) => (
              <div key={note.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4 text-sm">
                <p className="font-semibold text-[#1E293B]">{note.studentName}</p>
                <p className="mt-2 text-[#526174]">{note.note}</p>
                <p className="mt-2 text-xs text-[#7C6CF6]">{note.date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PlatformShell>
  );
};
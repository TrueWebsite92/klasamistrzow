import { useMemo, useState } from "react";
import {
  CalendarDays,
  FileText,
  FolderOpen,
  PlayCircle,
  ShieldCheck,
  ShoppingBag,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlatformShell } from "@/components/platform-shell";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { usePlatformDemo } from "@/hooks/use-platform-demo";
import type {
  AccessType,
  MaterialCategory,
  MaterialType,
  PlatformMaterial,
  PlatformPdf,
  PlatformVideo,
  SlotStatus,
  VisibilityStatus,
} from "@/lib/platform-types";

const materialInitialState: Omit<PlatformMaterial, "id"> = {
  title: "",
  description: "",
  type: "PDF",
  category: "matura",
  price: 0,
  visibility: "active",
  accessType: "paid",
  featuredOnHomepage: false,
};

const videoInitialState: Omit<PlatformVideo, "id"> = {
  title: "",
  description: "",
  videoUrl: "",
  category: "matura",
  status: "active",
};

const pdfInitialState: Omit<PlatformPdf, "id"> = {
  title: "",
  description: "",
  fileUrl: "",
  price: 0,
  category: "lektury",
  coverImage: "",
  accessType: "paid",
};

const slotInitialState = {
  date: "",
  time: "",
  duration: "60 min",
  price: 140,
  status: "available" as SlotStatus,
};

export const AdminDashboardView = () => {
  const {
    state,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    addVideo,
    updateVideo,
    deleteVideo,
    addPdf,
    updatePdf,
    deletePdf,
    addSlot,
    updateSlot,
    deleteSlot,
    grantAccess,
  } = usePlatformDemo();

  const [materialForm, setMaterialForm] = useState(materialInitialState);
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);

  const [videoForm, setVideoForm] = useState(videoInitialState);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);

  const [pdfForm, setPdfForm] = useState(pdfInitialState);
  const [editingPdfId, setEditingPdfId] = useState<string | null>(null);

  const [slotForm, setSlotForm] = useState(slotInitialState);
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);

  const students = useMemo(() => state.users.filter((user) => user.role === "student"), [state.users]);

  const handleMaterialSubmit = () => {
    if (editingMaterialId) {
      updateMaterial(editingMaterialId, materialForm);
    } else {
      addMaterial(materialForm);
    }

    setMaterialForm(materialInitialState);
    setEditingMaterialId(null);
  };

  const handleVideoSubmit = () => {
    if (editingVideoId) {
      updateVideo(editingVideoId, videoForm);
    } else {
      addVideo(videoForm);
    }

    setVideoForm(videoInitialState);
    setEditingVideoId(null);
  };

  const handlePdfSubmit = () => {
    if (editingPdfId) {
      updatePdf(editingPdfId, pdfForm);
    } else {
      addPdf(pdfForm);
    }

    setPdfForm(pdfInitialState);
    setEditingPdfId(null);
  };

  const handleSlotSubmit = () => {
    if (editingSlotId) {
      updateSlot(editingSlotId, slotForm);
    } else {
      addSlot(slotForm);
    }

    setSlotForm(slotInitialState);
    setEditingSlotId(null);
  };

  return (
    <PlatformShell
      title="Panel administratora"
      subtitle="Prosty panel demonstracyjny do zarządzania materiałami, lekcjami, PDF-ami, terminami, uczniami i dostępami — bez skomplikowanego interfejsu SaaS."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {[
          ["Materiały", state.materials.length, FolderOpen],
          ["Wideo", state.videos.length, PlayCircle],
          ["PDF", state.pdfs.length, FileText],
          ["Terminy", state.calendarSlots.length, CalendarDays],
          ["Uczniowie", students.length, Users],
          ["Zamówienia", state.purchases.length, ShoppingBag],
        ].map(([label, value, Icon]) => {
          const IconComponent = Icon as typeof FolderOpen;
          return (
            <div key={label as string} className="rounded-[1.4rem] border border-white/75 bg-white/72 p-5 shadow-[0_18px_55px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#526174]">{label as string}</p>
                <IconComponent className="h-4 w-4 text-[#7C6CF6]" />
              </div>
              <p className="mt-3 font-serif text-3xl font-semibold tracking-[-0.05em] text-[#1E293B]">{value as number}</p>
            </div>
          );
        })}
      </div>

      <Tabs defaultValue="materials" className="mt-6">
        <TabsList className="h-auto rounded-[1.2rem] bg-white/70 p-1">
          <TabsTrigger value="materials" className="rounded-[0.9rem]">Materiały</TabsTrigger>
          <TabsTrigger value="videos" className="rounded-[0.9rem]">Wideo</TabsTrigger>
          <TabsTrigger value="pdfs" className="rounded-[0.9rem]">PDF</TabsTrigger>
          <TabsTrigger value="slots" className="rounded-[0.9rem]">Terminy</TabsTrigger>
          <TabsTrigger value="students" className="rounded-[0.9rem]">Uczniowie</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-[0.9rem]">Dostępy</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="mt-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <FolderOpen className="h-5 w-5 text-[#7C6CF6]" />
                <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Dodaj lub edytuj materiał</h2>
              </div>
              <div className="mt-5 grid gap-4">
                <Input placeholder="Tytuł" value={materialForm.title} onChange={(event) => setMaterialForm((prev) => ({ ...prev, title: event.target.value }))} />
                <Textarea placeholder="Opis" value={materialForm.description} onChange={(event) => setMaterialForm((prev) => ({ ...prev, description: event.target.value }))} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select value={materialForm.type} onValueChange={(value: MaterialType) => setMaterialForm((prev) => ({ ...prev, type: value }))}>
                    <SelectTrigger><SelectValue placeholder="Typ" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="video">video</SelectItem>
                      <SelectItem value="free-material">free material</SelectItem>
                      <SelectItem value="workshop">workshop</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={materialForm.category} onValueChange={(value: MaterialCategory) => setMaterialForm((prev) => ({ ...prev, category: value }))}>
                    <SelectTrigger><SelectValue placeholder="Kategoria" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matura">matura</SelectItem>
                      <SelectItem value="ósmoklasista">ósmoklasista</SelectItem>
                      <SelectItem value="lektury">lektury</SelectItem>
                      <SelectItem value="rozprawka">rozprawka</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input type="number" placeholder="Cena" value={materialForm.price} onChange={(event) => setMaterialForm((prev) => ({ ...prev, price: Number(event.target.value) }))} />
                  <Select value={materialForm.visibility} onValueChange={(value: VisibilityStatus) => setMaterialForm((prev) => ({ ...prev, visibility: value }))}>
                    <SelectTrigger><SelectValue placeholder="Widoczność" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">active</SelectItem>
                      <SelectItem value="hidden">hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select value={materialForm.accessType} onValueChange={(value: AccessType) => setMaterialForm((prev) => ({ ...prev, accessType: value }))}>
                    <SelectTrigger><SelectValue placeholder="Dostęp" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">free</SelectItem>
                      <SelectItem value="paid">paid</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={materialForm.featuredOnHomepage ? "yes" : "no"}
                    onValueChange={(value) => setMaterialForm((prev) => ({ ...prev, featuredOnHomepage: value === "yes" }))}
                  >
                    <SelectTrigger><SelectValue placeholder="Na stronie głównej" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">yes</SelectItem>
                      <SelectItem value="no">no</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handleMaterialSubmit}>
                  {editingMaterialId ? "Zapisz zmiany" : "Dodaj materiał"}
                </Button>
              </div>
            </section>

            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Lista materiałów</h2>
              <div className="mt-5 grid gap-3">
                {state.materials.map((material) => (
                  <div key={material.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-semibold text-[#1E293B]">{material.title}</p>
                        <p className="mt-1 text-sm text-[#526174]">{material.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge className="border-0 bg-[#EAF2FF] text-[#7C6CF6] hover:bg-[#EAF2FF]">{material.type}</Badge>
                          <Badge className="border-0 bg-[#FFF7DC] text-[#1E293B] hover:bg-[#FFF7DC]">{material.category}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="rounded-full"
                          onClick={() => {
                            setEditingMaterialId(material.id);
                            setMaterialForm({
                              title: material.title,
                              description: material.description,
                              type: material.type,
                              category: material.category,
                              price: material.price,
                              visibility: material.visibility,
                              accessType: material.accessType,
                              featuredOnHomepage: material.featuredOnHomepage,
                            });
                          }}
                        >
                          Edytuj
                        </Button>
                        <Button variant="outline" className="rounded-full" onClick={() => deleteMaterial(material.id)}>
                          Usuń
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Dodaj lub edytuj lekcję wideo</h2>
              <div className="mt-5 grid gap-4">
                <Input placeholder="Tytuł" value={videoForm.title} onChange={(event) => setVideoForm((prev) => ({ ...prev, title: event.target.value }))} />
                <Textarea placeholder="Opis" value={videoForm.description} onChange={(event) => setVideoForm((prev) => ({ ...prev, description: event.target.value }))} />
                <Input placeholder="Adres wideo" value={videoForm.videoUrl} onChange={(event) => setVideoForm((prev) => ({ ...prev, videoUrl: event.target.value }))} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select value={videoForm.category} onValueChange={(value: MaterialCategory) => setVideoForm((prev) => ({ ...prev, category: value }))}>
                    <SelectTrigger><SelectValue placeholder="Kategoria" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matura">matura</SelectItem>
                      <SelectItem value="ósmoklasista">ósmoklasista</SelectItem>
                      <SelectItem value="lektury">lektury</SelectItem>
                      <SelectItem value="rozprawka">rozprawka</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={videoForm.status} onValueChange={(value: VisibilityStatus) => setVideoForm((prev) => ({ ...prev, status: value }))}>
                    <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">active</SelectItem>
                      <SelectItem value="hidden">hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handleVideoSubmit}>
                  {editingVideoId ? "Zapisz zmiany" : "Dodaj lekcję"}
                </Button>
              </div>
            </section>

            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Lista lekcji wideo</h2>
              <div className="mt-5 grid gap-3">
                {state.videos.map((video) => (
                  <div key={video.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                    <p className="font-semibold text-[#1E293B]">{video.title}</p>
                    <p className="mt-1 text-sm text-[#526174]">{video.description}</p>
                    <div className="mt-3 flex gap-2">
                      <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() => {
                          setEditingVideoId(video.id);
                          setVideoForm({
                            title: video.title,
                            description: video.description,
                            videoUrl: video.videoUrl,
                            category: video.category,
                            status: video.status,
                          });
                        }}
                      >
                        Edytuj
                      </Button>
                      <Button variant="outline" className="rounded-full" onClick={() => deleteVideo(video.id)}>
                        Usuń
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="pdfs" className="mt-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Dodaj lub edytuj PDF</h2>
              <div className="mt-5 grid gap-4">
                <Input placeholder="Tytuł" value={pdfForm.title} onChange={(event) => setPdfForm((prev) => ({ ...prev, title: event.target.value }))} />
                <Textarea placeholder="Opis" value={pdfForm.description} onChange={(event) => setPdfForm((prev) => ({ ...prev, description: event.target.value }))} />
                <Input placeholder="Adres pliku" value={pdfForm.fileUrl} onChange={(event) => setPdfForm((prev) => ({ ...prev, fileUrl: event.target.value }))} />
                <Input placeholder="Placeholder okładki" value={pdfForm.coverImage} onChange={(event) => setPdfForm((prev) => ({ ...prev, coverImage: event.target.value }))} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input type="number" placeholder="Cena" value={pdfForm.price} onChange={(event) => setPdfForm((prev) => ({ ...prev, price: Number(event.target.value) }))} />
                  <Select value={pdfForm.category} onValueChange={(value: MaterialCategory) => setPdfForm((prev) => ({ ...prev, category: value }))}>
                    <SelectTrigger><SelectValue placeholder="Kategoria" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matura">matura</SelectItem>
                      <SelectItem value="ósmoklasista">ósmoklasista</SelectItem>
                      <SelectItem value="lektury">lektury</SelectItem>
                      <SelectItem value="rozprawka">rozprawka</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Select value={pdfForm.accessType} onValueChange={(value: AccessType) => setPdfForm((prev) => ({ ...prev, accessType: value }))}>
                  <SelectTrigger><SelectValue placeholder="Dostęp" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">free</SelectItem>
                    <SelectItem value="paid">paid</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handlePdfSubmit}>
                  {editingPdfId ? "Zapisz zmiany" : "Dodaj PDF"}
                </Button>
              </div>
            </section>

            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Lista PDF</h2>
              <div className="mt-5 grid gap-3">
                {state.pdfs.map((pdf) => (
                  <div key={pdf.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                    <p className="font-semibold text-[#1E293B]">{pdf.title}</p>
                    <p className="mt-1 text-sm text-[#526174]">{pdf.description}</p>
                    <div className="mt-3 flex gap-2">
                      <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() => {
                          setEditingPdfId(pdf.id);
                          setPdfForm({
                            title: pdf.title,
                            description: pdf.description,
                            fileUrl: pdf.fileUrl,
                            price: pdf.price,
                            category: pdf.category,
                            coverImage: pdf.coverImage,
                            accessType: pdf.accessType,
                          });
                        }}
                      >
                        Edytuj
                      </Button>
                      <Button variant="outline" className="rounded-full" onClick={() => deletePdf(pdf.id)}>
                        Usuń
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="slots" className="mt-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Dodaj lub edytuj termin</h2>
              <div className="mt-5 grid gap-4">
                <Input type="date" value={slotForm.date} onChange={(event) => setSlotForm((prev) => ({ ...prev, date: event.target.value }))} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input type="time" value={slotForm.time} onChange={(event) => setSlotForm((prev) => ({ ...prev, time: event.target.value }))} />
                  <Input value={slotForm.duration} onChange={(event) => setSlotForm((prev) => ({ ...prev, duration: event.target.value }))} />
                </div>
                <Input type="number" value={slotForm.price} onChange={(event) => setSlotForm((prev) => ({ ...prev, price: Number(event.target.value) }))} />
                <Select value={slotForm.status} onValueChange={(value: SlotStatus) => setSlotForm((prev) => ({ ...prev, status: value }))}>
                  <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">available</SelectItem>
                    <SelectItem value="booked">booked</SelectItem>
                    <SelectItem value="hidden">hidden</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handleSlotSubmit}>
                  {editingSlotId ? "Zapisz zmiany" : "Dodaj termin"}
                </Button>
              </div>
            </section>

            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Lista terminów</h2>
              <div className="mt-5 grid gap-3">
                {state.calendarSlots.map((slot) => (
                  <div key={slot.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                    <p className="font-semibold text-[#1E293B]">{slot.date} · {slot.time}</p>
                    <p className="mt-1 text-sm text-[#526174]">{slot.duration} · {slot.price} zł · {slot.status}</p>
                    <div className="mt-3 flex gap-2">
                      <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() => {
                          setEditingSlotId(slot.id);
                          setSlotForm({
                            date: slot.date,
                            time: slot.time,
                            duration: slot.duration,
                            price: slot.price,
                            status: slot.status,
                          });
                        }}
                      >
                        Edytuj
                      </Button>
                      <Button variant="outline" className="rounded-full" onClick={() => deleteSlot(slot.id)}>
                        Usuń
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="students" className="mt-6">
          <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-[#7C6CF6]" />
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Lista uczniów</h2>
            </div>
            <div className="mt-5 grid gap-4">
              {students.map((student) => {
                const purchases = state.purchases.filter((purchase) => purchase.userId === student.id);
                const bookings = state.bookings.filter((booking) => booking.userId === student.id);
                const progress = state.studentProgress.filter((item) => item.userId === student.id);

                return (
                  <div key={student.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-5">
                    <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[1fr_1fr_1fr_1fr]">
                      <div>
                        <p className="font-semibold text-[#1E293B]">{student.name}</p>
                        <p className="mt-1 text-sm text-[#526174]">{student.email}</p>
                        <p className="mt-1 text-sm text-[#526174]">Rejestracja: {student.registeredDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1E293B]">Kupione materiały</p>
                        <p className="mt-1 text-sm text-[#526174]">{purchases.length}</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1E293B]">Zarezerwowane lekcje</p>
                        <p className="mt-1 text-sm text-[#526174]">{bookings.length}</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1E293B]">Postęp</p>
                        <p className="mt-1 text-sm text-[#526174]">{progress.map((item) => item.title).join(", ")}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[#7C6CF6]" />
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Zamówienia i dostęp</h2>
            </div>
            <div className="mt-5 grid gap-4">
              {state.purchases.map((purchase) => {
                const user = state.users.find((item) => item.id === purchase.userId);
                const material = state.materials.find((item) => item.id === purchase.materialId);

                return (
                  <div key={purchase.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-[#1E293B]">{user?.name}</p>
                        <p className="mt-1 text-sm text-[#526174]">{material?.title}</p>
                      </div>
                      <Badge className="w-fit border-0 bg-[#EAF2FF] text-[#7C6CF6] hover:bg-[#EAF2FF]">
                        {purchase.grantedByAdmin ? "Nadano ręcznie" : "Zakup demo"}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]">
                    Nadaj dostęp ręcznie
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-[1.5rem] border-white/70 bg-[#FAF7F2]">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-2xl tracking-[-0.04em]">Nadaj dostęp do materiału</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    {students.map((student) => (
                      <div key={student.id} className="rounded-[1.2rem] bg-white p-4">
                        <p className="font-semibold text-[#1E293B]">{student.name}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {state.materials
                            .filter((material) => material.accessType === "paid")
                            .slice(0, 4)
                            .map((material) => (
                              <Button
                                key={material.id}
                                variant="outline"
                                className="rounded-full"
                                onClick={() => grantAccess(student.id, material.id)}
                              >
                                {material.title}
                              </Button>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </PlatformShell>
  );
};
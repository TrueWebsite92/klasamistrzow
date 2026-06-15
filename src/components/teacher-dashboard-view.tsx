import { useMemo, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  FileText,
  FolderOpen,
  Package,
  PlayCircle,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PlatformShell } from "@/components/platform-shell";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  type: "pdf",
  category: "lektury",
  price: 0,
  visibility: "widoczny",
  accessType: "platny",
  featuredOnHomepage: true,
};

const videoInitialState: Omit<PlatformVideo, "id"> = {
  title: "",
  description: "",
  videoUrl: "",
  category: "matura",
  status: "widoczny",
};

const pdfInitialState: Omit<PlatformPdf, "id"> = {
  title: "",
  description: "",
  fileUrl: "",
  price: 0,
  category: "lektury",
  coverImage: "",
  accessType: "platny",
};

const slotInitialState = {
  date: "",
  time: "",
  duration: "60 minut",
  price: 140,
  status: "dostepny" as SlotStatus,
};

const categoryLabels: Record<MaterialCategory, string> = {
  lektury: "Lektury",
  rozprawka: "Rozprawka",
  matura: "Matura",
  "egzamin-osmoklasisty": "Egzamin ósmoklasisty",
  "motywy-literackie": "Motywy literackie",
};

const materialTypeLabels: Record<MaterialType, string> = {
  pdf: "PDF",
  "material-wideo": "Materiał wideo",
  "material-darmowy": "Darmowy materiał",
  "warsztat-online": "Warsztat online",
};

const visibilityLabels: Record<VisibilityStatus, string> = {
  widoczny: "Widoczny",
  ukryty: "Ukryty",
};

const slotStatusLabels: Record<SlotStatus, string> = {
  dostepny: "Dostępny",
  zarezerwowany: "Zarezerwowany",
  ukryty: "Ukryty",
};

export const TeacherDashboardView = () => {
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

  const uczniowie = useMemo(() => state.users.filter((user) => user.role === "uczen"), [state.users]);

  const nadchodzaceKonsultacje = state.bookings
    .map((booking) => {
      const slot = state.calendarSlots.find((item) => item.id === booking.slotId);
      const uczen = state.users.find((item) => item.id === booking.userId);
      return slot && uczen
        ? {
            id: booking.id,
            studentName: uczen.name,
            date: slot.date,
            time: slot.time,
            topic: booking.topic,
          }
        : null;
    })
    .filter(Boolean);

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
      title="Panel nauczyciela"
      subtitle="Tu zarządzasz materiałami, kursami, terminami spotkań oraz swoimi uczniami."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {[
          ["Materiały", state.materials.length, FolderOpen],
          ["Materiały wideo", state.videos.length, PlayCircle],
          ["PDF", state.pdfs.length, FileText],
          ["Terminy konsultacji", state.calendarSlots.length, CalendarDays],
          ["Uczniowie", uczniowie.length, Users],
          ["Zamówienia", state.purchases.length, Package],
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

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-[#7C6CF6]" />
            <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Nadchodzące konsultacje</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {nadchodzaceKonsultacje.map((item) => (
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
            <Users className="h-5 w-5 text-[#7C6CF6]" />
            <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Uczniowie</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {uczniowie.map((uczen) => (
              <div key={uczen.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <p className="font-semibold text-[#1E293B]">{uczen.name}</p>
                <p className="mt-1 text-sm text-[#526174]">{uczen.email}</p>
                <p className="mt-2 text-sm text-[#526174]">{uczen.learningPath}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Tabs defaultValue="materialy" className="mt-6">
        <TabsList className="h-auto flex-wrap rounded-[1.2rem] bg-white/70 p-1">
          <TabsTrigger value="materialy" className="rounded-[0.9rem]">Materiały</TabsTrigger>
          <TabsTrigger value="wideo" className="rounded-[0.9rem]">Materiały wideo</TabsTrigger>
          <TabsTrigger value="pdf" className="rounded-[0.9rem]">PDF</TabsTrigger>
          <TabsTrigger value="terminy" className="rounded-[0.9rem]">Terminy konsultacji</TabsTrigger>
          <TabsTrigger value="uczniowie" className="rounded-[0.9rem]">Uczniowie</TabsTrigger>
          <TabsTrigger value="zamowienia" className="rounded-[0.9rem]">Zamówienia</TabsTrigger>
          <TabsTrigger value="statystyki" className="rounded-[0.9rem]">Statystyki</TabsTrigger>
        </TabsList>

        <TabsContent value="materialy" className="mt-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <FolderOpen className="h-5 w-5 text-[#7C6CF6]" />
                <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Dodaj lub edytuj materiał</h2>
              </div>

              <div className="mt-5 grid gap-5">
                <Input
                  placeholder="Tytuł materiału"
                  value={materialForm.title}
                  onChange={(event) => setMaterialForm((prev) => ({ ...prev, title: event.target.value }))}
                />
                <Textarea
                  placeholder="Opis materiału"
                  value={materialForm.description}
                  onChange={(event) => setMaterialForm((prev) => ({ ...prev, description: event.target.value }))}
                />

                <div className="rounded-[1.4rem] bg-[#FAF7F2] p-4">
                  <p className="text-sm font-black text-[#1E293B]">Typ materiału</p>
                  <RadioGroup
                    value={materialForm.type}
                    onValueChange={(value: MaterialType) => setMaterialForm((prev) => ({ ...prev, type: value }))}
                    className="mt-4 grid gap-3"
                  >
                    {[
                      ["pdf", "PDF"],
                      ["material-wideo", "Materiał wideo"],
                      ["material-darmowy", "Darmowy materiał"],
                      ["warsztat-online", "Warsztat online"],
                    ].map(([value, label]) => (
                      <label key={value} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
                        <RadioGroupItem value={value} />
                        <span className="font-semibold text-[#1E293B]">{label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="rounded-[1.4rem] bg-[#FAF7F2] p-4">
                  <p className="text-sm font-black text-[#1E293B]">Kategoria</p>
                  <Select
                    value={materialForm.category}
                    onValueChange={(value: MaterialCategory) => setMaterialForm((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="mt-4 bg-white">
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lektury">Lektury</SelectItem>
                      <SelectItem value="rozprawka">Rozprawka</SelectItem>
                      <SelectItem value="matura">Matura</SelectItem>
                      <SelectItem value="egzamin-osmoklasisty">Egzamin ósmoklasisty</SelectItem>
                      <SelectItem value="motywy-literackie">Motywy literackie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-[1.4rem] bg-[#FAF7F2] p-4">
                  <p className="text-sm font-black text-[#1E293B]">Cena</p>
                  <Input
                    className="mt-4 bg-white"
                    type="number"
                    placeholder="0"
                    value={materialForm.price}
                    onChange={(event) => setMaterialForm((prev) => ({ ...prev, price: Number(event.target.value) }))}
                  />
                  <p className="mt-2 text-sm text-[#526174]">{materialForm.price} zł</p>
                </div>

                <div className="rounded-[1.4rem] bg-[#FAF7F2] p-4">
                  <p className="text-sm font-black text-[#1E293B]">Widoczność</p>
                  <RadioGroup
                    value={materialForm.visibility}
                    onValueChange={(value: VisibilityStatus) => setMaterialForm((prev) => ({ ...prev, visibility: value }))}
                    className="mt-4 grid gap-3"
                  >
                    {[
                      ["widoczny", "Widoczny"],
                      ["ukryty", "Ukryty"],
                    ].map(([value, label]) => (
                      <label key={value} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
                        <RadioGroupItem value={value} />
                        <span className="font-semibold text-[#1E293B]">{label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="rounded-[1.4rem] bg-[#FAF7F2] p-4">
                  <p className="text-sm font-black text-[#1E293B]">Dostęp</p>
                  <RadioGroup
                    value={materialForm.accessType}
                    onValueChange={(value: AccessType) => setMaterialForm((prev) => ({ ...prev, accessType: value }))}
                    className="mt-4 grid gap-3"
                  >
                    {[
                      ["darmowy", "Darmowy"],
                      ["platny", "Płatny"],
                    ].map(([value, label]) => (
                      <label key={value} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
                        <RadioGroupItem value={value} />
                        <span className="font-semibold text-[#1E293B]">{label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="rounded-[1.4rem] bg-[#FAF7F2] p-4">
                  <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4">
                    <Checkbox
                      checked={materialForm.featuredOnHomepage}
                      onCheckedChange={(checked) =>
                        setMaterialForm((prev) => ({ ...prev, featuredOnHomepage: checked === true }))
                      }
                    />
                    <span className="font-semibold text-[#1E293B]">Pokazuj na stronie głównej</span>
                  </div>
                </div>

                <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handleMaterialSubmit}>
                  Zapisz materiał
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
                          <Badge className="border-0 bg-[#EAF2FF] text-[#7C6CF6] hover:bg-[#EAF2FF]">
                            {materialTypeLabels[material.type]}
                          </Badge>
                          <Badge className="border-0 bg-[#FFF7DC] text-[#1E293B] hover:bg-[#FFF7DC]">
                            {categoryLabels[material.category]}
                          </Badge>
                          <Badge className="border-0 bg-white text-[#526174] hover:bg-white">
                            {visibilityLabels[material.visibility]}
                          </Badge>
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

        <TabsContent value="wideo" className="mt-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Dodaj lub edytuj materiał wideo</h2>
              <div className="mt-5 grid gap-4">
                <Input placeholder="Tytuł" value={videoForm.title} onChange={(event) => setVideoForm((prev) => ({ ...prev, title: event.target.value }))} />
                <Textarea placeholder="Opis" value={videoForm.description} onChange={(event) => setVideoForm((prev) => ({ ...prev, description: event.target.value }))} />
                <Input placeholder="Adres nagrania" value={videoForm.videoUrl} onChange={(event) => setVideoForm((prev) => ({ ...prev, videoUrl: event.target.value }))} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select value={videoForm.category} onValueChange={(value: MaterialCategory) => setVideoForm((prev) => ({ ...prev, category: value }))}>
                    <SelectTrigger><SelectValue placeholder="Kategoria" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lektury">Lektury</SelectItem>
                      <SelectItem value="rozprawka">Rozprawka</SelectItem>
                      <SelectItem value="matura">Matura</SelectItem>
                      <SelectItem value="egzamin-osmoklasisty">Egzamin ósmoklasisty</SelectItem>
                      <SelectItem value="motywy-literackie">Motywy literackie</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={videoForm.status} onValueChange={(value: VisibilityStatus) => setVideoForm((prev) => ({ ...prev, status: value }))}>
                    <SelectTrigger><SelectValue placeholder="Widoczność" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="widoczny">Widoczny</SelectItem>
                      <SelectItem value="ukryty">Ukryty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handleVideoSubmit}>
                  {editingVideoId ? "Zapisz zmiany" : "Zapisz materiał wideo"}
                </Button>
              </div>
            </section>

            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Lista materiałów wideo</h2>
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

        <TabsContent value="pdf" className="mt-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Dodaj lub edytuj PDF</h2>
              <div className="mt-5 grid gap-4">
                <Input placeholder="Tytuł" value={pdfForm.title} onChange={(event) => setPdfForm((prev) => ({ ...prev, title: event.target.value }))} />
                <Textarea placeholder="Opis" value={pdfForm.description} onChange={(event) => setPdfForm((prev) => ({ ...prev, description: event.target.value }))} />
                <Input placeholder="Adres pliku" value={pdfForm.fileUrl} onChange={(event) => setPdfForm((prev) => ({ ...prev, fileUrl: event.target.value }))} />
                <Input placeholder="Opis okładki" value={pdfForm.coverImage} onChange={(event) => setPdfForm((prev) => ({ ...prev, coverImage: event.target.value }))} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input type="number" placeholder="Cena" value={pdfForm.price} onChange={(event) => setPdfForm((prev) => ({ ...prev, price: Number(event.target.value) }))} />
                  <Select value={pdfForm.category} onValueChange={(value: MaterialCategory) => setPdfForm((prev) => ({ ...prev, category: value }))}>
                    <SelectTrigger><SelectValue placeholder="Kategoria" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lektury">Lektury</SelectItem>
                      <SelectItem value="rozprawka">Rozprawka</SelectItem>
                      <SelectItem value="matura">Matura</SelectItem>
                      <SelectItem value="egzamin-osmoklasisty">Egzamin ósmoklasisty</SelectItem>
                      <SelectItem value="motywy-literackie">Motywy literackie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Select value={pdfForm.accessType} onValueChange={(value: AccessType) => setPdfForm((prev) => ({ ...prev, accessType: value }))}>
                  <SelectTrigger><SelectValue placeholder="Dostęp" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="darmowy">Darmowy</SelectItem>
                    <SelectItem value="platny">Płatny</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handlePdfSubmit}>
                  {editingPdfId ? "Zapisz zmiany" : "Zapisz PDF"}
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

        <TabsContent value="terminy" className="mt-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Dodaj lub edytuj termin konsultacji</h2>
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
                    <SelectItem value="dostepny">Dostępny</SelectItem>
                    <SelectItem value="zarezerwowany">Zarezerwowany</SelectItem>
                    <SelectItem value="ukryty">Ukryty</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handleSlotSubmit}>
                  {editingSlotId ? "Zapisz zmiany" : "Zapisz termin"}
                </Button>
              </div>
            </section>

            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Lista terminów</h2>
              <div className="mt-5 grid gap-3">
                {state.calendarSlots.map((slot) => (
                  <div key={slot.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                    <p className="font-semibold text-[#1E293B]">{slot.date} · {slot.time}</p>
                    <p className="mt-1 text-sm text-[#526174]">{slot.duration} · {slot.price} zł · {slotStatusLabels[slot.status]}</p>
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

        <TabsContent value="uczniowie" className="mt-6">
          <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
            <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Lista uczniów</h2>
            <div className="mt-5 grid gap-4">
              {uczniowie.map((uczen) => {
                const zakupy = state.purchases.filter((purchase) => purchase.userId === uczen.id);
                const rezerwacje = state.bookings.filter((booking) => booking.userId === uczen.id);
                const postep = state.studentProgress.filter((item) => item.userId === uczen.id);

                return (
                  <div key={uczen.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-5">
                    <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[1fr_1fr_1fr_1fr]">
                      <div>
                        <p className="font-semibold text-[#1E293B]">{uczen.name}</p>
                        <p className="mt-1 text-sm text-[#526174]">{uczen.email}</p>
                        <p className="mt-1 text-sm text-[#526174]">Rejestracja: {uczen.registeredDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1E293B]">Produkty</p>
                        <p className="mt-1 text-sm text-[#526174]">{zakupy.length}</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1E293B]">Konsultacje</p>
                        <p className="mt-1 text-sm text-[#526174]">{rezerwacje.length}</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1E293B]">Postęp</p>
                        <p className="mt-1 text-sm text-[#526174]">{postep.map((item) => item.title).join(", ")}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="zamowienia" className="mt-6">
          <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
            <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Zamówienia</h2>
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
                        {purchase.source === "nadanie" ? "Nadano ręcznie" : "Zakup"}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-[1.4rem] bg-[#FAF7F2] p-5">
              <p className="font-semibold text-[#1E293B]">Nadaj dostęp ręcznie</p>
              <div className="mt-4 grid gap-4">
                {uczniowie.map((uczen) => (
                  <div key={uczen.id} className="rounded-[1.2rem] bg-white p-4">
                    <p className="font-semibold text-[#1E293B]">{uczen.name}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {state.materials
                        .filter((material) => material.accessType === "platny")
                        .slice(0, 4)
                        .map((material) => (
                          <Button
                            key={material.id}
                            variant="outline"
                            className="rounded-full"
                            onClick={() => grantAccess(uczen.id, material.id)}
                          >
                            {material.title}
                          </Button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="statystyki" className="mt-6">
          <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-[#7C6CF6]" />
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04<dyad-read path="src/components/teacher-dashboard-view.tsx"></dyad-read>
<dyad-read path="src/pages/StudentDashboard.tsx"></dyad-read>
<dyad-read path="src/pages/TeacherDashboard.tsx"></dyad-read>
<dyad-read path="src/pages/AdminDashboard.tsx"></dyad-read>
<dyad-read path="src/components/admin-dashboard-view.tsx"></dyad-read><dyad-write path="src/components/teacher-dashboard-view.tsx" description="Przepisuję panel nauczyciela na główny panel zarządzania z polskimi zakładkami i lepszym formularzem materiałów.">
import { useMemo, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  FileText,
  FolderOpen,
  Package,
  PlayCircle,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PlatformShell } from "@/components/platform-shell";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  type: "pdf",
  category: "lektury",
  price: 0,
  visibility: "widoczny",
  accessType: "platny",
  featuredOnHomepage: true,
};

const videoInitialState: Omit<PlatformVideo, "id"> = {
  title: "",
  description: "",
  videoUrl: "",
  category: "matura",
  status: "widoczny",
};

const pdfInitialState: Omit<PlatformPdf, "id"> = {
  title: "",
  description: "",
  fileUrl: "",
  price: 0,
  category: "lektury",
  coverImage: "",
  accessType: "platny",
};

const slotInitialState = {
  date: "",
  time: "",
  duration: "60 minut",
  price: 140,
  status: "dostepny" as SlotStatus,
};

const categoryLabels: Record<MaterialCategory, string> = {
  lektury: "Lektury",
  rozprawka: "Rozprawka",
  matura: "Matura",
  "egzamin-osmoklasisty": "Egzamin ósmoklasisty",
  "motywy-literackie": "Motywy literackie",
};

const materialTypeLabels: Record<MaterialType, string> = {
  pdf: "PDF",
  "material-wideo": "Materiał wideo",
  "material-darmowy": "Darmowy materiał",
  "warsztat-online": "Warsztat online",
};

const visibilityLabels: Record<VisibilityStatus, string> = {
  widoczny: "Widoczny",
  ukryty: "Ukryty",
};

const slotStatusLabels: Record<SlotStatus, string> = {
  dostepny: "Dostępny",
  zarezerwowany: "Zarezerwowany",
  ukryty: "Ukryty",
};

export const TeacherDashboardView = () => {
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

  const uczniowie = useMemo(() => state.users.filter((user) => user.role === "uczen"), [state.users]);

  const nadchodzaceKonsultacje = state.bookings
    .map((booking) => {
      const slot = state.calendarSlots.find((item) => item.id === booking.slotId);
      const uczen = state.users.find((item) => item.id === booking.userId);
      return slot && uczen
        ? {
            id: booking.id,
            studentName: uczen.name,
            date: slot.date,
            time: slot.time,
            topic: booking.topic,
          }
        : null;
    })
    .filter(Boolean);

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
      title="Panel nauczyciela"
      subtitle="Tu zarządzasz materiałami, kursami, terminami spotkań oraz swoimi uczniami."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {[
          ["Materiały", state.materials.length, FolderOpen],
          ["Materiały wideo", state.videos.length, PlayCircle],
          ["PDF", state.pdfs.length, FileText],
          ["Terminy konsultacji", state.calendarSlots.length, CalendarDays],
          ["Uczniowie", uczniowie.length, Users],
          ["Zamówienia", state.purchases.length, Package],
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

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-[#7C6CF6]" />
            <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Nadchodzące konsultacje</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {nadchodzaceKonsultacje.map((item) => (
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
            <Users className="h-5 w-5 text-[#7C6CF6]" />
            <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Uczniowie</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {uczniowie.map((uczen) => (
              <div key={uczen.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <p className="font-semibold text-[#1E293B]">{uczen.name}</p>
                <p className="mt-1 text-sm text-[#526174]">{uczen.email}</p>
                <p className="mt-2 text-sm text-[#526174]">{uczen.learningPath}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Tabs defaultValue="materialy" className="mt-6">
        <TabsList className="h-auto flex-wrap rounded-[1.2rem] bg-white/70 p-1">
          <TabsTrigger value="materialy" className="rounded-[0.9rem]">Materiały</TabsTrigger>
          <TabsTrigger value="wideo" className="rounded-[0.9rem]">Materiały wideo</TabsTrigger>
          <TabsTrigger value="pdf" className="rounded-[0.9rem]">PDF</TabsTrigger>
          <TabsTrigger value="terminy" className="rounded-[0.9rem]">Terminy konsultacji</TabsTrigger>
          <TabsTrigger value="uczniowie" className="rounded-[0.9rem]">Uczniowie</TabsTrigger>
          <TabsTrigger value="zamowienia" className="rounded-[0.9rem]">Zamówienia</TabsTrigger>
          <TabsTrigger value="statystyki" className="rounded-[0.9rem]">Statystyki</TabsTrigger>
        </TabsList>

        <TabsContent value="materialy" className="mt-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <FolderOpen className="h-5 w-5 text-[#7C6CF6]" />
                <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Dodaj lub edytuj materiał</h2>
              </div>

              <div className="mt-5 grid gap-5">
                <Input
                  placeholder="Tytuł materiału"
                  value={materialForm.title}
                  onChange={(event) => setMaterialForm((prev) => ({ ...prev, title: event.target.value }))}
                />
                <Textarea
                  placeholder="Opis materiału"
                  value={materialForm.description}
                  onChange={(event) => setMaterialForm((prev) => ({ ...prev, description: event.target.value }))}
                />

                <div className="rounded-[1.4rem] bg-[#FAF7F2] p-4">
                  <p className="text-sm font-black text-[#1E293B]">Typ materiału</p>
                  <RadioGroup
                    value={materialForm.type}
                    onValueChange={(value: MaterialType) => setMaterialForm((prev) => ({ ...prev, type: value }))}
                    className="mt-4 grid gap-3"
                  >
                    {[
                      ["pdf", "PDF"],
                      ["material-wideo", "Materiał wideo"],
                      ["material-darmowy", "Darmowy materiał"],
                      ["warsztat-online", "Warsztat online"],
                    ].map(([value, label]) => (
                      <label key={value} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
                        <RadioGroupItem value={value} />
                        <span className="font-semibold text-[#1E293B]">{label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="rounded-[1.4rem] bg-[#FAF7F2] p-4">
                  <p className="text-sm font-black text-[#1E293B]">Kategoria</p>
                  <Select
                    value={materialForm.category}
                    onValueChange={(value: MaterialCategory) => setMaterialForm((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="mt-4 bg-white">
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lektury">Lektury</SelectItem>
                      <SelectItem value="rozprawka">Rozprawka</SelectItem>
                      <SelectItem value="matura">Matura</SelectItem>
                      <SelectItem value="egzamin-osmoklasisty">Egzamin ósmoklasisty</SelectItem>
                      <SelectItem value="motywy-literackie">Motywy literackie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-[1.4rem] bg-[#FAF7F2] p-4">
                  <p className="text-sm font-black text-[#1E293B]">Cena</p>
                  <Input
                    className="mt-4 bg-white"
                    type="number"
                    placeholder="0"
                    value={materialForm.price}
                    onChange={(event) => setMaterialForm((prev) => ({ ...prev, price: Number(event.target.value) }))}
                  />
                  <p className="mt-2 text-sm text-[#526174]">{materialForm.price} zł</p>
                </div>

                <div className="rounded-[1.4rem] bg-[#FAF7F2] p-4">
                  <p className="text-sm font-black text-[#1E293B]">Widoczność</p>
                  <RadioGroup
                    value={materialForm.visibility}
                    onValueChange={(value: VisibilityStatus) => setMaterialForm((prev) => ({ ...prev, visibility: value }))}
                    className="mt-4 grid gap-3"
                  >
                    {[
                      ["widoczny", "Widoczny"],
                      ["ukryty", "Ukryty"],
                    ].map(([value, label]) => (
                      <label key={value} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
                        <RadioGroupItem value={value} />
                        <span className="font-semibold text-[#1E293B]">{label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="rounded-[1.4rem] bg-[#FAF7F2] p-4">
                  <p className="text-sm font-black text-[#1E293B]">Dostęp</p>
                  <RadioGroup
                    value={materialForm.accessType}
                    onValueChange={(value: AccessType) => setMaterialForm((prev) => ({ ...prev, accessType: value }))}
                    className="mt-4 grid gap-3"
                  >
                    {[
                      ["darmowy", "Darmowy"],
                      ["platny", "Płatny"],
                    ].map(([value, label]) => (
                      <label key={value} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
                        <RadioGroupItem value={value} />
                        <span className="font-semibold text-[#1E293B]">{label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="rounded-[1.4rem] bg-[#FAF7F2] p-4">
                  <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4">
                    <Checkbox
                      checked={materialForm.featuredOnHomepage}
                      onCheckedChange={(checked) =>
                        setMaterialForm((prev) => ({ ...prev, featuredOnHomepage: checked === true }))
                      }
                    />
                    <span className="font-semibold text-[#1E293B]">Pokazuj na stronie głównej</span>
                  </div>
                </div>

                <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handleMaterialSubmit}>
                  Zapisz materiał
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
                          <Badge className="border-0 bg-[#EAF2FF] text-[#7C6CF6] hover:bg-[#EAF2FF]">
                            {materialTypeLabels[material.type]}
                          </Badge>
                          <Badge className="border-0 bg-[#FFF7DC] text-[#1E293B] hover:bg-[#FFF7DC]">
                            {categoryLabels[material.category]}
                          </Badge>
                          <Badge className="border-0 bg-white text-[#526174] hover:bg-white">
                            {visibilityLabels[material.visibility]}
                          </Badge>
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

        <TabsContent value="wideo" className="mt-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Dodaj lub edytuj materiał wideo</h2>
              <div className="mt-5 grid gap-4">
                <Input placeholder="Tytuł" value={videoForm.title} onChange={(event) => setVideoForm((prev) => ({ ...prev, title: event.target.value }))} />
                <Textarea placeholder="Opis" value={videoForm.description} onChange={(event) => setVideoForm((prev) => ({ ...prev, description: event.target.value }))} />
                <Input placeholder="Adres nagrania" value={videoForm.videoUrl} onChange={(event) => setVideoForm((prev) => ({ ...prev, videoUrl: event.target.value }))} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select value={videoForm.category} onValueChange={(value: MaterialCategory) => setVideoForm((prev) => ({ ...prev, category: value }))}>
                    <SelectTrigger><SelectValue placeholder="Kategoria" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lektury">Lektury</SelectItem>
                      <SelectItem value="rozprawka">Rozprawka</SelectItem>
                      <SelectItem value="matura">Matura</SelectItem>
                      <SelectItem value="egzamin-osmoklasisty">Egzamin ósmoklasisty</SelectItem>
                      <SelectItem value="motywy-literackie">Motywy literackie</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={videoForm.status} onValueChange={(value: VisibilityStatus) => setVideoForm((prev) => ({ ...prev, status: value }))}>
                    <SelectTrigger><SelectValue placeholder="Widoczność" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="widoczny">Widoczny</SelectItem>
                      <SelectItem value="ukryty">Ukryty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handleVideoSubmit}>
                  {editingVideoId ? "Zapisz zmiany" : "Zapisz materiał wideo"}
                </Button>
              </div>
            </section>

            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Lista materiałów wideo</h2>
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

        <TabsContent value="pdf" className="mt-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Dodaj lub edytuj PDF</h2>
              <div className="mt-5 grid gap-4">
                <Input placeholder="Tytuł" value={pdfForm.title} onChange={(event) => setPdfForm((prev) => ({ ...prev, title: event.target.value }))} />
                <Textarea placeholder="Opis" value={pdfForm.description} onChange={(event) => setPdfForm((prev) => ({ ...prev, description: event.target.value }))} />
                <Input placeholder="Adres pliku" value={pdfForm.fileUrl} onChange={(event) => setPdfForm((prev) => ({ ...prev, fileUrl: event.target.value }))} />
                <Input placeholder="Opis okładki" value={pdfForm.coverImage} onChange={(event) => setPdfForm((prev) => ({ ...prev, coverImage: event.target.value }))} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input type="number" placeholder="Cena" value={pdfForm.price} onChange={(event) => setPdfForm((prev) => ({ ...prev, price: Number(event.target.value) }))} />
                  <Select value={pdfForm.category} onValueChange={(value: MaterialCategory) => setPdfForm((prev) => ({ ...prev, category: value }))}>
                    <SelectTrigger><SelectValue placeholder="Kategoria" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lektury">Lektury</SelectItem>
                      <SelectItem value="rozprawka">Rozprawka</SelectItem>
                      <SelectItem value="matura">Matura</SelectItem>
                      <SelectItem value="egzamin-osmoklasisty">Egzamin ósmoklasisty</SelectItem>
                      <SelectItem value="motywy-literackie">Motywy literackie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Select value={pdfForm.accessType} onValueChange={(value: AccessType) => setPdfForm((prev) => ({ ...prev, accessType: value }))}>
                  <SelectTrigger><SelectValue placeholder="Dostęp" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="darmowy">Darmowy</SelectItem>
                    <SelectItem value="platny">Płatny</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handlePdfSubmit}>
                  {editingPdfId ? "Zapisz zmiany" : "Zapisz PDF"}
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

        <TabsContent value="terminy" className="mt-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Dodaj lub edytuj termin konsultacji</h2>
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
                    <SelectItem value="dostepny">Dostępny</SelectItem>
                    <SelectItem value="zarezerwowany">Zarezerwowany</SelectItem>
                    <SelectItem value="ukryty">Ukryty</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handleSlotSubmit}>
                  {editingSlotId ? "Zapisz zmiany" : "Zapisz termin"}
                </Button>
              </div>
            </section>

            <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Lista terminów</h2>
              <div className="mt-5 grid gap-3">
                {state.calendarSlots.map((slot) => (
                  <div key={slot.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                    <p className="font-semibold text-[#1E293B]">{slot.date} · {slot.time}</p>
                    <p className="mt-1 text-sm text-[#526174]">{slot.duration} · {slot.price} zł · {slotStatusLabels[slot.status]}</p>
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

        <TabsContent value="uczniowie" className="mt-6">
          <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
            <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Lista uczniów</h2>
            <div className="mt-5 grid gap-4">
              {uczniowie.map((uczen) => {
                const zakupy = state.purchases.filter((purchase) => purchase.userId === uczen.id);
                const rezerwacje = state.bookings.filter((booking) => booking.userId === uczen.id);
                const postep = state.studentProgress.filter((item) => item.userId === uczen.id);

                return (
                  <div key={uczen.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-5">
                    <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[1fr_1fr_1fr_1fr]">
                      <div>
                        <p className="font-semibold text-[#1E293B]">{uczen.name}</p>
                        <p className="mt-1 text-sm text-[#526174]">{uczen.email}</p>
                        <p className="mt-1 text-sm text-[#526174]">Rejestracja: {uczen.registeredDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1E293B]">Produkty</p>
                        <p className="mt-1 text-sm text-[#526174]">{zakupy.length}</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1E293B]">Konsultacje</p>
                        <p className="mt-1 text-sm text-[#526174]">{rezerwacje.length}</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1E293B]">Postęp</p>
                        <p className="mt-1 text-sm text-[#526174]">{postep.map((item) => item.title).join(", ")}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="zamowienia" className="mt-6">
          <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
            <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Zamówienia</h2>
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
                        {purchase.source === "nadanie" ? "Nadano ręcznie" : "Zakup"}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-[1.4rem] bg-[#FAF7F2] p-5">
              <p className="font-semibold text-[#1E293B]">Nadaj dostęp ręcznie</p>
              <div className="mt-4 grid gap-4">
                {uczniowie.map((uczen) => (
                  <div key={uczen.id} className="rounded-[1.2rem] bg-white p-4">
                    <p className="font-semibold text-[#1E293B]">{uczen.name}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {state.materials
                        .filter((material) => material.accessType === "platny")
                        .slice(0, 4)
                        .map((material) => (
                          <Button
                            key={material.id}
                            variant="outline"
                            className="rounded-full"
                            onClick={() => grantAccess(uczen.id, material.id)}
                          >
                            {material.title}
                          </Button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="statystyki" className="mt-6">
          <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-[#7C6CF6]" />
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em]">Statystyki</h2>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <p className="text-sm font-bold text-[#526174]">Łączna liczba uczniów</p>
                <p className="mt-2 font-serif text-3xl font-semibold text-[#1E293B]">{uczniowie.length}</p>
              </div>
              <div className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <p className="text-sm font-bold text-[#526174]">Materiały na platformie</p>
                <p className="mt-2 font-serif text-3xl font-semibold text-[#1E293B]">{state.materials.length}</p>
              </div>
              <div className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <p className="text-sm font-bold text-[#526174]">Nagrania wideo</p>
                <p className="mt-2 font-serif text-3xl font-semibold text-[#1E293B]">{state.videos.length}</p>
              </div>
              <div className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <p className="text-sm font-bold text-[#526174]">Rezerwacje konsultacji</p>
                <p className="mt-2 font-serif text-3xl font-semibold text-[#1E293B]">{state.bookings.length}</p>
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </PlatformShell>
  );
};
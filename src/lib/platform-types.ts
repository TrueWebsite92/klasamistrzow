export type UserRole = "uczen" | "nauczyciel";

export type MaterialType = "pdf" | "material-wideo" | "material-darmowy" | "warsztat-online";
export type MaterialCategory =
  | "lektury"
  | "rozprawka"
  | "matura"
  | "egzamin-osmoklasisty"
  | "motywy-literackie";
export type VisibilityStatus = "widoczny" | "ukryty";
export type AccessType = "darmowy" | "platny";
export type SlotStatus = "dostepny" | "zarezerwowany" | "ukryty";
export type ProgressStatus = "ukończono" | "w trakcie" | "do rozpoczęcia";

export type PlatformUser = {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  password: string;
  registeredDate: string;
  learningPath?: string;
};

export type PlatformMaterial = {
  id: string;
  title: string;
  description: string;
  type: MaterialType;
  category: MaterialCategory;
  price: number;
  visibility: VisibilityStatus;
  accessType: AccessType;
  featuredOnHomepage: boolean;
};

export type PlatformVideo = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  category: MaterialCategory;
  status: VisibilityStatus;
};

export type PlatformPdf = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  price: number;
  category: MaterialCategory;
  coverImage: string;
  accessType: AccessType;
};

export type CalendarSlot = {
  id: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: SlotStatus;
};

export type Booking = {
  id: string;
  userId: string;
  slotId: string;
  topic: string;
};

export type Purchase = {
  id: string;
  userId: string;
  materialId: string;
  source?: "zakup" | "nadanie";
};

export type StudentProgressItem = {
  id: string;
  userId: string;
  title: string;
  status: ProgressStatus;
  progress?: number;
};

export type TeacherNote = {
  id: string;
  studentName: string;
  note: string;
  date: string;
};
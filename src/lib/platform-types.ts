export type UserRole = "student" | "teacher" | "admin";

export type MaterialType = "PDF" | "video" | "free-material" | "workshop";
export type MaterialCategory = "matura" | "ósmoklasista" | "lektury" | "rozprawka";
export type VisibilityStatus = "active" | "hidden";
export type AccessType = "free" | "paid";
export type SlotStatus = "available" | "booked" | "hidden";
export type ProgressStatus = "ukończono" | "w trakcie" | "do rozpoczęcia";

export type PlatformUser = {
  id: string;
  role: UserRole;
  name: string;
  email: string;
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
  grantedByAdmin?: boolean;
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
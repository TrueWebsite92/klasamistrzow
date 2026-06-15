import type {
  Booking,
  CalendarSlot,
  PlatformMaterial,
  PlatformPdf,
  PlatformUser,
  PlatformVideo,
  Purchase,
  StudentProgressItem,
  TeacherNote,
} from "@/lib/platform-types";

export type PlatformState = {
  users: PlatformUser[];
  materials: PlatformMaterial[];
  videos: PlatformVideo[];
  pdfs: PlatformPdf[];
  calendarSlots: CalendarSlot[];
  bookings: Booking[];
  purchases: Purchase[];
  studentProgress: StudentProgressItem[];
  teacherNotes: TeacherNote[];
};

const PLATFORM_STATE_KEY = "klasa-mistrzow-platform-state";
const CURRENT_USER_KEY = "klasa-mistrzow-current-user";

export const getPlatformState = (): PlatformState | null => {
  const raw = localStorage.getItem(PLATFORM_STATE_KEY);
  return raw ? (JSON.parse(raw) as PlatformState) : null;
};

export const setPlatformState = (state: PlatformState) => {
  localStorage.setItem(PLATFORM_STATE_KEY, JSON.stringify(state));
};

export const getCurrentUserId = () => localStorage.getItem(CURRENT_USER_KEY);

export const setCurrentUserId = (userId: string | null) => {
  if (!userId) {
    localStorage.removeItem(CURRENT_USER_KEY);
    return;
  }

  localStorage.setItem(CURRENT_USER_KEY, userId);
};
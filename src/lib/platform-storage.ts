import type {
  Booking,
  CalendarSlot,
  CartItem,
  FutureSupabaseSchema,
  PlatformMaterial,
  PlatformOrder,
  PlatformPdf,
  PlatformProduct,
  PlatformUser,
  PlatformVideo,
  Purchase,
  StudentAccess,
  StudentProgressItem,
  TeacherNote,
} from "@/lib/platform-types";

export type PlatformState = {
  users: PlatformUser[];
  materials: PlatformMaterial[];
  videos: PlatformVideo[];
  pdfs: PlatformPdf[];
  products: PlatformProduct[];
  cart: CartItem[];
  orders: PlatformOrder[];
  studentAccess: StudentAccess[];
  futureSupabase: FutureSupabaseSchema;
  calendarSlots: CalendarSlot[];
  bookings: Booking[];
  purchases: Purchase[];
  studentProgress: StudentProgressItem[];
  teacherNotes: TeacherNote[];
};

const PLATFORM_STATE_KEY = "klasa-mistrzow-platform-state";
const CURRENT_USER_KEY = "klasa-mistrzow-current-user";

const isArray = (value: unknown) => Array.isArray(value);

const createDefaultFutureSupabase = (): FutureSupabaseSchema => ({
  products: [],
  orders: [],
  order_items: [],
  student_access: [],
  product_files: [],
  product_images: [],
});

const normalizePlatformState = (parsed: unknown): PlatformState | null => {
  if (!parsed || typeof parsed !== "object") {
    return null;
  }

  const state = parsed as Partial<PlatformState>;

  return {
    users: isArray(state.users) ? state.users : [],
    materials: isArray(state.materials) ? state.materials : [],
    videos: isArray(state.videos) ? state.videos : [],
    pdfs: isArray(state.pdfs) ? state.pdfs : [],
    products: isArray(state.products) ? state.products : [],
    cart: isArray(state.cart) ? state.cart : [],
    orders: isArray(state.orders) ? state.orders : [],
    studentAccess: isArray(state.studentAccess) ? state.studentAccess : [],
    futureSupabase:
      state.futureSupabase && typeof state.futureSupabase === "object"
        ? {
            products: isArray(state.futureSupabase.products) ? state.futureSupabase.products : [],
            orders: isArray(state.futureSupabase.orders) ? state.futureSupabase.orders : [],
            order_items: isArray(state.futureSupabase.order_items) ? state.futureSupabase.order_items : [],
            student_access: isArray(state.futureSupabase.student_access) ? state.futureSupabase.student_access : [],
            product_files: isArray(state.futureSupabase.product_files) ? state.futureSupabase.product_files : [],
            product_images: isArray(state.futureSupabase.product_images) ? state.futureSupabase.product_images : [],
          }
        : createDefaultFutureSupabase(),
    calendarSlots: isArray(state.calendarSlots) ? state.calendarSlots : [],
    bookings: isArray(state.bookings) ? state.bookings : [],
    purchases: isArray(state.purchases) ? state.purchases : [],
    studentProgress: isArray(state.studentProgress) ? state.studentProgress : [],
    teacherNotes: isArray(state.teacherNotes) ? state.teacherNotes : [],
  };
};

export const getPlatformState = (): PlatformState | null => {
  const raw = localStorage.getItem(PLATFORM_STATE_KEY);

  if (!raw) {
    return null;
  }

  return normalizePlatformState(JSON.parse(raw));
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
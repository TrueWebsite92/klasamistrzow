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

export type ProductType = "pdf" | "kurs-video" | "warsztat-online" | "konsultacja-indywidualna";
export type ProductStatus = "widoczny" | "ukryty" | "roboczy";
export type ProductAccessMode = "natychmiastowy" | "reczny";
export type ProductFileKind = "zdjecie-produktu" | "miniatura-produktu" | "plik-pdf" | "plik-wideo";
export type OrderStatus = "przyjete" | "oplacone" | "anulowane";

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

export type ProductFile = {
  id: string;
  kind: ProductFileKind;
  name: string;
  mimeType: string;
  size: number;
  dataUrl: string;
};

export type PlatformProduct = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  type: ProductType;
  category: MaterialCategory;
  status: ProductStatus;
  accessType: AccessType;
  accessMode: ProductAccessMode;
  featured: boolean;
  learningOutcomes: string[];
  accessInformation: string[];
  image?: ProductFile;
  thumbnail?: ProductFile;
  pdfFile?: ProductFile;
  videoPlaceholderName?: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
};

export type PlatformOrder = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
};

export type StudentAccess = {
  id: string;
  userId: string;
  productId: string;
  source: "zakup" | "nadanie";
  grantedAt: string;
};

export type FutureSupabaseTable =
  | "products"
  | "orders"
  | "order_items"
  | "student_access"
  | "product_files"
  | "product_images";

export type FutureSupabaseSchema = {
  products: PlatformProduct[];
  orders: PlatformOrder[];
  order_items: OrderItem[];
  student_access: StudentAccess[];
  product_files: ProductFile[];
  product_images: ProductFile[];
};
import { useEffect, useMemo, useState } from "react";

import { demoPlatformState } from "@/lib/platform-demo-data";
import {
  getCurrentUserId,
  getPlatformState,
  setCurrentUserId,
  setPlatformState,
} from "@/lib/platform-storage";
import type {
  Booking,
  CalendarSlot,
  CartItem,
  PlatformMaterial,
  PlatformOrder,
  PlatformPdf,
  PlatformProduct,
  PlatformUser,
  PlatformVideo,
  ProductFile,
  Purchase,
  StudentAccess,
  UserRole,
} from "@/lib/platform-types";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

type CheckoutInput = {
  firstName: string;
  lastName: string;
  email: string;
};

type MaterialInput = Omit<PlatformMaterial, "id">;
type VideoInput = Omit<PlatformVideo, "id">;
type PdfInput = Omit<PlatformPdf, "id">;
type SlotInput = Omit<CalendarSlot, "id">;
type ProductInput = Omit<PlatformProduct, "id">;

const createId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Nie udało się odczytać pliku."));
    reader.readAsDataURL(file);
  });

const createProductFile = async (file: File, kind: ProductFile["kind"]): Promise<ProductFile> => ({
  id: createId("plik"),
  kind,
  name: file.name,
  mimeType: file.type || "application/octet-stream",
  size: file.size,
  dataUrl: await fileToDataUrl(file),
});

export const usePlatformDemo = () => {
  const [state, setState] = useState(() => getPlatformState() ?? demoPlatformState);
  const [currentUserId, setCurrentUserIdState] = useState<string | null>(() => getCurrentUserId());
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  useEffect(() => {
    setPlatformState(state);
  }, [state]);

  const currentUser = useMemo(
    () => state.users.find((user) => user.id === currentUserId) ?? null,
    [state.users, currentUserId],
  );

  const login = ({ email, password }: LoginInput) => {
    const user = state.users.find((item) => item.email === email && item.password === password);

    if (!user) {
      return null;
    }

    setCurrentUserIdState(user.id);
    setCurrentUserId(user.id);
    return user;
  };

  const loginAsRole = (role: UserRole) => {
    const user = state.users.find((item) => item.role === role);
    if (!user) return null;

    setCurrentUserIdState(user.id);
    setCurrentUserId(user.id);
    return user;
  };

  const logout = () => {
    setCurrentUserIdState(null);
    setCurrentUserId(null);
  };

  const registerUser = ({ name, email, password }: RegisterInput) => {
    const newUser: PlatformUser = {
      id: createId("uzytkownik"),
      role: "uczen",
      name,
      email,
      password,
      registeredDate: new Date().toISOString().slice(0, 10),
      learningPath: "Nowa ścieżka nauki",
    };

    const darmoweMaterialy = state.materials
      .filter((material) => material.accessType === "darmowy")
      .map((material) => ({
        id: createId("zakup"),
        userId: newUser.id,
        materialId: material.id,
        source: "nadanie" as const,
      }));

    setState((previous) => ({
      ...previous,
      users: [...previous.users, newUser],
      purchases: [...previous.purchases, ...darmoweMaterialy],
    }));

    setCurrentUserIdState(newUser.id);
    setCurrentUserId(newUser.id);

    return newUser;
  };

  const addBooking = (userId: string, slotId: string, topic: string) => {
    const booking: Booking = {
      id: createId("rezerwacja"),
      userId,
      slotId,
      topic,
    };

    setState((previous) => ({
      ...previous,
      bookings: [...previous.bookings, booking],
      calendarSlots: previous.calendarSlots.map((slot) =>
        slot.id === slotId ? { ...slot, status: "zarezerwowany" } : slot,
      ),
    }));
  };

  const addMaterial = (input: MaterialInput) => {
    const material: PlatformMaterial = { id: createId("material"), ...input };
    setState((previous) => ({ ...previous, materials: [...previous.materials, material] }));
  };

  const updateMaterial = (id: string, input: MaterialInput) => {
    setState((previous) => ({
      ...previous,
      materials: previous.materials.map((material) =>
        material.id === id ? { ...material, ...input } : material,
      ),
    }));
  };

  const deleteMaterial = (id: string) => {
    setState((previous) => ({
      ...previous,
      materials: previous.materials.filter((material) => material.id !== id),
    }));
  };

  const addVideo = (input: VideoInput) => {
    const video: PlatformVideo = { id: createId("wideo"), ...input };
    setState((previous) => ({ ...previous, videos: [...previous.videos, video] }));
  };

  const updateVideo = (id: string, input: VideoInput) => {
    setState((previous) => ({
      ...previous,
      videos: previous.videos.map((video) => (video.id === id ? { ...video, ...input } : video)),
    }));
  };

  const deleteVideo = (id: string) => {
    setState((previous) => ({
      ...previous,
      videos: previous.videos.filter((video) => video.id !== id),
    }));
  };

  const addPdf = (input: PdfInput) => {
    const pdf: PlatformPdf = { id: createId("pdf"), ...input };
    setState((previous) => ({ ...previous, pdfs: [...previous.pdfs, pdf] }));
  };

  const updatePdf = (id: string, input: PdfInput) => {
    setState((previous) => ({
      ...previous,
      pdfs: previous.pdfs.map((pdf) => (pdf.id === id ? { ...pdf, ...input } : pdf)),
    }));
  };

  const deletePdf = (id: string) => {
    setState((previous) => ({
      ...previous,
      pdfs: previous.pdfs.filter((pdf) => pdf.id !== id),
    }));
  };

  const addSlot = (input: SlotInput) => {
    const slot: CalendarSlot = { id: createId("termin"), ...input };
    setState((previous) => ({ ...previous, calendarSlots: [...previous.calendarSlots, slot] }));
  };

  const updateSlot = (id: string, input: SlotInput) => {
    setState((previous) => ({
      ...previous,
      calendarSlots: previous.calendarSlots.map((slot) => (slot.id === id ? { ...slot, ...input } : slot)),
    }));
  };

  const deleteSlot = (id: string) => {
    setState((previous) => ({
      ...previous,
      calendarSlots: previous.calendarSlots.filter((slot) => slot.id !== id),
    }));
  };

  const grantAccess = (userId: string, materialId: string) => {
    const alreadyGranted = state.purchases.some(
      (purchase) => purchase.userId === userId && purchase.materialId === materialId,
    );

    if (alreadyGranted) return;

    const purchase: Purchase = {
      id: createId("zakup"),
      userId,
      materialId,
      source: "nadanie",
    };

    setState((previous) => ({
      ...previous,
      purchases: [...previous.purchases, purchase],
    }));
  };

  const addToCart = (productId: string) => {
    setState((previous) => {
      const existing = previous.cart.find((item: CartItem) => item.productId === productId);

      if (existing) {
        return {
          ...previous,
          cart: previous.cart.map((item: CartItem) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }

      return {
        ...previous,
        cart: [...previous.cart, { productId, quantity: 1 }],
      };
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setState((previous) => ({
        ...previous,
        cart: previous.cart.filter((item: CartItem) => item.productId !== productId),
      }));
      return;
    }

    setState((previous) => ({
      ...previous,
      cart: previous.cart.map((item: CartItem) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    }));
  };

  const removeFromCart = (productId: string) => {
    setState((previous) => ({
      ...previous,
      cart: previous.cart.filter((item: CartItem) => item.productId !== productId),
    }));
  };

  const clearCart = () => {
    setState((previous) => ({
      ...previous,
      cart: [],
    }));
  };

  const createOrder = ({ firstName, lastName, email }: CheckoutInput) => {
    if (!currentUser || state.cart.length === 0) {
      return null;
    }

    const items = state.cart
      .map((cartItem: CartItem) => {
        const product = state.products.find((item: PlatformProduct) => item.id === cartItem.productId);
        if (!product) return null;

        return {
          id: createId("pozycja"),
          productId: product.id,
          quantity: cartItem.quantity,
          unitPrice: product.price,
        };
      })
      .filter(Boolean) as PlatformOrder["items"];

    const order: PlatformOrder = {
      id: createId("zamowienie"),
      userId: currentUser.id,
      firstName,
      lastName,
      email,
      status: "przyjete",
      createdAt: new Date().toISOString(),
      items,
    };

    const newAccess: StudentAccess[] = items.map((item) => ({
      id: createId("dostep"),
      userId: currentUser.id,
      productId: item.productId,
      source: "zakup",
      grantedAt: new Date().toISOString(),
    }));

    setState((previous) => ({
      ...previous,
      orders: [...previous.orders, order],
      studentAccess: [
        ...previous.studentAccess,
        ...newAccess.filter(
          (access) =>
            !previous.studentAccess.some(
              (existing: StudentAccess) =>
                existing.userId === access.userId && existing.productId === access.productId,
            ),
        ),
      ],
      cart: [],
    }));

    setLastOrderId(order.id);
    return order;
  };

  const addProduct = async (
    input: Omit<ProductInput, "image" | "thumbnail" | "pdfFile"> & {
      imageFile?: File | null;
      thumbnailFile?: File | null;
      pdfFile?: File | null;
    },
  ) => {
    const product: PlatformProduct = {
      id: createId("produkt"),
      title: input.title,
      shortDescription: input.shortDescription,
      fullDescription: input.fullDescription,
      price: input.price,
      type: input.type,
      category: input.category,
      status: input.status,
      accessType: input.accessType,
      accessMode: input.accessMode,
      featured: input.featured,
      learningOutcomes: input.learningOutcomes,
      accessInformation: input.accessInformation,
      image: input.imageFile ? await createProductFile(input.imageFile, "zdjecie-produktu") : undefined,
      thumbnail: input.thumbnailFile ? await createProductFile(input.thumbnailFile, "miniatura-produktu") : undefined,
      pdfFile: input.pdfFile ? await createProductFile(input.pdfFile, "plik-pdf") : undefined,
      videoPlaceholderName: input.videoPlaceholderName,
    };

    setState((previous) => ({
      ...previous,
      products: [...previous.products, product],
    }));

    return product;
  };

  const visibleProducts = state.products.filter((product: PlatformProduct) => product.status === "widoczny");
  const cartItemsDetailed = state.cart
    .map((item: CartItem) => {
      const product = state.products.find((entry: PlatformProduct) => entry.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean);

  const cartTotal = cartItemsDetailed.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const studentBookings = currentUser
    ? state.bookings.filter((booking) => booking.userId === currentUser.id)
    : [];

  const studentPurchases = currentUser
    ? state.purchases.filter((purchase) => purchase.userId === currentUser.id)
    : [];

  const studentProgress = currentUser
    ? state.studentProgress.filter((item) => item.userId === currentUser.id)
    : [];

  const studentAccess = currentUser
    ? state.studentAccess.filter((item: StudentAccess) => item.userId === currentUser.id)
    : [];

  const purchasedProducts = studentAccess
    .map((access: StudentAccess) => state.products.find((product: PlatformProduct) => product.id === access.productId))
    .filter(Boolean) as PlatformProduct[];

  const studentOrders = currentUser
    ? state.orders.filter((order: PlatformOrder) => order.userId === currentUser.id)
    : [];

  const lastOrder =
    state.orders.find((order: PlatformOrder) => order.id === lastOrderId) ??
    (studentOrders.length > 0 ? studentOrders[studentOrders.length - 1] : null);

  return {
    state,
    currentUser,
    visibleProducts,
    cartItemsDetailed,
    cartTotal,
    studentBookings,
    studentPurchases,
    studentProgress,
    studentAccess,
    purchasedProducts,
    studentOrders,
    lastOrder,
    login,
    loginAsRole,
    logout,
    registerUser,
    addBooking,
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
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    createOrder,
    addProduct,
  };
};
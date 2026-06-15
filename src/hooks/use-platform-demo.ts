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
  PlatformMaterial,
  PlatformPdf,
  PlatformUser,
  PlatformVideo,
  Purchase,
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

type MaterialInput = Omit<PlatformMaterial, "id">;
type VideoInput = Omit<PlatformVideo, "id">;
type PdfInput = Omit<PlatformPdf, "id">;
type SlotInput = Omit<CalendarSlot, "id">;

const createId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;

export const usePlatformDemo = () => {
  const [state, setState] = useState(() => getPlatformState() ?? demoPlatformState);
  const [currentUserId, setCurrentUserIdState] = useState<string | null>(() => getCurrentUserId());

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

  const studentBookings = currentUser
    ? state.bookings.filter((booking) => booking.userId === currentUser.id)
    : [];

  const studentPurchases = currentUser
    ? state.purchases.filter((purchase) => purchase.userId === currentUser.id)
    : [];

  const studentProgress = currentUser
    ? state.studentProgress.filter((item) => item.userId === currentUser.id)
    : [];

  return {
    state,
    currentUser,
    studentBookings,
    studentPurchases,
    studentProgress,
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
  };
};
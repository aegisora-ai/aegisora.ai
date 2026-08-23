"use client";
import { useCallback } from "react";

type SoundType =
  | "click"
  | "success"
  | "shield"
  | "popup"
  | "ai-pulse"
  | "brand-logo";

export const useSound = () => {
  const playSound = useCallback((type: SoundType, volume: number = 0.4) => {
    // ENTERPRISE LANSMAN MODU: Güvenlik ve Kurumsal UX standartları gereği
    // web sitesindeki tüm etkileşim sesleri devre dışı bırakıldı (Muted).
    // Kodun patlamaması (import hataları) için bu fonksiyon boş (no-op) bırakılmıştır.
    return;
  }, []);

  return { playSound };
};

// hooks/useSound.ts (veya utils içinde de tutabilirsin)
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
    try {
      const audio = new Audio(`/sounds/${type}.mp3`);
      audio.volume = volume; // Kulak tırmalamaması için varsayılan ses seviyesi düşük (0.4)
      audio.play().catch((e) => {
        // Tarayıcı autoplay politikaları engellerse hata fırlatmasın diye yakalıyoruz
        console.log("Audio play blocked or error:", e);
      });
    } catch (error) {
      console.error("Sound error:", error);
    }
  }, []);

  return { playSound };
};

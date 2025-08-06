import { theme } from "@src/styles";
import { create } from "zustand";

export type ThemeType = typeof theme;

interface ThemeState {
  theme: ThemeType;
}

export const useThemeStore = create<ThemeState>(() => ({
  theme,
}));

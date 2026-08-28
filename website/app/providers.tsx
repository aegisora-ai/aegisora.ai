"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

type AegisoraThemeProviderProps =
  React.PropsWithChildren<ThemeProviderProps>;
export function ThemeProvider({ children, ...props }: AegisoraThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}

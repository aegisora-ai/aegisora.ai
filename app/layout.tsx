import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Canela fontunun yolunu doğrudan public klasörüne göre ayarlıyoruz
const canela = localFont({
  src: "../public/fonts/Canela-Regular.woff2",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aegisora — See what your agents actually do",
  description: "AI governance and risk monitoring for autonomous agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${canela.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aegisora - AI Runtime Security",
  description: "The AI Reliability Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="archive-9-dominion" content="ARCHIVE9-B1B549D8CEA3" />
      </head>
      <body className={inter.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

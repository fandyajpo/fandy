import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import SparkTrail from "@/components/SparkTrail";
import ChaosToggle from "@/components/ChaosToggle";
import "./globals.css";

const display = Archivo_Black({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fandy Ahmad — Car nerd, builder, designer",
  description:
    "Portfolio of Fandy Ahmad. Neo-brutalist, raw, and fully animated. Cars, code, and craft.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <div className="grain pointer-events-none fixed inset-0 z-50" />
        <SparkTrail />
        <Cursor />
        <ScrollProgress />
        <ChaosToggle />
        {children}
      </body>
    </html>
  );
}
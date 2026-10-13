import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Cursor from "@/components/ui/Cursor";
import Toast from "@/components/ui/Toast";
import { profile, site } from "@/data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s — Fandy Ahmad",
  },
  description: site.description,
  applicationName: profile.fullName,
  authors: [{ name: profile.fullName }],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.title,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#414A19",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        {children}

        <div className="grain" aria-hidden="true" />
        <div className="frame" aria-hidden="true" />
        <Cursor />
        <Toast />
      </body>
    </html>
  );
}

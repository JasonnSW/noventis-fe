import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Orbitron,
  Open_Sans,
  Fira_Code,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noventis-fe.vercel.app"),
  alternates: { canonical: "/" },
  title: {
    template: "%s | Noventis",
    default: "Noventis — Intelligent Automation for Your Data Analysis",
  },
  description:
    "Noventis is an intelligent Python toolkit built to free data practitioners from repetitive work. It automates data cleaning, exploratory analysis, and visualization so you can focus on deep analysis, complex modeling, and strategic decision-making.",
  openGraph: {
    title: "Noventis — Intelligent Automation for Your Data Analysis",
    description:
      "Noventis helps data scientists automate tedious jobs like data cleaning and exploratory analysis, enabling more time for high-value tasks such as deep analysis, complex modeling, and decision-making.",
    url: "https://noventis-fe.vercel.app",
    siteName: "Noventis",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "Noventis — Intelligent Automation for Your Data Analysis",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noventis — Intelligent Automation for Your Data Analysis",
    description:
      "Automate your data analysis workflow with Noventis — a Python-based toolkit designed to free you from repetitive tasks and accelerate valuable insights.",
    images: ["/Logo.png"],
  },
  icons: {
    icon: [{ url: "/Logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/Logo.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
};

export const dynamic = "force-static";
export const revalidate = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaCode.variable} ${orbitron.variable} ${openSans.variable} antialiased`}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}

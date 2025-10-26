import type { Metadata } from "next";
import { Orbitron, Open_Sans, Fira_Code } from "next/font/google";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  alternates: { canonical: "/" },
  title: {
    template: "%s | Noventis",
    default: "Noventis — Intelligent Automation for Your Data Analysis",
  },
  description:
    "Automate your data analysis with Noventis — intelligent EDA, model selection, and data cleaning in Python.",
  openGraph: {
    title: "Noventis - Intelligent Automation for Your Data Analysis",
    description:
      "Revolutionize your data analysis workflow with Noventis. Automated EDA, intelligent ML model selection with hyperparameter tuning, and smart data preprocessing with minimal code.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Noventis",
    images: [
      {
        url: "/logoo.png",
        width: 1200,
        height: 630,
        alt: "Noventis - Intelligent Automation for Your Data Analysis",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noventis — Intelligent Automation for Your Data Analysis",
    description:
      "Revolutionize your data analysis workflow through intelligent automation. Automated EDA, predictive modeling, and data cleaning with minimal code.",
    images: ["/logoo.png"],
  },
  icons: {
    icon: [{ url: "/Logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/Logo.png", sizes: "180x180" }],
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
        <Toaster
          toastOptions={{
            style: {
              background: "rgba(5,3,41,0.6)",
              backdropFilter: "blur(5px)",
              color: "#4ade80",
              border: "2px solid rgba(23,16,137,0.4)",
              boxShadow: "10px 10px 30px rgba(0,0,0,0.3)",
            },
          }}
        />
      </body>
    </html>
  );
}

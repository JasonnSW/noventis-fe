import type { Metadata } from "next";
import DocsNavbar from "@/components/docs-navbar";
import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsSidebarAutoscroll } from "@/components/docs-sidebar-autoscroll";
import "../globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: "%s | Noventis Docs",
    default: "Noventis Documentation — Learn, Build, and Automate",
  },
  description:
    "Explore the official Noventis documentation. Learn how to install, configure, and use Noventis for intelligent data cleaning, automated EDA, and smart machine learning workflows.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Noventis Documentation",
    description:
      "Official Noventis Docs — step-by-step installation guides, tutorials, and best practices for data cleaning, EDA, and visualization.",
    url: `${baseUrl}/docs`,
    siteName: "Noventis",
    images: [
      {
        url: "/logoo.png",
        width: 1200,
        height: 630,
        alt: "Noventis Documentation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noventis Documentation",
    description:
      "Comprehensive guides for Noventis — from installation to advanced data automation workflows.",
    images: ["/logoo.png"],
  },
  icons: {
    icon: [{ url: "/Logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/Logo.png", sizes: "180x180" }],
  },
};

export const dynamic = "force-static";
export const revalidate = false;

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full bg-[#050329] [--header-h:72px]">
      <DocsNavbar />
      <div className="flex flex-1 lg:gap-2">
        <aside className="hidden lg:block sticky top-[var(--header-h)] max-h-[calc(100dvh-var(--header-h))] w-2xs overflow-y-auto blue-scrollbar p-4 min-w-0">
          <DocsSidebarAutoscroll>
            <DocsSidebar />
          </DocsSidebarAutoscroll>
        </aside>
        <section className="flex-1 p-4 bg-[#04021F] min-w-0 break-words hyphens-auto">
          {children}
        </section>
      </div>
    </main>
  );
}

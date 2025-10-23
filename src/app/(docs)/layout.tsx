import type { Metadata } from "next";
import DocsNavbar from "@/components/docs-navbar";
import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsSidebarAutoscroll } from "@/components/docs-sidebar-autoscroll";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Noventis Docs",
    default: "Noventis Documentation",
  },
  description:
    "Learn how to install, configure, and use Noventis. Step-by-step tutorials, guides, and best practices for data cleaning, EDA, and visualization.",
  openGraph: {
    title: "Noventis Docs",
    description:
      "Official documentation for Noventis — installation, quick start, tutorials, and best practices.",
    url: "https://noventis-fe.vercel.app/docs",
    images: [{ url: "/og-noventis.png", width: 1200, height: 630 }],
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

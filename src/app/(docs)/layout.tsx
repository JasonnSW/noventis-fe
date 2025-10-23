"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { Menu } from "lucide-react";
import Logo from "../../../public/Logo.svg";
import { DocsSidebarAutoscroll } from "@/components/docs-sidebar-autoscroll";
import { DocsSidebar } from "@/components/docs-sidebar";
import { MobileDocsSidebar } from "@/components/mobile-docs-sidebar";
import { useLock } from "@/hooks/use-lock";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs/tutorials/installation" },
];

export default function DocsLayout({ children }: React.PropsWithChildren) {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useLock(open);

  return (
    <main className="min-h-screen w-full bg-[#050329] [--header-h:72px]">
      <header className="sticky top-0 z-50 bg-[#050329] backdrop-blur gradient-border-b-nav">
        <nav className="mx-auto w-full max-w-8xl h-[var(--header-h)]">
          <div className="flex h-full items-center justify-between sm:px-10 md:px-14">
            <div className="flex items-center gap-2">
              <Image src={Logo} alt="Noventis Logo" width={60} height={60} />
              <h1 className="font-orbitron text-xl font-semibold leading-normal tracking-tight text-white">
                Noventis
              </h1>
            </div>

            <div className="hidden lg:flex items-center justify-between gap-x-16 mr-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[14px] font-openSans text-white hover:text-[#FF6849]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="https://github.com"
                aria-label="GitHub"
                className="text-[#FF6849] transition-colors hover:text-[#0F2CAB]"
              >
                <FaGithub size={28} />
              </Link>
            </div>

            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="lg:hidden rounded-md p-2 text-white/90 hover:text-[#FF6849]"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      <MobileDocsSidebar open={open} onClose={() => setOpen(false)} />

      <div className="flex flex-1 lg:gap-2">
        <aside className="hidden lg:block sticky top-[var(--header-h)] max-h-[calc(100dvh-var(--header-h))] w-2xs overflow-y-auto blue-scrollbar p-4">
          <DocsSidebarAutoscroll>
            <DocsSidebar />
          </DocsSidebarAutoscroll>
        </aside>

        <section className="flex-1 p-4 bg-[#04021F]">{children}</section>
      </div>
    </main>
  );
}

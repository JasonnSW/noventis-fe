"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Logo from "@/../public/Logo.svg";
import { useLock } from "@/hooks/use-lock";
import { MobileDocsSidebar } from "@/components/mobile-docs-sidebar";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs/tutorials/installation" },
];

export default function DocsNavbar() {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useLock(open);

  return (
    <header className="sticky top-0 z-50 bg-[#050329] backdrop-blur gradient-border-b-nav">
      <nav className="mx-auto w-full max-w-8xl h-[var(--header-h)]">
        <div className="flex h-full items-center justify-between p-10">
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
              href="https://github.com/bccfilkom/noventis"
              title="Open Noventis GitHub repository"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
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

      <MobileDocsSidebar open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

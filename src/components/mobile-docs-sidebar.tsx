"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { X } from "lucide-react";
import { DocsSidebar } from "@/components/docs-sidebar";

type MobileDocsSidebarProps = {
  open: boolean;
  onClose: () => void;
  headerHeight?: number;
};

export function MobileDocsSidebar({
  open,
  onClose,
  headerHeight = 72,
}: MobileDocsSidebarProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        aria-hidden="true"
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={clsx(
          "fixed z-50 left-0 w-[86vw] max-w-sm bg-[#050329] h-[calc(100dvh-var(--header-h,72px))] shadow-2xl",
          "top-[var(--header-h,72px)] border-r border-[#171089] lg:hidden",
          "transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ "--header-h": `${headerHeight}px` } as React.CSSProperties}
      >
        <div className="h-full overflow-y-auto blue-scrollbar p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-orbitron text-sm tracking-widest text-white">
              MENU
            </span>
            <button
              aria-label="Close menu"
              onClick={onClose}
              className="rounded-md p-2 text-white/80 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <DocsSidebar />
        </div>
      </aside>
    </>
  );
}

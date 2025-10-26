"use client";

import Link from "next/link";
import clsx from "clsx";
import React from "react";
import { usePathname } from "next/navigation";

type DocsSidebarMainLinkProps = {
  href: string;
  title: string;
  icon?: React.ReactNode;
  className?: string;
  external?: boolean;
  titleAttr?: string;
};

export function DocsSidebarMainLink({
  href,
  title,
  icon,
  className,
  external = false,
  titleAttr,
}: DocsSidebarMainLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      title={titleAttr ?? title}
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors -ml-2",
        className
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {icon && (
        <span
          aria-hidden="true"
          className={clsx(
            "shrink-0 transition-colors",
            isActive ? "text-white" : "text-[#807F8C] group-hover:text-white/90"
          )}
        >
          {icon}
        </span>
      )}

      <span
        className={clsx(
          "font-medium tracking-wide transition-colors",
          isActive ? "text-white" : "text-[#B2B1BD] group-hover:text-white"
        )}
      >
        {title}
      </span>
    </Link>
  );
}

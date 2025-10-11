"use client";

import { usePathname } from "next/navigation";
import { NavListLink } from "./nav-list";

export function DocsSidebarLink({
  title,
  path,
  nested = false,
}: {
  title: string;
  path: string;
  nested?: boolean;
}) {
  let pathname = usePathname();

  return (
    <NavListLink
      aria-current={pathname === path ? "page" : undefined}
      href={path}
      nested={nested}
    >
      {title}
    </NavListLink>
  );
}

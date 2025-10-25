"use client";

import { useRouter } from "next/navigation";
import rawIndex from "@/app/(docs)/docs/index";
import { HardDriveDownload, CirclePlay, HandHelping } from "lucide-react";
import { DocsSidebarMainLink } from "./docs-sidebar-main-link";
import { SidebarSearchInput } from "./sidebar-search.input";
import { IndexMap, useSidebarSearch } from "@/hooks/use-sidebar-search";
import { SidebarResults } from "./sidebar-results";

export function DocsSidebar() {
  const router = useRouter();
  const index = rawIndex as IndexMap;
  const { query, filtered, hasResults, firstResultHref, handleChange } =
    useSidebarSearch(index);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && firstResultHref) router.push(firstResultHref);
  };

  return (
    <nav className="mt-2 flex h-full flex-col space-y-4 bg-[#050329]">
      <SidebarSearchInput
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <DocsSidebarMainLink
        href="/docs/tutorials/installation"
        title="Noventis Install"
        icon={<HardDriveDownload className="h-5 w-5" />}
      />
      <DocsSidebarMainLink
        href="/docs/tutorials/quick-start"
        title="Quickstart Guide"
        className="font-bold"
        icon={<CirclePlay className="h-5 w-5" />}
      />
      <DocsSidebarMainLink
        href="/docs/tutorials/contributing"
        title="Contributing Guide"
        icon={<HandHelping className="h-5 w-5" />}
      />

      <SidebarResults
        query={query}
        filtered={filtered}
        hasResults={hasResults}
      />
    </nav>
  );
}

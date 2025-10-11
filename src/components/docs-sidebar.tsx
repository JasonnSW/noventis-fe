import {
  NavList,
  NavListHeading,
  NavListItem,
  NavListItems,
} from "@/components/nav-list";
import { DocsSidebarLink } from "./docs-sidebar-link";
import index from "@/app/(docs)/docs/index";
import { HardDriveDownload, CirclePlay, HandHelping } from "lucide-react";
import { DocsSidebarMainLink } from "./docs-sidebar-main-link";

export function DocsSidebar() {
  return (
    <nav className="flex h-full bg-[#050329] flex-col space-y-4 mt-2">
      <div className="rounded-lg border-2 border-[#171089] bg-[#0b0848] px-3 py-2">
        <input
          placeholder="Search"
          className="w-full font-openSans bg-transparent text-sm text-slate-100 placeholder:text-[#807F8C] outline-none"
        />
      </div>

      <DocsSidebarMainLink
        href="/docs/tutorials/installation"
        title="Noventis Install"
        icon={<HardDriveDownload className="h-5 w-5" />}
      />
      <DocsSidebarMainLink
        href="/docs/tutorials/quick-start"
        title="Quickstart Guide"
        icon={<CirclePlay className="h-5 w-5" />}
      />
      <DocsSidebarMainLink
        href="/docs/tutorials/contributing"
        title="Contributing Guide"
        icon={<HandHelping className="h-5 w-5" />}
      />

      <div className="space-y-6 pt-2">
        {Object.entries(index).map(([category, entries]) => (
          <NavList key={category} data-autoscroll>
            <NavListHeading>{category}</NavListHeading>
            <NavListItems>
              {entries.map(([title, path]) => (
                <NavListItem key={path}>
                  <DocsSidebarLink title={title} path={path} />
                </NavListItem>
              ))}
            </NavListItems>
          </NavList>
        ))}
      </div>
    </nav>
  );
}

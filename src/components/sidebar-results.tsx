import clsx from "clsx";
import {
  NavList,
  NavListHeading,
  NavListItem,
  NavListItems,
} from "@/components/nav-list";
import { DocsSidebarLink } from "./docs-sidebar-link";
import { IndexMap } from "@/hooks/use-sidebar-search";

export function SidebarResults({
  query,
  filtered,
  hasResults,
}: {
  query: string;
  filtered: IndexMap;
  hasResults: boolean;
}) {
  return (
    <div className="space-y-6 pt-2 max-h-[60vh] pr-1">
      {!hasResults ? (
        <div className="px-3 py-2 text-sm text-[#807F8C]">
          No results for <span className="text-slate-200">“{query}”</span>
        </div>
      ) : (
        Object.entries(filtered).map(([category, entries]) => (
          <NavList key={category}>
            <NavListHeading>{category}</NavListHeading>
            <NavListItems>
              {entries.map(([title, path]) => (
                <NavListItem
                  key={path}
                  className={clsx("rounded-md transition-colors")}
                >
                  <DocsSidebarLink title={title} path={path} />
                </NavListItem>
              ))}
            </NavListItems>
          </NavList>
        ))
      )}
    </div>
  );
}

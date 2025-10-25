"use client";

import { useMemo, useState, useCallback } from "react";

export type Entry = readonly [title: string, path: string];
export type IndexMap = Record<string, readonly Entry[]>;

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();

export function useSidebarSearch(index: IndexMap) {
  const [query, setQuery] = useState<string>("");

  const flatList = useMemo<Entry[]>(() => {
    const arr: Entry[] = [];
    Object.values(index).forEach((entries) => {
      entries.forEach((e) => arr.push(e));
    });
    return arr;
  }, [index]);

  const filtered: IndexMap = useMemo(() => {
    if (!query) return index;

    const nq = normalize(query);
    const out: IndexMap = {};

    for (const [category, entries] of Object.entries(index)) {
      const catMatch = normalize(category).includes(nq);
      const keep = catMatch
        ? entries
        : entries.filter(
            ([title, path]) =>
              normalize(title).includes(nq) || normalize(path).includes(nq)
          );

      if (keep.length) out[category] = keep;
    }

    return out;
  }, [index, query]);

  const hasResults = Object.keys(filtered).length > 0;

  const firstResultHref = useMemo(() => {
    if (!query) return null;
    const nq = normalize(query);
    return (
      flatList.find(([t]) => normalize(t) === nq)?.[1] ||
      flatList.find(([t]) => normalize(t).includes(nq))?.[1] ||
      flatList.find(([, p]) => normalize(p).includes(nq))?.[1] ||
      null
    );
  }, [flatList, query]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
    []
  );

  return { query, filtered, hasResults, firstResultHref, handleChange };
}

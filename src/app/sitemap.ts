import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const entry = (
  path: string,
  opts?: Partial<Pick<MetadataRoute.Sitemap[0], "changeFrequency" | "priority">>
): MetadataRoute.Sitemap[0] => ({
  url: `${baseUrl}${path}`,
  lastModified: new Date(),
  changeFrequency: opts?.changeFrequency ?? "weekly",
  priority: opts?.priority ?? 0.7,
});

const routes: string[] = [
  "/",

  "/docs",

  "/docs/data-cleaner",
  "/docs/data-cleaner/encode",
  "/docs/data-cleaner/handle-outliers",
  "/docs/data-cleaner/imputer",
  "/docs/data-cleaner/scale",

  "/docs/eda_auto",

  "/docs/predictor",
  "/docs/predictor/auto_ml",
  "/docs/predictor/manual_ml",

  "/docs/tutorials",
  "/docs/tutorials/installation",
  "/docs/tutorials/quick-start",

  "/docs/contributing",
];

const priorityOverrides: Record<
  string,
  Partial<Pick<MetadataRoute.Sitemap[0], "changeFrequency" | "priority">>
> = {
  "/": { priority: 1.0, changeFrequency: "weekly" },
  "/docs": { priority: 0.9, changeFrequency: "weekly" },
  "/docs/tutorials": { priority: 0.8, changeFrequency: "weekly" },
  "/docs/tutorials/installation": { priority: 0.8, changeFrequency: "weekly" },
  "/docs/predictor": { priority: 0.75, changeFrequency: "weekly" },

  "/docs/data-cleaner": { priority: 0.5, changeFrequency: "yearly" },
  "/docs/data-cleaner/encode": { priority: 0.4, changeFrequency: "never" },
  "/docs/data-cleaner/imputer": { priority: 0.4, changeFrequency: "never" },
  "/docs/data-cleaner/scale": { priority: 0.4, changeFrequency: "never" },
  "/docs/data-cleaner/handle-outliers": {
    priority: 0.4,
    changeFrequency: "never",
  },
  "/docs/contributing": { priority: 0.3, changeFrequency: "yearly" },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const unique = Array.from(new Set(routes));

  return unique.map((path) => entry(path, priorityOverrides[path]));
}

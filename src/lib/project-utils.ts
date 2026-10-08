import type { Project, ProjectCategory } from "../data/projects";

export const CATEGORIES: { id: ProjectCategory; label: string; chip: string }[] = [
  { id: "product", label: "Product", chip: "Products" },
  { id: "client", label: "Client site", chip: "Client sites" },
  { id: "demo", label: "Demo", chip: "Demos" },
  { id: "ai", label: "AI", chip: "AI" },
];

export const categoryLabel = (p: Project) =>
  CATEGORIES.find((c) => c.id === p.category)?.label ?? p.category;

export const thumbSrc = (p: Project) => p.thumbnail ?? `/projects/${p.slug}.webp`;

export const urlLabel = (p: Project) =>
  p.url ? p.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "in progress";

/** Stable hue (0–359) so each generated cover keeps its colour. */
export function hueOf(slug: string) {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
}

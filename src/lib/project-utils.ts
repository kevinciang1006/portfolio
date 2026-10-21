import type { Project, ProjectCategory } from "../data/projects";

export const CATEGORIES: { id: ProjectCategory; label: string; chip: string }[] = [
  { id: "work", label: "Professional work", chip: "Professional Work" },
  { id: "commercial", label: "Commercial product", chip: "Commercial Product" },
  { id: "client", label: "Client work", chip: "Client Work" },
  { id: "demo", label: "Demo", chip: "Demos" },
];

export const categoryLabel = (p: Project) =>
  CATEGORIES.find((c) => c.id === p.category)?.label ?? p.category;

export const thumbSrc = (p: Project) => p.thumbnail ?? `/projects/${p.slug}.webp`;

/** Short silent clip of the site, played over the thumbnail on hover. */
export const previewSrc = (p: Project) => `/projects/previews/${p.slug}.mp4`;

export const urlLabel = (p: Project) =>
  p.url ? p.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : p.caseStudy ? "private platform" : "in progress";

/** Has a window to open: live projects, and private work shown through samples. */
export const isWork = (p: Project) => p.category === "work";

/** Highlighted categories: professional work is amber, commercial products green, client work blue. */
export type HighlightKind = "work" | "commercial" | "client";
const HIGHLIGHTS: Partial<Record<ProjectCategory, { kind: HighlightKind; badge: string }>> = {
  work: { kind: "work", badge: "Production" },
  commercial: { kind: "commercial", badge: "Commercial" },
  client: { kind: "client", badge: "Client" },
};
export const highlight = (p: Project) => HIGHLIGHTS[p.category] ?? null;

export const canOpen = (p: Project) => !!p.url || !!p.caseStudy;

/** Stable hue (0–359) so each generated cover keeps its colour. */
export function hueOf(slug: string) {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
}

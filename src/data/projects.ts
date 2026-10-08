export type ProjectCategory = "product" | "client" | "demo" | "ai";

export interface Project {
  slug: string; // also the thumbnail filename: /projects/{slug}.webp
  name: string;
  url?: string; // optional: some projects aren't live yet
  description: string;
  category: ProjectCategory;
  tags: string[];
  featured: boolean;
  thumbnail?: string; // defaults to /projects/{slug}.webp
}

// Adding a project = adding one entry here. Featured entries fill the bento
// grid in order; every entry appears in the index.
export const projects: Project[] = [
  {
    slug: "gavel",
    name: "gavel",
    url: "https://gavel.kevinciang.com",
    description: "Real-time auction room with live bidding.", // TODO: real description
    category: "demo",
    tags: ["React", "WebSockets", "Node"],
    featured: true,
  },
  {
    slug: "grain-archive",
    name: "grain-archive",
    url: "https://grain-archive.kevinciang.com",
    description: "Film photo archive with EXIF search.", // TODO: real description
    category: "demo",
    tags: ["Next.js", "Postgres"],
    featured: true,
  },
  {
    slug: "homefinder",
    name: "homefinder",
    url: "https://homefinder.kevinciang.com",
    description: "Property search with map-first filters.", // TODO: real description
    category: "demo",
    tags: ["React", "Maps", "Zustand"],
    featured: true,
  },
  {
    slug: "ng-finboard",
    name: "ng-finboard",
    url: "https://ng-finboard.kevinciang.com",
    description: "Finance dashboard built on Angular signals.", // TODO: real description
    category: "demo",
    tags: ["Angular", "RxJS", "Charts"],
    featured: true,
  },
  {
    slug: "atlas",
    name: "atlas",
    description: "AI application. Details to come.", // TODO: real description
    category: "ai",
    tags: ["LLM", "TypeScript"],
    featured: false,
  },
  {
    slug: "product-a",
    name: "product-a",
    url: "https://example.com",
    description: "Placeholder. Replace with a real project.", // TODO: real description
    category: "product",
    tags: ["React"],
    featured: false,
  },
  {
    slug: "product-b",
    name: "product-b",
    url: "https://example.com",
    description: "Placeholder. Replace with a real project.", // TODO: real description
    category: "product",
    tags: ["Next.js"],
    featured: false,
  },
  {
    slug: "client-site-a",
    name: "client-site-a",
    url: "https://example.com",
    description: "Placeholder. Replace with a real project.", // TODO: real description
    category: "client",
    tags: ["Astro"],
    featured: false,
  },
  {
    slug: "client-site-b",
    name: "client-site-b",
    url: "https://example.com",
    description: "Placeholder. Replace with a real project.", // TODO: real description
    category: "client",
    tags: ["WordPress"],
    featured: false,
  },
  {
    slug: "client-site-c",
    name: "client-site-c",
    url: "https://example.com",
    description: "Placeholder. Replace with a real project.", // TODO: real description
    category: "client",
    tags: ["Vue"],
    featured: false,
  },
  {
    slug: "ai-tool-a",
    name: "ai-tool-a",
    url: "https://example.com",
    description: "Placeholder. Replace with a real project.", // TODO: real description
    category: "ai",
    tags: ["Python", "RAG"],
    featured: false,
  },
];

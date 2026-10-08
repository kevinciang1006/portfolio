import { useState } from "react";
import { projects } from "../data/projects";
import type { ProjectCategory } from "../data/projects";
import { CATEGORIES } from "../lib/project-utils";
import { ProjectCard } from "./ProjectCard";
import type { OpenProject } from "./ProjectCard";
import { WindowBar } from "./WindowBar";

type Filter = "all" | ProjectCategory;
type View = "grid" | "list";

export function ProjectIndex({ onOpen }: { onOpen: OpenProject }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("grid");

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: projects.length },
    ...CATEGORIES.map((c) => ({
      id: c.id as Filter,
      label: c.chip,
      count: projects.filter((p) => p.category === c.id).length,
    })).filter((c) => c.count > 0),
  ];
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="index" className="section" aria-labelledby="index-h">
      <div className="win">
        <WindowBar title={`~/projects — ${visible.length} item${visible.length === 1 ? "" : "s"}`} />
        <div className="win__body">
          <div className="index__head">
            <h2 id="index-h">All projects</h2>
            <div role="group" aria-label="View" className="seg">
              {(["grid", "list"] as const).map((v) => (
                <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)}>
                  {v === "grid" ? "Grid" : "List"}
                </button>
              ))}
            </div>
          </div>
          <div role="group" aria-label="Filter projects" className="chips">
            {chips.map((c) => (
              <button key={c.id} type="button" className="chip" aria-pressed={filter === c.id} onClick={() => setFilter(c.id)}>
                {c.label}
                <span className="chip__count">{c.count}</span>
              </button>
            ))}
          </div>
          <ul className={view === "grid" ? "tiles" : "rows"}>
            {visible.map((p) => (
              <ProjectCard key={p.slug} project={p} variant={view === "grid" ? "tile" : "row"} onOpen={onOpen} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

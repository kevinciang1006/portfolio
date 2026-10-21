import { useState } from "react";
import { projects } from "../data/projects";
import type { ProjectCategory } from "../data/projects";
import { CATEGORIES } from "../lib/project-utils";
import { ProjectCard } from "./ProjectCard";
import type { OpenProject } from "./ProjectCard";
import { WindowBar } from "./WindowBar";

type View = "grid" | "list";

const counts = (c: ProjectCategory) => projects.filter((p) => p.category === c).length;
const categories = CATEGORIES.filter((c) => counts(c.id) > 0);
// Demos stay hidden until a visitor ticks them, so the index isn't crowded.
const HIDDEN_BY_DEFAULT: ProjectCategory[] = ["demo"];

export function ProjectIndex({ onOpen }: { onOpen: OpenProject }) {
  const [shown, setShown] = useState<Set<ProjectCategory>>(
    () => new Set(categories.map((c) => c.id).filter((id) => !HIDDEN_BY_DEFAULT.includes(id))),
  );
  const [view, setView] = useState<View>("grid");

  const toggle = (id: ProjectCategory) =>
    setShown((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  const visible = projects.filter((p) => shown.has(p.category));

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
          <fieldset className="chips">
            <legend className="sr-only">Show project types</legend>
            {categories.map((c) => (
              <label key={c.id} className={`chip chip--${c.id}`}>
                <input type="checkbox" checked={shown.has(c.id)} onChange={() => toggle(c.id)} />
                <span className="chip__box" aria-hidden="true" />
                {c.chip}
                <span className="chip__count">{counts(c.id)}</span>
              </label>
            ))}
          </fieldset>
          {visible.length === 0 && <p className="index__empty">Nothing selected. Tick a type above to see projects.</p>}
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

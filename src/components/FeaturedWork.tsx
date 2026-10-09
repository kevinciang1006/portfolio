import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import type { OpenProject } from "./ProjectCard";
import { WindowBar } from "./WindowBar";

export function FeaturedWork({ onOpen }: { onOpen: OpenProject }) {
  const featured = projects.filter((p) => p.featured);
  return (
    <section id="work" className="section" aria-labelledby="work-h">
      <div className="win">
        <WindowBar title="~/featured" />
        <div className="win__body">
          <h2 id="work-h">Featured work</h2>
          <div className="bento">
            {/* Layout lives in CSS: a 7:5 lead row, then the rest in threes. */}
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} variant="featured" onOpen={onOpen} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

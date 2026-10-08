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
            {featured.map((p, i) => (
              // Large, small, small, large… repeating: rows alternate 7:5 and 5:7.
              <ProjectCard key={p.slug} project={p} variant="featured" large={i % 4 === 0 || i % 4 === 3} onOpen={onOpen} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import type { Project } from "../data/projects";
import { canOpen, categoryLabel, isWork, urlLabel } from "../lib/project-utils";
import { Thumb } from "./Thumb";

export type OpenProject = (project: Project, trigger: HTMLElement) => void;

interface Props {
  project: Project;
  variant: "featured" | "tile" | "row";
  onOpen: OpenProject;
}

function VisitLink({ project, className, children }: { project: Project; className: string; children: ReactNode }) {
  return (
    <a
      className={className}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.name} live (opens in a new tab)`}
    >
      {children}
    </a>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="tags" aria-label="Tech">
      {tags.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

/** Opens the project window when there is one; a plain, inert box otherwise. */
function Opener({ project, onOpen, className, children }: { project: Project; onOpen: OpenProject; className: string; children: ReactNode }) {
  if (!canOpen(project)) return <div className={className}>{children}</div>;
  return (
    <button
      type="button"
      className={className}
      aria-label={`Open ${project.name} window`}
      onClick={(e) => onOpen(project, e.currentTarget)}
    >
      {children}
    </button>
  );
}

export function ProjectCard({ project, variant, onOpen }: Props) {
  const live = !!project.url;
  const state = (canOpen(project) ? "is-live" : "is-static") + (isWork(project) ? " is-work" : "");
  const pending = live || project.caseStudy ? null : "In progress";

  if (variant === "featured") {
    return (
      <article className={`card card--featured ${state}`}>
        <Opener project={project} onOpen={onOpen} className="card__shot">
          <span className="card__url">
            <span className="card__url-dot" />
            {urlLabel(project)}
          </span>
          {isWork(project) && <span className="work-badge work-badge--shot">Production</span>}
          <Thumb project={project} className="thumb--fill" preview />
        </Opener>
        <div className="card__body">
          <div className="card__text">
            <div className="card__title">
              <h3>{project.name}</h3>
              <span className="mono-label">{categoryLabel(project)}</span>
            </div>
            <p>{project.description}</p>
            <Tags tags={project.tags} />
          </div>
          {live ? (
            <VisitLink project={project} className="btn-visit">
              Visit live ↗
            </VisitLink>
          ) : (
            pending && <span className="mono-label card__pending">{pending}</span>
          )}
        </div>
      </article>
    );
  }

  if (variant === "tile") {
    return (
      <li className={`card card--tile ${state}`}>
        <Opener project={project} onOpen={onOpen} className="tile__shot">
          {isWork(project) && <span className="work-badge work-badge--shot">Production</span>}
          <Thumb project={project} className="thumb--tile" preview />
        </Opener>
        <div className="tile__foot">
          <div className="tile__text">
            <span className="tile__name">{project.name}</span>
            <span className="mono-label">{pending ? `${categoryLabel(project)} · in progress` : categoryLabel(project)}</span>
          </div>
          {live && (
            <VisitLink project={project} className="btn-icon">
              <span aria-hidden="true">↗</span>
            </VisitLink>
          )}
        </div>
      </li>
    );
  }

  return (
    <li className={`row ${state}`}>
      <Opener project={project} onOpen={onOpen} className="row__main">
        <Thumb project={project} className="thumb--row" preview />
        <span className="row__text">
          <span className="row__name">{project.name}</span>
          <span className="row__desc">{project.description}</span>
        </span>
      </Opener>
      <span className="row__meta">
        {categoryLabel(project)} · {project.tags.join(", ")}
      </span>
      {live ? (
        <VisitLink project={project} className="btn-chip">
          Visit live ↗
        </VisitLink>
      ) : (
        pending && <span className="mono-label row__pending">{pending}</span>
      )}
    </li>
  );
}

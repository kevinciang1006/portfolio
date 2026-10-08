import type { ReactNode } from "react";
import type { Project } from "../data/projects";
import { categoryLabel, urlLabel } from "../lib/project-utils";
import { Thumb } from "./Thumb";

export type OpenProject = (project: Project, trigger: HTMLElement) => void;

interface Props {
  project: Project;
  variant: "featured" | "tile" | "row";
  large?: boolean;
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

/** Opens the project window when live; a plain, inert box when there is no url. */
function Opener({ project, onOpen, className, children }: { project: Project; onOpen: OpenProject; className: string; children: ReactNode }) {
  if (!project.url) return <div className={className}>{children}</div>;
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

export function ProjectCard({ project, variant, large = false, onOpen }: Props) {
  const live = !!project.url;
  const state = live ? "is-live" : "is-static";

  if (variant === "featured") {
    return (
      <article className={`card card--featured ${large ? "is-large" : "is-small"} ${state}`}>
        <Opener project={project} onOpen={onOpen} className="card__shot">
          <span className="card__url">
            <span className="card__url-dot" />
            {urlLabel(project)}
          </span>
          <Thumb project={project} className="thumb--fill" />
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
            <span className="mono-label card__pending">In progress</span>
          )}
        </div>
      </article>
    );
  }

  if (variant === "tile") {
    return (
      <li className={`card card--tile ${state}`}>
        <Opener project={project} onOpen={onOpen} className="tile__shot">
          <Thumb project={project} className="thumb--tile" />
        </Opener>
        <div className="tile__foot">
          <div className="tile__text">
            <span className="tile__name">{project.name}</span>
            <span className="mono-label">{live ? categoryLabel(project) : `${categoryLabel(project)} · in progress`}</span>
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
        <Thumb project={project} className="thumb--row" />
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
        <span className="mono-label row__pending">In progress</span>
      )}
    </li>
  );
}

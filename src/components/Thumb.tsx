import { useState } from "react";
import type { CSSProperties } from "react";
import type { Project } from "../data/projects";
import { hueOf, thumbSrc } from "../lib/project-utils";

interface Props {
  project: Project;
  /** Hero and above-the-fold images load eagerly; everything else is lazy. */
  eager?: boolean;
  className?: string;
}

/** Screenshot over a generated cover. If the image fails, the cover stays. */
export function Thumb({ project, eager = false, className = "" }: Props) {
  const src = thumbSrc(project);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const style = { "--hue": hueOf(project.slug) } as CSSProperties;

  return (
    <span className={`thumb ${className}`} style={style}>
      <span className="cover" aria-hidden="true">
        <span className="cover__mark">{project.name[0].toUpperCase()}</span>
        <span className="cover__name">{project.name}</span>
      </span>
      {failedSrc !== src && (
        <img
          src={src}
          alt=""
          width={1600}
          height={1000}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailedSrc(src)}
        />
      )}
    </span>
  );
}

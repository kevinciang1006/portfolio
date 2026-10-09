import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Project } from "../data/projects";
import { hueOf, previewSrc, thumbSrc } from "../lib/project-utils";

interface Props {
  project: Project;
  /** Hero and above-the-fold images load eagerly; everything else is lazy. */
  eager?: boolean;
  /** Play a short clip of the site while the parent control is hovered or focused. */
  preview?: boolean;
  className?: string;
}

// Only where hovering is real and motion is welcome; touch keeps the still image.
const canPreview = () => matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;

/** Screenshot over a generated cover. If the image fails, the cover stays. */
export function Thumb({ project, eager = false, preview = false, className = "" }: Props) {
  const src = thumbSrc(project);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const style = { "--hue": hueOf(project.slug) } as CSSProperties;

  useEffect(() => {
    const v = video.current;
    const host = v?.parentElement?.parentElement;
    if (!v || !host) return;
    const play = (e: Event) => {
      if (e instanceof PointerEvent && e.pointerType === "touch") return;
      if (!canPreview()) return;
      if (!v.getAttribute("src")) v.src = previewSrc(project); // first hover only: nothing downloads up front
      v.muted = true;
      v.play().catch(() => {});
    };
    const stop = () => {
      v.pause();
      v.classList.remove("is-playing");
      if (v.readyState > 0) v.currentTime = 0;
    };
    const shown = () => v.classList.add("is-playing");
    host.addEventListener("pointerenter", play);
    host.addEventListener("pointerleave", stop);
    host.addEventListener("focus", play);
    host.addEventListener("blur", stop);
    v.addEventListener("playing", shown);
    return () => {
      host.removeEventListener("pointerenter", play);
      host.removeEventListener("pointerleave", stop);
      host.removeEventListener("focus", play);
      host.removeEventListener("blur", stop);
      v.removeEventListener("playing", shown);
    };
  }, [project]);

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
      {preview && <video ref={video} muted playsInline loop preload="none" aria-hidden="true" />}
    </span>
  );
}

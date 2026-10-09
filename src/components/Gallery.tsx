import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Project } from "../data/projects";
import { SHOTS } from "../data/shots";
import { hueOf, previewSrc, thumbSrc } from "../lib/project-utils";

interface Props {
  project: Project;
}

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The popup's stage: the site clip plays first, then the screenshots.
 * Arrows, the strip, swipes and ←/→ move between them.
 */
export function Gallery({ project }: Props) {
  const shots = SHOTS[project.slug] ?? [];
  const slides = [{ src: thumbSrc(project), label: "Preview" }, ...shots];
  const count = slides.length;
  const [at, setAt] = useState(0);
  const [dir, setDir] = useState(1);
  const video = useRef<HTMLVideoElement>(null);
  const style = { "--hue": hueOf(project.slug) } as CSSProperties;

  const go = (to: number) => {
    const next = (to + count) % count;
    if (next === at) return;
    setDir(to > at ? 1 : -1);
    setAt(next);
  };
  const goRef = useRef(go);
  goRef.current = go;
  const atRef = useRef(at);
  atRef.current = at;

  // The clip plays whenever it's on stage (after the window has opened), and rests otherwise.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (at !== 0 || reduced()) {
      v.pause();
      return;
    }
    const t = setTimeout(() => {
      v.muted = true;
      v.play().catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [at]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goRef.current(atRef.current + 1);
      if (e.key === "ArrowLeft") goRef.current(atRef.current - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Horizontal swipe on touch screens.
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touch.current;
    touch.current = null;
    if (!s) return;
    const dx = e.changedTouches[0].clientX - s.x;
    const dy = e.changedTouches[0].clientY - s.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) go(at + (dx < 0 ? 1 : -1));
  };

  return (
    <div className="gallery" style={style}>
      <div
        className="gallery__stage"
        data-dir={dir > 0 ? "next" : "prev"}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
        aria-label={`${project.name} screens`}
      >
        {slides.map((s, i) => (
          <div
            key={s.src + i}
            className={`gallery__slide${i === at ? " is-active" : ""}`}
            aria-hidden={i !== at}
          >
            <img src={s.src} alt={i === 0 ? `${project.name}` : `${project.name}: ${s.label}`} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
            {i === 0 && (
              <video ref={video} src={previewSrc(project)} poster={s.src} muted playsInline loop preload="auto" aria-hidden="true" />
            )}
          </div>
        ))}
        {count > 1 && (
          <>
            <button type="button" className="gallery__arrow gallery__arrow--prev" onClick={() => go(at - 1)} aria-label="Previous screen">
              ‹
            </button>
            <button type="button" className="gallery__arrow gallery__arrow--next" onClick={() => go(at + 1)} aria-label="Next screen">
              ›
            </button>
            <span className="gallery__count" aria-live="polite">
              {at === 0 ? "▶ Preview" : slides[at].label} · {at + 1}/{count}
            </span>
          </>
        )}
      </div>
      {count > 1 && (
        <div className="gallery__strip" role="tablist" aria-label="Screens">
          {slides.map((s, i) => (
            <button
              key={s.src + i}
              type="button"
              role="tab"
              aria-selected={i === at}
              aria-label={i === 0 ? "Play preview" : s.label}
              className={`gallery__pick${i === at ? " is-active" : ""}${i === 0 ? " gallery__pick--clip" : ""}`}
              onClick={() => go(i)}
            >
              <img src={s.src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef } from "react";
import type { Project } from "../data/projects";
import { categoryLabel, urlLabel } from "../lib/project-utils";
import { Thumb } from "./Thumb";

interface Props {
  project: Project;
  origin: DOMRect;
  onClose: () => void;
}

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function fromTransform(a: DOMRect, win: HTMLElement) {
  const b = win.getBoundingClientRect();
  const dx = a.left + a.width / 2 - (b.left + b.width / 2);
  const dy = a.top + a.height / 2 - (b.top + b.height / 2);
  return `translate(${dx}px, ${dy}px) scale(${a.width / b.width}, ${a.height / b.height})`;
}

export function ProjectWindow({ project, origin, onClose }: Props) {
  const winRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const close = () => {
    const win = winRef.current;
    const back = backRef.current;
    if (!win || !back || reduced() || closing.current) return onCloseRef.current();
    closing.current = true;
    back.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: "forwards" });
    win
      .animate(
        [
          { transform: "none", opacity: 1 },
          { transform: fromTransform(origin, win), opacity: 0 },
        ],
        { duration: 220, easing: "cubic-bezier(.4,0,.6,1)", fill: "forwards" },
      )
      .addEventListener("finish", () => onCloseRef.current());
  };
  const closeFn = useRef(close);
  closeFn.current = close;

  useEffect(() => {
    const win = winRef.current;
    const back = backRef.current;
    closeRef.current?.focus({ preventScroll: true });
    if (win && back && !reduced()) {
      back.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250 });
      win.animate(
        [
          { transform: fromTransform(origin, win), opacity: 0.4 },
          { transform: "none", opacity: 1 },
        ],
        { duration: 440, easing: "cubic-bezier(.2,.85,.25,1)" },
      );
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeFn.current();
        return;
      }
      if (e.key !== "Tab" || !win) return;
      const els = [...win.querySelectorAll<HTMLElement>("a[href],button")];
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      const active = document.activeElement;
      if (!win.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={backRef}
      className="backdrop"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div ref={winRef} className="modal" role="dialog" aria-modal="true" aria-labelledby="win-title">
        <div className="modal__bar">
          <span className="dots dots--close" aria-hidden="true" />
          <span className="win-bar__title">
            {project.name} — {urlLabel(project)}
          </span>
          <button ref={closeRef} type="button" className="btn-close" onClick={close}>
            Close <span>Esc</span>
          </button>
        </div>
        <div className="modal__shot">
          <Thumb project={project} eager className="thumb--fill thumb--modal" />
        </div>
        <div className="modal__body">
          <div className="modal__text">
            <div className="card__title">
              <h2 id="win-title">{project.name}</h2>
              <span className="mono-label">{categoryLabel(project)}</span>
            </div>
            <p>{project.description}</p>
            <ul className="tags tags--lg" aria-label="Tech">
              {project.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          {project.url && (
            <a className="btn-primary btn-primary--lg modal__visit" href={project.url} target="_blank" rel="noopener noreferrer">
              Visit live ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

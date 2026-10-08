import type { CSSProperties } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { hueOf, urlLabel } from "../lib/project-utils";
import { Thumb } from "./Thumb";
import type { OpenProject } from "./ProjectCard";
import { WindowBar } from "./WindowBar";

// Stacked-window layout for the first three featured projects.
const SLOTS = [
  { x: "0%", y: "2%", w: "76%", z: 1, r: "-1.2deg" },
  { x: "24%", y: "30%", w: "72%", z: 2, r: ".8deg" },
  { x: "6%", y: "58%", w: "58%", z: 3, r: "-.4deg" },
];

export function Hero({ onOpen }: { onOpen: OpenProject }) {
  const featured = projects.filter((p) => p.featured && p.url);
  const stack = featured.slice(0, SLOTS.length);
  // Dock: every featured project, plus in-progress ones that have no window yet.
  const dock = projects.filter((p) => p.featured || !p.url);

  return (
    <>
      <section className="hero" aria-label="Introduction">
        <div className="win win--hero" data-boot="1" style={{ "--i": 1 } as CSSProperties}>
          <WindowBar title="about.md" />
          <div className="hero__body">
            <h1>{profile.name}</h1>
            <p>{profile.intro}</p>
            <div className="hero__links">
              <a className="btn-primary" href={`mailto:${profile.email}`}>
                <Mail size={16} aria-hidden="true" /> Email me
              </a>
              <a className="btn-chip btn-chip--lg" href={profile.github} target="_blank" rel="noopener noreferrer">
                <Github size={16} aria-hidden="true" /> GitHub
              </a>
              <a className="btn-chip btn-chip--lg" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={16} aria-hidden="true" /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="stack" role="group" aria-label="Open project windows">
          {stack.map((p, i) => {
            const s = SLOTS[i];
            return (
              <div
                key={p.slug}
                className="stack__win"
                data-boot={i + 2}
                style={{ left: s.x, top: s.y, width: s.w, zIndex: s.z, transform: `rotate(${s.r})`, "--i": i + 2 } as CSSProperties}
              >
                <button type="button" className="stack__btn" aria-label={`Open ${p.name}`} onClick={(e) => onOpen(p, e.currentTarget)}>
                  <span className="stack__bar">
                    <span className="dots dots--sm" aria-hidden="true" />
                    <span className="stack__title">
                      {p.name} — {urlLabel(p)}
                    </span>
                  </span>
                  <Thumb project={p} eager className="thumb--hero" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <nav className="dock" data-boot="5" aria-label="Project shortcuts" style={{ "--i": 5 } as CSSProperties}>
        {dock.map((p) => {
          const inner = (
            <>
              <span className="dock__icon" style={{ "--hue": hueOf(p.slug) } as CSSProperties}>
                {p.name[0].toUpperCase()}
              </span>
              <span className="dock__name">{p.name}</span>
            </>
          );
          return p.url ? (
            <button key={p.slug} type="button" className="dock__item" aria-label={`Open ${p.name} window`} onClick={(e) => onOpen(p, e.currentTarget)}>
              {inner}
            </button>
          ) : (
            <div key={p.slug} className="dock__item is-static" title="In progress">
              {inner}
            </div>
          );
        })}
      </nav>
    </>
  );
}

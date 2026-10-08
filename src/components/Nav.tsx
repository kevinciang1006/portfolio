import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { profile } from "../data/profile";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#index", label: "Index" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const clock = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: profile.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

export function Nav() {
  const [time, setTime] = useState(clock);

  useEffect(() => {
    const id = setInterval(() => setTime(clock()), 30000);
    return () => clearInterval(id);
  }, []);

  // Keep the scroll offset in sync with the sticky nav, which wraps on narrow screens.
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".nav");
    if (!header) return;
    const set = () =>
      document.documentElement.style.setProperty("--nav-h", `${header.offsetHeight + 8}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    if (href === "#top") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior });
      history.replaceState(null, "", "#top");
      return;
    }
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior, block: "start" });
    history.replaceState(null, "", href);
  };

  return (
    <header className="nav" data-boot="0">
      <nav aria-label="Primary" className="nav__links">
        <a href="#top" className="nav__brand" onClick={(e) => go(e, "#top")}>
          kevin.os
        </a>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="nav__status">
        <span className="nav__avail">
          <span className="nav__pulse" aria-hidden="true" />
          {profile.availability}
        </span>
        <span className="nav__time">
          {profile.city} · {time} {profile.timeZoneLabel}
        </span>
      </div>
    </header>
  );
}

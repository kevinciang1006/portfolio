import { useEffect, useRef } from "react";
import type { ReactNode, MouseEvent } from "react";
import { Mail, Github, Linkedin, ArrowUpRight, MapPin } from "lucide-react";
import "./portfolio.css";

// ─────────────────────────────────────────────────────────────
// EDIT YOUR CONTENT HERE
// ─────────────────────────────────────────────────────────────
const PROFILE = {
  name: "Kevin Ciang",
  role: "Senior Software Engineer",
  location: "Medan, Indonesia · Remote",
  headline: "I build and lead the frontend of production SaaS — and the systems that ship it.",
  intro:
    "8+ years across React, Vue, and Angular, working toward a fullstack profile on the Node/TypeScript side. I'm comfortable owning a feature end to end: the UI, the API behind it, and the deploy pipeline that ships it.",
  availability: "Open to senior / staff roles",
  email: "kevinciang1006@gmail.com",
  github: "https://github.com/kevinciang1006", // ← verify your handle
  linkedin: "https://www.linkedin.com/in/kevinciang1006/",
};

interface Job {
  company: string;
  meta: string;
  role: string;
  period: string;
  summary: string;
  stack: string[];
}

const EXPERIENCE: Job[] = [
  {
    company: "Organisation Solutions",
    meta: "Singapore · Remote",
    role: "Senior Software Engineer",
    period: "2024 — Present", // ← check dates
    summary:
      "Leading the frontend of a leadership-assessment SaaS platform. Integrated WorkOS (auth), Stripe (billing), PostHog, Courier, and Puppeteer (PDF generation).",
    stack: ["React 19", "Vite", "TypeScript", "shadcn/ui", "Vitest"],
  },
  {
    company: "Produgie",
    meta: "Remote",
    role: "Senior Software Engineer",
    period: "2021 — 2024", // ← check dates
    summary:
      "Owned the Sprint module across Angular assessment platforms (GLA / GL360). Built and maintained end-to-end test coverage.",
    stack: ["Angular", "TypeScript", "Cypress"],
  },
  {
    company: "ProSpark",
    meta: "Team of 5",
    role: "Dev Team Lead · Full Stack Developer",
    period: "2019 — 2021", // ← check dates
    summary:
      "Led a team of five on LMS customization for clients including Gojek and Pizza Hut. Owned delivery across frontend and backend.",
    stack: ["Vue", "React", "Laravel"],
  },
  {
    company: "Maximize Play",
    meta: "Full Stack · Game Dev",
    role: "Full Stack & Game Developer",
    period: "2017 — 2019", // ← check dates
    summary:
      "Built web and mobile apps plus games. Shipped across the stack and into real-time game logic.",
    stack: ["Angular", "Ionic", "Firebase", "Laravel", "Unity3D / C#"],
  },
];

interface Project {
  name: string;
  url: string;
  blurb: string;
  tags: string[];
}

// NOTE: blurbs + tags are still my guesses — replace with the real ones.
const PROJECTS: Project[] = [
  {
    name: "grain-archive",
    url: "https://grain-archive.kevinciang.com",
    blurb: "Film-photography archive and viewer with a focus on browsing.",
    tags: ["React", "Vite"],
  },
  {
    name: "homefinder",
    url: "https://homefinder.kevinciang.com",
    blurb: "Property search built around the Philippine market.",
    tags: ["React", "Maps", "Search"],
  },
  {
    name: "gavel",
    url: "https://gavel.kevinciang.com",
    blurb: "Placeholder blurb for gavel.", // ← TODO: replace with real description
    tags: ["React", "TypeScript"],
  },
  {
    name: "ng-finboard",
    url: "https://ng-finboard.kevinciang.com",
    blurb: "Placeholder blurb for ng-finboard.", // ← TODO: replace with real description
    tags: ["Angular", "TypeScript", "RxJS"],
  },
];

interface SkillGroup {
  group: string;
  items: string[];
}

const SKILLS: SkillGroup[] = [
  {
    group: "Frontend",
    items: ["React", "Vue", "Angular", "Angular Material", "TypeScript", "TailwindCSS", "shadcn/ui", "Vitest", "Cypress"],
  },
  {
    group: "Backend",
    items: ["Node.js", "NestJS", "Python / FastAPI", "Laravel", "PostgreSQL", "REST APIs", "SQL / NoSQL"],
  },
  {
    group: "Infra & Tools",
    items: ["Docker", "GitHub Actions", "Google Cloud Run", "AWS", "GCP", "Vercel"],
  },
];

const NAV = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

// ─────────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="pf-eyebrow">
      <span className="pf-eyebrow-tick" aria-hidden="true" />
      {children}
    </p>
  );
}

export default function App() {
  const revealRefs = useRef<HTMLElement[]>([]);
  revealRefs.current = [];

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const handleNav = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      revealRefs.current.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealRefs.current.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="pf-root">
      {/* NAV */}
      <header className="pf-nav">
        <a href="#top" className="pf-nav-name" onClick={(e) => handleNav(e, "#top")}>
          Kevin Ciang<span className="pf-nav-dot">.</span>
        </a>
        <nav className="pf-nav-links" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={(e) => handleNav(e, n.href)}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="pf-nav-cta" href="#contact" onClick={(e) => handleNav(e, "#contact")}>
          Get in touch
        </a>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="pf-hero">
          <div className="pf-hero-inner pf-load">
            <img src="/profile.jpeg" alt={PROFILE.name} className="pf-hero-avatar" />
            <p className="pf-hero-meta">
              <MapPin size={13} strokeWidth={2} />
              {PROFILE.role} · {PROFILE.location}
            </p>
            <h1 className="pf-hero-title">{PROFILE.headline}</h1>
            <p className="pf-hero-sub">{PROFILE.intro}</p>

            <div className="pf-hero-actions">
              <a className="pf-btn pf-btn-primary" href={`mailto:${PROFILE.email}`}>
                <Mail size={16} strokeWidth={2} /> Email me
              </a>
              <a className="pf-btn" href={PROFILE.github} target="_blank" rel="noreferrer">
                <Github size={16} strokeWidth={2} /> GitHub
              </a>
              <a className="pf-btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={16} strokeWidth={2} /> LinkedIn
              </a>
            </div>

            <p className="pf-availability">
              <span className="pf-dot-live" aria-hidden="true" />
              {PROFILE.availability}
            </p>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="pf-section pf-section--narrow">
          <div ref={addReveal} className="pf-reveal">
            <Eyebrow>about</Eyebrow>
            <p className="pf-about-text">{PROFILE.intro}</p>
            <p className="pf-about-text">
              I learn by building. Most of my side projects start as a problem I want to feel
              firsthand, then turn into a small, shipped product I can point to.
            </p>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="pf-section">
          <Eyebrow>experience</Eyebrow>
          <div className="pf-exp">
            {EXPERIENCE.map((job) => (
              <article key={job.company} ref={addReveal} className="pf-exp-row pf-reveal">
                <div className="pf-exp-period">{job.period}</div>
                <div className="pf-exp-body">
                  <div className="pf-exp-head">
                    <h3 className="pf-exp-company">{job.company}</h3>
                    <span className="pf-exp-meta">{job.meta}</span>
                  </div>
                  <p className="pf-exp-role">{job.role}</p>
                  <p className="pf-exp-summary">{job.summary}</p>
                  <ul className="pf-tags">
                    {job.stack.map((s) => (
                      <li key={s} className="pf-tag">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="pf-section">
          <Eyebrow>selected work</Eyebrow>
          <div className="pf-grid">
            {PROJECTS.map((p) => (
              <a
                key={p.name}
                ref={addReveal}
                className="pf-card pf-reveal"
                href={p.url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="pf-card-top">
                  <span className="pf-card-name">{p.name}</span>
                  <ArrowUpRight size={18} strokeWidth={2} className="pf-card-arrow" />
                </div>
                <p className="pf-card-blurb">{p.blurb}</p>
                <ul className="pf-tags">
                  {p.tags.map((t) => (
                    <li key={t} className="pf-tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="pf-section">
          <Eyebrow>skills</Eyebrow>
          <div className="pf-skills">
            {SKILLS.map((s) => (
              <div key={s.group} ref={addReveal} className="pf-skill-col pf-reveal">
                <h3 className="pf-skill-group">{s.group}</h3>
                <ul className="pf-tags">
                  {s.items.map((i) => (
                    <li key={i} className="pf-tag">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="pf-section pf-contact">
          <Eyebrow>contact</Eyebrow>
          <h2 className="pf-contact-title">Let's build something.</h2>
          <p className="pf-contact-sub">
            I'm open to senior and staff engineering roles. The fastest way to reach me is email.
          </p>
          <div className="pf-hero-actions">
            <a className="pf-btn pf-btn-primary" href={`mailto:${PROFILE.email}`}>
              <Mail size={16} strokeWidth={2} /> {PROFILE.email}
            </a>
            <a className="pf-btn" href={PROFILE.github} target="_blank" rel="noreferrer">
              <Github size={16} strokeWidth={2} /> GitHub
            </a>
            <a className="pf-btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} strokeWidth={2} /> LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer className="pf-footer">
        <span>
          © {new Date().getFullYear()} {PROFILE.name}
        </span>
        <span className="pf-footer-mono">built with React · deployed on Vercel</span>
      </footer>
    </div>
  );
}

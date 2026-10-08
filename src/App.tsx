import { useCallback, useRef, useState } from "react";
import type { Project } from "./data/projects";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { FeaturedWork } from "./components/FeaturedWork";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { ProjectIndex } from "./components/ProjectIndex";
import { ProjectWindow } from "./components/ProjectWindow";
import { Skills } from "./components/Skills";
import "./portfolio.css";

export default function App() {
  const [open, setOpen] = useState<{ project: Project; origin: DOMRect } | null>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const onOpen = useCallback((project: Project, el: HTMLElement) => {
    trigger.current = el;
    setOpen({ project, origin: el.getBoundingClientRect() });
  }, []);

  const onClose = useCallback(() => {
    setOpen(null);
    trigger.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="page">
      <Nav />
      <main id="top" className="main">
        <Hero onOpen={onOpen} />
        <FeaturedWork onOpen={onOpen} />
        <ProjectIndex onOpen={onOpen} />
        <div className="split">
          <Experience />
          <Skills />
        </div>
        <Contact />
      </main>
      <Footer />
      {open && <ProjectWindow project={open.project} origin={open.origin} onClose={onClose} />}
    </div>
  );
}

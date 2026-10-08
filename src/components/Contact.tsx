import { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";
import { WindowBar } from "./WindowBar";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable; the mailto link still works */
    }
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-h">
      <div className="win win--contact">
        <WindowBar title="new-message" />
        <div className="contact__body">
          <h2 id="contact-h">{profile.contactHeading}</h2>
          <p>{profile.contactNote}</p>
          <div className="contact__actions">
            <a className="btn-primary btn-primary--xl" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <button type="button" className="btn-chip btn-chip--xl" onClick={copy} aria-live="polite">
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
          <div className="contact__links">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}

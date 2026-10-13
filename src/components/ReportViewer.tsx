import { useEffect, useRef, useState } from "react";

export interface Report {
  label: string;
  pages: { src: string; caption: string }[]; // a hand-picked selection, not the whole report
}

const src = (r: Report, i: number) => r.pages[i].src;

/**
 * View-only sample report: one page image at a time, no PDF behind it.
 * Sits inside the project window so its focus trap still applies; Esc closes the viewer, not the window.
 */
export function ReportViewer({ report, onClose }: { report: Report; onClose: () => void }) {
  const [at, setAt] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const go = (to: number) => setAt(Math.max(0, Math.min(report.pages.length - 1, to)));
  const goRef = useRef(go);
  goRef.current = go;
  const atRef = useRef(at);
  atRef.current = at;

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    // Capture phase so the window's own Esc and the gallery's arrows don't also fire.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goRef.current(atRef.current + 1);
      else if (e.key === "ArrowLeft") goRef.current(atRef.current - 1);
      else return;
      e.preventDefault();
      e.stopImmediatePropagation();
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  const touch = useRef<number | null>(null);

  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-label={report.label}>
      <div className="viewer__bar">
        <span className="win-bar__title">{report.label}</span>
        <span className="mono-label" aria-live="polite">
          {at + 1} / {report.pages.length}
        </span>
        <button ref={closeRef} type="button" className="btn-close" onClick={onClose}>
          Close <span>Esc</span>
        </button>
      </div>
      <div
        className="viewer__stage"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const s = touch.current;
          touch.current = null;
          if (s === null) return;
          const dx = e.changedTouches[0].clientX - s;
          if (Math.abs(dx) > 40) go(at + (dx < 0 ? 1 : -1));
        }}
      >
        <img
          key={at}
          src={src(report, at)}
          alt={report.pages[at].caption}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        {at + 1 < report.pages.length && <link rel="prefetch" href={src(report, at + 1)} />}
      </div>
      <p className="viewer__caption">{report.pages[at].caption}</p>
      <div className="viewer__nav">
        <button type="button" className="btn-chip" onClick={() => go(at - 1)} disabled={at === 0}>
          ‹ Prev
        </button>
        <button type="button" className="btn-chip" onClick={() => go(at + 1)} disabled={at === report.pages.length - 1}>
          Next ›
        </button>
      </div>
    </div>
  );
}

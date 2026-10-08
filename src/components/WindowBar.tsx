import type { ReactNode } from "react";

export function WindowBar({ title }: { title: ReactNode }) {
  return (
    <div className="win-bar">
      <span className="dots" aria-hidden="true" />
      <span className="win-bar__title">{title}</span>
    </div>
  );
}

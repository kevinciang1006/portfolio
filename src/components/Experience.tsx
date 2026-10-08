import { experience } from "../data/profile";
import { WindowBar } from "./WindowBar";

export function Experience() {
  return (
    <section id="experience" className="win split__exp" aria-labelledby="exp-h">
      <WindowBar title="experience.log" />
      <div className="win__body">
        <h2 id="exp-h">Experience</h2>
        <ol className="timeline">
          {experience.map((e) => (
            <li key={e.org} className="timeline__item">
              <span className="timeline__rail" aria-hidden="true">
                <span className={`timeline__dot${e.current ? " is-current" : ""}`} />
                <span className="timeline__line" />
              </span>
              <div className="timeline__body">
                <div className="timeline__head">
                  <h3>{e.org}</h3>
                  <span className="mono-label">{e.when}</span>
                </div>
                <span className="timeline__role">{e.role}</span>
                <p>{e.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

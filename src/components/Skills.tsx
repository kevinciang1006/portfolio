import { skills } from "../data/profile";
import { WindowBar } from "./WindowBar";

export function Skills() {
  return (
    <section className="win split__skills" aria-labelledby="skills-h">
      <WindowBar title="skills.json" />
      <div className="win__body skills">
        <h2 id="skills-h">Skills</h2>
        {skills.map((g) => (
          <div key={g.name} className="skills__group">
            <h3>{g.name}</h3>
            <ul>
              {g.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

import { projects } from "../data/projects";
import "./Work.css";

export function Work() {
  return (
    <section id="work" className="work swiss-grid">
      <h2 className="work__title">Projects</h2>

      <ul className="work__list">
        {projects.map((project) => (
          <li key={project.id} className="work__item">
            <span className="work__index">({project.index})</span>
            <h3 className="work__name">{project.title}</h3>
            <p className="work__summary">{project.summary}</p>
            <div className="work__links">
              <a href={project.href}>Demo</a>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Code
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

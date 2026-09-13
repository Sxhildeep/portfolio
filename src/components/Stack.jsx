import { stacks } from "../data/stacks";
import "./Stack.css";

export function Stack() {
  return (
    <section id="stack" className="stack swiss-grid">
      <h2 className="stack__title">Stack</h2>
      <p className="stack__description">
        Tools I reach for when building browser products, realtime systems, and
        interfaces that stay out of the way.
      </p>

      <ul className="stack__list">
        {stacks.map((group) => (
          <li key={group.label} className="stack__item">
            <span className="stack__label">{group.label}</span>
            <span className="stack__items">{group.items}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

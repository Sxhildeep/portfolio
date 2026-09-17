import "./About.css";

export function About() {
  return (
    <section id="about" className="about swiss-grid">
      <h2 className="about__title">About Me</h2>
      <div className="about__description-container">
        <p className="about__description">
          Always being curious and wanting to build new things, I use code as a medium to create and explore my ideas and imagination.
        </p>
        <p className="about__description">
          Creating Web Apps that not only look good but are also scalable and efficient.
        </p>
      </div>
    </section>
  );
}

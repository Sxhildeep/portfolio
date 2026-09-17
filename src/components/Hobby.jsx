import "./Hobby.css";
import { hobbyImages } from "../data/hobby";

export function Hobby() {
  return (
    <section id="hobby" className="hobby swiss-grid">
      <p className="hobby__word hobby__word--1">And</p>
      <p className="hobby__word hobby__word--2">I take </p>
      <p className="hobby__word hobby__word--3">A bit of</p>
   
      <p className="hobby__word hobby__word--5">Photos</p>

      {/* Same 12-col + gutter math as overlay — not nested .swiss-grid */}
      <div className="hobby__gallery">
        {hobbyImages.map((image) => (
          <figure
            key={image.src}
            className="hobby__shot"
            style={{
              gridColumn: `${image.col} / span ${image.span}`,
              gridRow: image.row,
              transform: image.rotate
                ? `rotate(${image.rotate}deg)`
                : undefined,
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              style={{
                width: image.width ?? "100%",
                height: "auto",
              }}
            />
          </figure>
        ))}

        <p className="hobby__gallery-caption">Camera</p>
        <p className="hobby__gallery-caption--camera">Fujifilm X-T50</p>
      </div>
    </section>
  );
}

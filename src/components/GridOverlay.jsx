import "./GridOverlay.css";

const COLUMNS = Array.from({ length: 12 }, (_, i) => i);

export function GridOverlay({ visible }) {
  if (!visible) return null;

  return (
    <div className="grid-overlay" aria-hidden="true">
      {COLUMNS.map((column) => (
        <span key={column} />
      ))}
    </div>
  );
}

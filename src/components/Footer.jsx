import "./Footer.css";

export function Footer({ onBackToTop }) {
  return (
    <footer className="footer swiss-grid">
      <a
        href="#top"
        className="footer__top"
        onClick={(e) => {
          e.preventDefault();
          onBackToTop?.();
        }}
      >
        Back to top
      </a>
    </footer>
  );
}

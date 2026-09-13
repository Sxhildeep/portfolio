import { GridOverlay } from "./components/GridOverlay";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Stack } from "./components/Stack";
import { useGridOverlay } from "./hooks/useGridOverlay";
import { useRef, useEffect } from "react";
import { Work } from "./components/Work";
import { Hobby } from "./components/Hobby";
import { Footer } from "./components/Footer";
import { PageReveal } from "./components/PageReveal";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./App.css";

export default function App() {
  const { visible, toggle } = useGridOverlay();
  const lenis = useRef(null);

  useEffect(() => {
    lenis.current = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      smoothWheel: true,
    });
    return () => {
      lenis.current.destroy();
    };
  }, []);

  return (
    <>
      <PageReveal />
      <GridOverlay visible={visible} />

      <button
        type="button"
        className="grid-toggle"
        onClick={toggle}
        aria-pressed={visible}
        title="Toggle 12-column grid (G)"
      >
         {visible ? " GRID ON" : " PRESS G"}
      </button>

      <main id="top">
        <Hero />
        <About />
        <Stack />
        <Work />
        <Hobby />
      </main>
      <Footer onBackToTop={() => lenis.current?.scrollTo(0)} />
    </>
  );
}

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HERO_INTRO_DELAY } from "../lib/revealTiming";
import { useTheme } from "../hooks/useTheme";
import "./Hero.css";
import portrait from "../img/me.jpeg";

function useClock() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function formatTime(date) {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function fitWordmark(el) {
  if (!el) return;

  const available = el.clientWidth;
  if (available <= 0) return;

  // Block width:100% makes scrollWidth === clientWidth when text is still
  // too small, so shrink-wrap temporarily to measure real glyph width.
  const prevWidth = el.style.width;
  el.style.width = "max-content";
  el.style.fontSize = "100px";
  const measured = el.getBoundingClientRect().width;
  el.style.width = prevWidth;

  if (measured <= 0) return;

  let next = (100 * available) / measured;
  el.style.fontSize = `${next}px`;

  // Correct leftover overflow from letter-spacing / subpixel rounding.
  if (el.scrollWidth > available + 0.5) {
    next *= available / el.scrollWidth;
    el.style.fontSize = `${next}px`;
  }
}

export function Hero() {
  const time = useClock();
  const { dark, toggle: toggleTheme } = useTheme();
  const heroRef = useRef(null);
  const wordmarkRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const wordmark = wordmarkRef.current;
    if (!hero || !wordmark) return;

    let lastWidth = -1;
    const fit = () => {
      const width = wordmark.clientWidth;
      if (Math.abs(width - lastWidth) < 0.5 && wordmark.style.fontSize) return;
      lastWidth = width;
      fitWordmark(wordmark);
    };

    const ro = new ResizeObserver((entries) => {
      const nextWidth = entries[0]?.contentRect.width ?? 0;
      if (Math.abs(nextWidth - lastWidth) < 0.5) return;
      lastWidth = -1;
      fit();
    });
    ro.observe(hero);

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      lastWidth = -1;
      fit();
    });

    fit();

    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = root.querySelectorAll("[data-hero-intro]");

    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { autoAlpha: 0, y: 28 });

      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.07,
        ease: "power2.out",
        delay: HERO_INTRO_DELAY,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero swiss-grid">
      <p className="hero__clock" data-hero-intro aria-hidden="true">
        {time}
      </p>

      <nav className="hero__nav" aria-label="Primary">
        <a
          href="https://github.com/Sxhildeep"
          className="hero__nav-link hero__nav-link--about"
          data-hero-intro
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="#work"
          className="hero__nav-link hero__nav-link--work"
          data-hero-intro
        >
          Work
        </a>
        <a
          href="https://www.linkedin.com/in/sahiil/"
          className="hero__nav-link hero__nav-link--info"
          data-hero-intro
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href={`${import.meta.env.BASE_URL}Sahil_Singh_Resume.pdf`}
          className="hero__nav-link hero__nav-link--contact"
          data-hero-intro
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
        <button
          type="button"
          className="hero__nav-link hero__nav-link--theme"
          data-hero-intro
          onClick={toggleTheme}
          aria-pressed={dark}
        >
          {dark ? "Light" : "Dark"}
        </button>
      </nav>

      <img
        src={portrait}
        alt="Sahil Singh"
        className="hero__portrait"
        data-hero-intro
      />

      <p className="hero__copy" data-hero-intro>
        Heyo, I&apos;m <span className="hero__copy-name">Sahil</span>. A Full-Stack Engineer, creating nice looking UIs and smooth and scalable backend systems.
      </p>
      <p className="hero__location" data-hero-intro>
        Based in Adelaide, South Australia.
      </p>

      <h1 ref={wordmarkRef} className="hero__wordmark" data-hero-intro>
        sahil Singh<span className="hero__wordmark-glitch">.</span>
      </h1>
    </section>
  );
}

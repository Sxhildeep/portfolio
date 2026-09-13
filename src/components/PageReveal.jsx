import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  CURTAIN_DELAY,
  CURTAIN_DURATION,
} from "../lib/revealTiming";
import "./PageReveal.css";

export function PageReveal() {
  const curtainRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(true);
      return;
    }

    document.documentElement.classList.add("is-revealing");

    const tween = gsap.to(curtain, {
      yPercent: -100,
      duration: CURTAIN_DURATION,
      ease: "power3.inOut",
      delay: CURTAIN_DELAY,
      onComplete: () => {
        document.documentElement.classList.remove("is-revealing");
        setDone(true);
      },
    });

    return () => {
      tween.kill();
      document.documentElement.classList.remove("is-revealing");
    };
  }, []);

  if (done) return null;

  return (
    <div ref={curtainRef} className="page-reveal" aria-hidden="true" />
  );
}

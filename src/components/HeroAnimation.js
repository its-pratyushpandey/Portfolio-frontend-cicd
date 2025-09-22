import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useHeroGsapAnimation() {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current.querySelector(".hero-title"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        containerRef.current.querySelector(".hero-subtitle"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
    return () => tl.kill();
  }, []);
  return containerRef;
}

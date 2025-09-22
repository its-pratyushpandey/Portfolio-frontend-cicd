import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { github } from "../assets";

const heroTitles = [
  "Full Stack Developer",
  "3D Web Specialist",
  "UI/UX Enthusiast",
  "Open Source Contributor",
];

const Hero = () => {
  const heroRef = useRef(null);
  const ctaRef = useRef(null);
  const subtitleRef = useRef(null);
  const [currentTitle, setCurrentTitle] = useState(0);

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.2 }
      );
      gsap.fromTo(
        ".hero-desc",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power4.out" }
      );
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, delay: 1, ease: "back.out(1.7)" }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Animated subtitle cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % heroTitles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-[#050816] overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl w-full px-6 flex flex-col items-center text-center">
        <motion.h1
          className="hero-title text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 tracking-tight"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Hi, I'm <span className="text-[#915EFF]">Pratyush Kumar Pandey</span>
        </motion.h1>
        <motion.div
          className="hero-desc text-xl md:text-2xl font-medium text-[#bcbcbc] min-h-[2.5rem] flex items-center justify-center mb-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        >
          <motion.span
            key={currentTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {heroTitles[currentTitle]}
          </motion.span>
        </motion.div>
        <motion.p
          ref={subtitleRef}
          className="text-[#bcbcbc] text-base md:text-lg max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.8, ease: "easeOut" }}
        >
          I build immersive, interactive, and performant web experiences with modern technologies and a passion for design.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1, ease: "easeOut" }}
        >
          <a
            href="https://github.com/its-pratyushpandey"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#181a23] text-[#915EFF] font-semibold shadow hover:bg-[#23243a] hover:text-white transition-colors duration-300 group"
            aria-label="GitHub"
          >
            <img src={github} alt="GitHub" className="w-5 h-5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/pratyush-pandey1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#181a23] text-[#0A66C2] font-semibold shadow hover:bg-[#23243a] hover:text-white transition-colors duration-300 group"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a
            href="/presume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#181a23] text-[#16a34a] font-semibold shadow hover:bg-[#23243a] hover:text-white transition-colors duration-300 group"
            aria-label="Resume"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-7V3.5L18.5 9H13z"/></svg>
            <span className="hidden sm:inline">Resume</span>
          </a>
        </motion.div>
        <motion.a
          ref={ctaRef}
          href="#contact"
          className="hero-cta inline-block px-10 py-3 rounded-lg bg-gradient-to-r from-[#915EFF] to-[#5e3cff] text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 1.2, ease: "backOut" }}
        >
          Let's Connect
        </motion.a>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-10 w-full flex justify-center z-20">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-[#915EFF] flex justify-center items-start p-2 bg-[#050816]/80 shadow-lg">
            <motion.span
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
              className="block w-3 h-3 rounded-full bg-[#915EFF] mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import ApiService from "../services/api";

// Import all skill icons
import javascriptIcon from "../assets/tech/javascript-icon.svg";
import javaIcon from "../assets/tech/java-icon.svg";
import cppIcon from "../assets/tech/cpp-icon.svg";
import pythonIcon from "../assets/tech/python.svg";
import typescriptIcon from "../assets/tech/typescript-icon.svg";
import reactIcon from "../assets/tech/react-icon.svg";
import nodejsIcon from "../assets/tech/nodejs-icon.svg";
import postgresIcon from "../assets/tech/postgresql-icon.svg";
import mongodbIcon from "../assets/tech/mongodb-icon.svg";
import mysqlIcon from "../assets/tech/mysql-icon.svg";
import awsIcon from "../assets/tech/aws-icon.svg";
import dockerIcon from "../assets/tech/docker-icon.svg";
import gitIcon from "../assets/tech/git-icon.svg";
import githubIcon from "../assets/tech/github.svg";
import vsCodeIcon from "../assets/tech/vscode.svg";
import postmanIcon from "../assets/tech/postman.svg";
import figmaIcon from "../assets/tech/figma-icon.svg";
import redisIcon from "../assets/tech/redis.svg";
import nextjsIcon from "../assets/tech/nextjs.svg";
import viteIcon from "../assets/tech/vite.svg";
import springBootIcon from "../assets/tech/spring-boot.svg";
import threejsIcon from "../assets/tech/threejs.svg";

gsap.registerPlugin(ScrollTrigger);

// Comprehensive icon mapping with colors and categories
const iconMapping = {
  // Frontend Technologies
  "HTML 5": { icon: null, color: "#E34C26" },
  "CSS 3": { icon: null, color: "#1572B6" },
  "JavaScript": { icon: javascriptIcon, color: "#F7DF1E" },
  "TypeScript": { icon: typescriptIcon, color: "#3178C6" },
  "React JS": { icon: reactIcon, color: "#61DAFB" },
  "Next.js": { icon: nextjsIcon, color: "#000000" },
  "Redux Toolkit": { icon: null, color: "#764ABC" },
  "Tailwind CSS": { icon: null, color: "#06B6D4" },
  "Three JS": { icon: threejsIcon, color: "#000000" },
  "Vite": { icon: viteIcon, color: "#646CFF" },
  
  // Backend Technologies
  "Java": { icon: javaIcon, color: "#ED8B00" },
  "Spring Boot": { icon: springBootIcon, color: "#6DB33F" },
  "Python": { icon: pythonIcon, color: "#3776AB" },
  "Node JS": { icon: nodejsIcon, color: "#339933" },
  "C++": { icon: cppIcon, color: "#00599C" },
  
  // Databases
  "MySQL": { icon: mysqlIcon, color: "#4479A1" },
  "MongoDB": { icon: mongodbIcon, color: "#47A248" },
  "Redis": { icon: redisIcon, color: "#DC382D" },
  "PostgreSQL": { icon: postgresIcon, color: "#4169E1" },
  
  // Cloud & DevOps
  "AWS": { icon: awsIcon, color: "#232F3E" },
  "Docker": { icon: dockerIcon, color: "#2496ED" },
  
  // Development Tools
  "Git": { icon: gitIcon, color: "#F05032" },
  "GitHub": { icon: githubIcon, color: "#181717" },
  "VS Code": { icon: vsCodeIcon, color: "#007ACC" },
  "Postman": { icon: postmanIcon, color: "#FF6C37" },
  "Figma": { icon: figmaIcon, color: "#F24E1E" },
  
  // Legacy mappings for compatibility
  "HTML": { icon: null, color: "#E34C26" },
  "CSS": { icon: null, color: "#1572B6" },
  "React": { icon: reactIcon, color: "#61DAFB" },
  "Bootstrap": { icon: null, color: "#7952B3" },
  "Node.js": { icon: nodejsIcon, color: "#339933" },
  "Express.js": { icon: null, color: "#000000" },
  "REST APIs": { icon: null, color: "#FF6B35" },
  "GraphQL": { icon: null, color: "#E10098" },
  "PHP": { icon: null, color: "#777BB4" },
  "Firebase": { icon: null, color: "#FFCA28" },
  "CI/CD": { icon: null, color: "#326CE5" },
  "Webpack": { icon: null, color: "#8DD6F9" },
  "NPM/Yarn": { icon: null, color: "#CB3837" },
  "Vue.js": { icon: null, color: "#4FC08D" },
  "Angular": { icon: null, color: "#DD0031" },
  "Django": { icon: null, color: "#092E20" },
  "Flask": { icon: null, color: "#000000" },
  "Laravel": { icon: null, color: "#FF2D20" },
  "Redux": { icon: null, color: "#764ABC" },
  "Sass": { icon: null, color: "#CC6699" }
};

// Enhanced categories for better organization
const categoryMapping = {
  "Programming Languages": ["JavaScript", "TypeScript", "Java", "C++", "Python", "PHP", "C", "C#"],
  "Frontend Development": ["HTML 5", "CSS 3", "React JS", "Next.js", "Redux Toolkit", "Tailwind CSS", "Three JS", "Vite", "HTML", "CSS", "React", "Bootstrap", "Vue.js", "Angular", "Redux", "Sass"],
  "Backend Development": ["Java", "Spring Boot", "Python", "Node JS", "C++", "Node.js", "Express.js", "REST APIs", "GraphQL", "Django", "Flask", "Laravel"],
  "Databases": ["MySQL", "MongoDB", "Redis", "PostgreSQL", "Firebase", "SQLite"],
  "Cloud & DevOps": ["AWS", "Docker", "Git", "GitHub", "CI/CD", "Jenkins", "Kubernetes"],
  "Development Tools": ["VS Code", "Postman", "Figma", "Vite", "Webpack", "NPM/Yarn", "ESLint", "Prettier"]
};

const TechSkill = ({ skill, index }) => {
  const skillRef = useRef(null);

  useEffect(() => {
    const element = skillRef.current;
    if (!element) return;

    // GSAP hover animations
    const hoverTl = gsap.timeline({ paused: true });
    
    hoverTl
      .to(element, {
        scale: 1.1,
        rotation: 5,
        backgroundColor: skill.color + "20",
        borderColor: skill.color,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(element.querySelector('.skill-icon'), {
        rotation: 360,
        scale: 1.2,
        duration: 0.5,
        ease: "power2.out"
      }, 0)
      .to(element.querySelector('.skill-text'), {
        color: skill.color,
        duration: 0.3,
        ease: "power2.out"
      }, 0);

    const handleMouseEnter = () => hoverTl.play();
    const handleMouseLeave = () => hoverTl.reverse();

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Entry animation with GSAP
    gsap.fromTo(element, {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotation: -10
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 0.6,
      delay: index * 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [skill.color, index]);

  return (
    <div
      ref={skillRef}
      className="bg-gray-800 px-4 py-3 rounded-xl text-center border border-gray-700 transition-all duration-300 cursor-pointer group relative overflow-hidden"
    >
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"
        style={{ backgroundColor: skill.color }}
      />
      
      <div className="relative z-10 flex flex-col items-center gap-2">
        {skill.icon ? (
          <img 
            src={skill.icon} 
            alt={skill.name}
            className="skill-icon w-6 h-6"
          />
        ) : (
          <div 
            className="skill-icon w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: skill.color }}
          >
            {skill.name.charAt(0)}
          </div>
        )}
        <span className="skill-text text-white text-sm font-medium transition-colors duration-300">
          {skill.name}
        </span>
      </div>
    </div>
  );
};

const TechCategory = ({ category, index }) => {
  const categoryRef = useRef(null);

  useEffect(() => {
    const element = categoryRef.current;
    if (!element) return;

    gsap.fromTo(element, {
      opacity: 0,
      y: 100,
      rotationY: -15
    }, {
      opacity: 1,
      y: 0,
      rotationY: 0,
      duration: 0.8,
      delay: index * 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    // Floating animation
    gsap.to(element, {
      y: -10,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: index * 0.5
    });
  }, [index]);

  return (
    <div
      ref={categoryRef}
      className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 relative group"
    >
      {/* Category glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <h3 className="text-white text-xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {category.title}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {category.skills.map((skill, skillIndex) => (
            <TechSkill key={skill.name} skill={skill} index={skillIndex} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Tech = () => {
  const containerRef = useRef(null);
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to organize technologies into categories
  const organizeTechnologies = (technologies) => {
    const organizedCategories = [];
    
    Object.keys(categoryMapping).forEach(categoryTitle => {
      const categoryTechs = [];
      const categoryTechNames = categoryMapping[categoryTitle];
      
      technologies.forEach(tech => {
        if (categoryTechNames.includes(tech.name)) {
          const techConfig = iconMapping[tech.name] || { icon: null, color: "#808080" };
          categoryTechs.push({
            name: tech.name,
            icon: techConfig.icon,
            color: techConfig.color
          });
        }
      });
      
      // Also check for technologies not in predefined categories
      if (categoryTitle === "Tools & Technologies") {
        technologies.forEach(tech => {
          const isInAnyCategory = Object.values(categoryMapping).some(cats => 
            cats.includes(tech.name)
          );
          
          if (!isInAnyCategory) {
            const techConfig = iconMapping[tech.name] || { icon: null, color: "#808080" };
            categoryTechs.push({
              name: tech.name,
              icon: techConfig.icon,
              color: techConfig.color
            });
          }
        });
      }
      
      if (categoryTechs.length > 0) {
        organizedCategories.push({
          title: categoryTitle,
          skills: categoryTechs
        });
      }
    });
    
    return organizedCategories;
  };

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        setLoading(true);
        const technologiesData = await ApiService.getTechnologies();
        const organizedData = organizeTechnologies(technologiesData);
        setSkillCategories(organizedData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch technologies:', err);
        setError('Failed to load technologies. Please try again later.');
        setSkillCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Main container entrance animation
    gsap.fromTo(container, {
      opacity: 0,
      scale: 0.9
    }, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }, [skillCategories]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] py-20 flex items-center justify-center">
        <div className="text-secondary text-xl">Loading technologies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050816] py-20 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050816] py-20">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          My technical expertise
        </p>
        <h2 className={`${styles.sectionHeadText} text-center bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent`}>
          Skills & Technologies.
        </h2>
      </motion.div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {skillCategories.map((category, index) => (
          <TechCategory 
            key={category.title} 
            category={category} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");

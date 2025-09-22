import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  nexthireLogo,
  codesyncLogo,
  videoStreamingLogo,
  healthnestLogo,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Fullstack Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Full Stack Developer – NextHire",
    company: "MERN Hackathon",
    date: "2025",
    location: "K L University",
    logo: nexthireLogo,
    technologies: ["MongoDB", "Express", "React", "Node.js", "JWT", "Redux", "OpenAI API", "Framer Motion"],
    points: [
      "Built NextHire, an AI-powered recruitment platform with secure authentication and role-based access",
      "Added job posting, tracking, real-time chat, and AI modules for resume parsing and job matching.",
      "Designed a responsive, high-performance UI with React, Redux, and Framer Motion.",
    ],
  },
  {
    title: "Frontend Developer – CodeSync (Collaborative Code Editor)",
    company: "PFSD Hackathon",
    date: "2024",
    location: "K L University",
    logo: codesyncLogo,
    technologies: ["Python", "Django", "WebSockets", "SQL"],
    points: [
      "Built a real-time collaborative code editor using Django and WebSockets.",
      "Implemented multi-user editing, group chat, copilot and a compiler in it.",
      "Gained practical experience in software development and teamwork.",
    ],
  },
  {
    title: "Full Stack Developer – Video Streaming Platform",
    company: "FSAD Hackathon",
    date: "2024",
    location: "K L University",
    logo: videoStreamingLogo,
    technologies: ["Java", "Spring Boot", "MySQL", "REST API"],
    points: [
      "Developed a video streaming app with Spring Boot and MySQL.",
      "Led team coordination and implemented authentication features.",
      "Optimized database queries for performance.",
    ],
  },
  {
    title: "Web Developer – HealthNest",
    company: "Smart India Hackathon",
    date: "2023",
    location: "Vaddeswaram, Andhra Pradesh",
    logo: healthnestLogo,
    technologies: ["HTML", "CSS", "Javascript", "C", "Data Structures", "Algorithms"],
    points: [
      "Gained practical experience through hackathons and coding competitions.",
      "Built a solid foundation in software development and programming.",
      "Collaborated on coding projects and team assignments.",
    
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "NextHire",
    description:
      "Nexthire is an all-in-one job portal offering real-time chat, mock test preparation, and a suite of professional features to enhance both job searching and recruitment efficiency.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "socket.io",
        color: "yellow-text-gradient",
      },
    ],
    image: "/image.png", // from public folder
    source_code_link: "https://github.com/its-pratyushpandey/NextHire.git",
    live_link: "https://nexthireap.netlify.app/",
  },
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, projects };

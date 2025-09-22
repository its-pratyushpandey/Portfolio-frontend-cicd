import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import ApiService from "../services/api";

const ExperienceCard = ({ experience }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Preload the image to check if it exists
  useEffect(() => {
    if (experience.logo) {
      const img = new Image();
      const logoSrc = experience.logo.startsWith('http') ? experience.logo : `${window.location.origin}${experience.logo}`;
      
      img.onload = () => {
        console.log(`Preloaded successfully: ${logoSrc}`);
        setImageLoaded(true);
        setImageError(false);
      };
      
      img.onerror = () => {
        console.error(`Preload failed: ${logoSrc}`);
        setImageError(true);
        setImageLoaded(false);
      };
      
      img.src = logoSrc;
    }
  }, [experience.logo]);
  
  const handleImageError = (e) => {
    console.error(`Failed to load image: ${experience.logo}`);
    console.error(`Full image src: ${e.target.src}`);
    console.error(`Base URL: ${window.location.origin}`);
    setImageError(true);
  };

  const handleImageLoad = (e) => {
    console.log(`Successfully loaded image: ${experience.logo}`);
    setImageLoaded(true);
    setImageError(false);
  };

  // Construct the full image URL to ensure it's correct
  const logoSrc = experience.logo ? (
    experience.logo.startsWith('http') ? experience.logo : `${window.location.origin}${experience.logo}`
  ) : null;

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: "#915EFF", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      icon={
        logoSrc && imageLoaded && !imageError ? (
          <img 
            src={logoSrc}
            alt={`${experience.title} logo`} 
            className="w-full h-full object-contain rounded-full p-1"
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#915EFF] rounded-full">
            <span style={{fontWeight:'bold', fontSize: '18px', color: '#fff'}}>
              {experience.company ? experience.company.charAt(0).toUpperCase() : 
               experience.title ? experience.title.charAt(0).toUpperCase() : '💼'}
            </span>
          </div>
        )
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        {experience.company && (
          <p className='text-secondary text-[16px] font-semibold' style={{ margin: 0 }}>
            {experience.company}
          </p>
        )}
        {experience.location && (
          <p className='text-gray-400 text-[14px]' style={{ margin: 0 }}>
            {experience.location}
          </p>
        )}
        {experience.technologies && (
          <div className="flex flex-wrap gap-2 mt-2">
            {experience.technologies.map((tech, index) => (
              <span 
                key={index}
                className="bg-[#915EFF] text-white px-2 py-1 rounded text-[12px] font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const experiencesData = await ApiService.getExperiences();
        console.log('Fetched experiences data:', experiencesData);
        console.log('Experience logos:', experiencesData.map(exp => ({ title: exp.title, logo: exp.logo })));
        setExperiences(experiencesData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch experiences:', err);
        setError('Failed to load experiences. Please try again later.');
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <section className="w-full min-h-screen bg-[#050816] flex flex-col justify-center items-center py-16">
        <div className="text-secondary text-xl">Loading experiences...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full min-h-screen bg-[#050816] flex flex-col justify-center items-center py-16">
        <div className="text-red-400 text-xl">{error}</div>
      </section>
    );
  }
  return (
    <section className="w-full min-h-screen bg-[#050816] flex flex-col justify-center py-16 px-4 md:px-10 lg:px-24">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default SectionWrapper(Experience, "work");

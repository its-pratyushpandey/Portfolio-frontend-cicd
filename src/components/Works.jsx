import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import ApiService from "../services/api";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_link,
}) => {
  
  const handleCardClick = (e) => {
    console.log(`Card clicked for ${name}`);
    console.log(`Live link: ${live_link}`);
    if (live_link) {
      try {
        window.open(live_link, '_blank', 'noopener,noreferrer');
        console.log(`Successfully opened live link: ${live_link}`);
      } catch (error) {
        console.error(`Failed to open live link: ${error}`);
      }
    } else {
      console.log('No live link available');
    }
  };

  const handleGithubClick = (e) => {
    e.stopPropagation();
    console.log(`GitHub clicked for ${name}`);
    console.log(`Source code link: ${source_code_link}`);
    if (source_code_link) {
      try {
        window.open(source_code_link, '_blank', 'noopener,noreferrer');
        console.log(`Successfully opened GitHub link: ${source_code_link}`);
      } catch (error) {
        console.error(`Failed to open GitHub link: ${error}`);
      }
    } else {
      console.log('No source code link available');
    }
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      onClick={handleCardClick}
      onKeyDown={live_link ? (e) => { if (e.key === 'Enter' || e.key === ' ') { handleCardClick(e); } } : undefined}
      tabIndex={live_link ? 0 : -1}
      aria-label={live_link ? `Open ${name} live site` : undefined}
      className={live_link ? 'cursor-pointer focus:outline-none' : ''}
      style={live_link ? { outline: 'none' } : {}}
    >
      <Tilt
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        scale={1}
        transitionSpeed={450}
        className={
          'bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full transition-shadow duration-200 ' +
          (live_link ? 'hover:shadow-blue-400/40 focus:shadow-blue-400/60' : '')
        }
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />
          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={handleGithubClick}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
              style={{ zIndex: 2 }}
              aria-label={`Open ${name} source code`}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { handleGithubClick(e); } }}
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px] flex items-center gap-2'>
            {name}
            {live_link && (
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full cursor-pointer"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      console.log(`LIVE badge clicked for ${name}`);
                      console.log(`Live link: ${live_link}`);
                      try {
                        window.open(live_link, '_blank', 'noopener,noreferrer');
                        console.log(`Successfully opened live link from badge: ${live_link}`);
                      } catch (error) {
                        console.error(`Failed to open live link from badge: ${error}`);
                      }
                    }}
                    title={`Visit ${name} live site`}>
                LIVE
              </span>
            )}
          </h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>
        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await ApiService.getProjects();
        console.log('Fetched projects data:', projectsData);
        console.log('NextHire project links:', projectsData.find(p => p.name === 'NextHire'));
        setProjects(projectsData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Please try again later.');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-secondary text-xl">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");

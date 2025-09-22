import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, staggerContainer, zoomIn } from "../utils/motion";
import ApiService from "../services/api";
import { web, mobile, backend, creator } from "../assets";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt
    className='xs:w-[250px] w-full'
    tiltMaxAngleX={45}
    tiltMaxAngleY={45}
    scale={1}
    transitionSpeed={450}
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 rgba(145,94,255,0.25)" }}
      whileTap={{ scale: 0.97 }}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card transition-all duration-300'
    >
      <div
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <motion.img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain mb-2'
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.2, duration: 0.6, type: "spring" }}
        />
        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Icon mapping for services
  const iconMapping = {
    "Web Developer": web,
    "React Native Developer": mobile,
    "Backend Developer": backend,
    "Fullstack Developer": creator,
    "Frontend Developer": web,
    "Mobile Developer": mobile,
    "Full Stack Developer": creator
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const servicesData = await ApiService.getServices();
        
        // Map services with appropriate icons
        const servicesWithIcons = servicesData.map(service => ({
          ...service,
          icon: iconMapping[service.title] || web // Default to web icon
        }));
        
        setServices(servicesWithIcons);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch services:', err);
        setError('Failed to load services. Please try again later.');
        // Fallback to empty array or you could use static data as fallback
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-secondary text-xl">Loading services...</div>
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
      <motion.div variants={textVariant()} className="mb-2">
        <p className={styles.sectionSubText}>About Me</p>
        <motion.h2
          className={styles.sectionHeadText + " relative inline-block"}
          initial={{ backgroundSize: "0% 3px" }}
          animate={{ backgroundSize: "100% 3px" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          style={{
            backgroundImage: "linear-gradient(90deg, #915EFF 0%, #5e3cff 100%)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 100%",
            backgroundSize: "100% 3px"
          }}
        >
          Who I Am 
        </motion.h2>
      </motion.div>

      <div className="mt-8 flex flex-col md:flex-row items-center md:items-start gap-10 w-full">
        <motion.div
          className="flex-1"
          variants={fadeIn("left", "spring", 0.1, 1)}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <p className='text-secondary text-[17px] max-w-3xl leading-[30px]'>
            I am a third-year B.Tech student in Computer Science and Engineering at KL University, India, with a strong interest in full-stack and cross-platform development. I have hands-on experience in modern technologies including React, React Native, Next.js, Express.js, TypeScript, Django, and Spring Boot.<br /><br />
            I specialize in web and app development, supported by a strong foundation in data structures, algorithms, and system design, with a focus on building efficient and user-centric solutions.<br /><br />
            Outside of academics and technology, I pursue creative and recreational interests that contribute to a balanced lifestyle. I’m passionate about cricket and running, which help build discipline and focus, while music serves as a source of relaxation and inspiration in my day-to-day routine.
          </p>
        </motion.div>
        <motion.div
          className="flex-shrink-0 w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-full overflow-hidden shadow-xl border-4 border-[#050816] bg-[#181b2a]"
          variants={fadeIn("right", "spring", 0.2, 1)}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <img
            src="/profile.png"
            alt="Profile"
            className="w-full h-full object-cover object-top rounded-full"
            loading="lazy"
          />
        </motion.div>
      </div>

      <motion.div
        className='mt-20 flex flex-wrap gap-10'
        variants={staggerContainer(0.18, 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(About, "about");

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import ApiService from "../services/api";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full'
  >
    <p className='text-white font-black text-[48px]'>"</p>

    <div className='mt-1'>
      <p className='text-white tracking-wider text-[18px]'>{testimonial}</p>

      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className='text-white font-medium text-[16px]'>
            <span className='blue-text-gradient'>@</span> {name}
          </p>
          <p className='mt-1 text-secondary text-[12px]'>
            {designation} of {company}
          </p>
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className='w-10 h-10 rounded-full object-cover'
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const testimonialsData = await ApiService.getTestimonials();
        setTestimonials(testimonialsData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
        setError('Failed to load testimonials. Please try again later.');
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className={`mt-12 bg-black-100 rounded-[20px] p-12 flex items-center justify-center`}>
        <div className="text-secondary text-xl">Loading testimonials...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`mt-12 bg-black-100 rounded-[20px] p-12 flex items-center justify-center`}>
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className={`mt-12 bg-black-100 rounded-[20px] p-12 flex items-center justify-center`}>
        <div className="text-secondary text-xl">No testimonials available.</div>
      </div>
    );
  }

  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name || index} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");

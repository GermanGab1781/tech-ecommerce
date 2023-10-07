import { motion, useInView } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import ReactImageGallery from 'react-image-gallery';
import { useMediaQuery } from 'react-responsive'

const Home = () => {
  /* Mobile check */
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  /* Variants for animations */
  const variantsSlide = {
    view: { opacity: 1 },
    noView: { opacity: 0 }
  }
  const variantsLatest = {
    view: { y: 0, x: 0, scale: 1, opacity: 1 },
    noView: { y: -300, x: -300, scale: 0.5, opacity: 0 }
  }

  /* Refs for viewport animations */
  const ref = useRef(null);
  const isInView = useInView(ref);
  /* , { once: true } */
  const cuadrados = [1, 2, 3, 4, 5, 6];
  /* Slides */
  function FirstSlide() {
    return <motion.div initial="noView" animate="view" variants={variantsSlide} transition={{ duration: 2 }} className='bg-red-700 relative w-full h-[80vh] cursor-default grid grid-cols-2' >
      {/* col 1 */}
      <div className='relative flex border'>
        <motion.div initial={{ y: -500 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 1 }} className='w-[80%] h-[80%] border m-auto'>
          Image of someone smiling with them phone
        </motion.div>
      </div>
      {/* col 2 */}
      <div className='relative flex flex-col  gap-y-6 justify-center items-center border'>
        <motion.div initial={{ y: -500 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 1 }}>
          Featured Gadget
        </motion.div>
        <motion.div initial={{ y: -500, x: 500 }} animate={{ y: 0, x: 0 }} transition={{ duration: 1, delay: 1 }} className='w-1/2 h-1/2 border '>

        </motion.div>
        <motion.div initial={{ x: 500 }} animate={{ x: 0 }} transition={{ duration: 1, delay: 1 }} className='cursor-pointer'>
          READ MORE
        </motion.div>
      </div>
    </motion.div>
  }
  function SecondSlide() {
    return <motion.div initial="noView" animate="view" variants={variantsSlide} transition={{ duration: 2 }} className='bg-blue-700 relative w-full h-[80vh]' />
  }
  /* Array slides  */
  const slides = [
    { renderItem: FirstSlide },
    { renderItem: SecondSlide }
  ]
  return (
    <motion.div className='min-h-[100vh] py-16 grid gap-y-10 border'>
      {/* Slider */}
      <ReactImageGallery items={slides} showThumbnails={false} showFullscreenButton={false} showPlayButton={true} slideInterval={9000} autoPlay={false} additionalClass={''} />
      <a href='#latestUpload' className='border text-center'>Checkmore</a>

      {/* Latest products */}
      <div ref={ref} id='latestUpload' className='h-[80vh] grid grid-cols-2 pt-16'>
        {/* Col 1 */}
        <motion.div className='grid grid-rows-2 grid-cols-3 gap-6 border'>
          {cuadrados.map((number, index) => {
            return (
              <motion.div
                animate={isInView ? "view" : "noView"}
                variants={variantsLatest}
                transition={{ duration: 0.5, delay: index / 10 }}
                className='border m-2'
                key={index}
              >
                <span>{number}</span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Col 2 */}
        <motion.div className='flex border h-full w-full justify-center' >
          <motion.div animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1 }} className='relative h-[90%] w-[70%] border m-auto bg-red-900'>
            <button className='absolute right-10 bottom-10'>Look</button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;

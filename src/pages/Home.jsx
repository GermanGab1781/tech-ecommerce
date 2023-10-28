import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import ReactImageGallery from 'react-image-gallery';
import { useMediaQuery } from 'react-responsive'
import { collection, query, orderBy, limit, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Item from '../components/Catalog/Item';
import { NavLink } from 'react-router-dom';
const Home = () => {
  const [products, setProducts] = useState(undefined)
  const [latestPromo, setLatestPromo] = useState()

  useEffect(() => {
    const getAllDocs = async () => {
      const q = query(collection(db, "/products/ProductsInfo/All"), orderBy('timestamp', 'asc'), limit(6))
      const data = await getDocs(q)
      const dataLatest = await getDoc(doc(db, "homepage", "latest"))
      setLatestPromo(dataLatest.data())
      setProducts(data.docs)
    }
    getAllDocs()
  }, [])

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
        <motion.div initial={{ y: -500 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.2 }} className='w-[80%] h-[80%] border m-auto'>
          Image of someone smiling with them phone
        </motion.div>
      </div>
      {/* col 2 */}
      <div className='relative flex flex-col  gap-y-6 justify-center items-center border'>
        <motion.div initial={{ y: -500 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          Featured Gadget
        </motion.div>
        <motion.div initial={{ y: -500, x: 500 }} animate={{ y: 0, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className='w-1/2 h-1/2 border '>

        </motion.div>
        <motion.div initial={{ x: 500 }} animate={{ x: 0 }} transition={{ duration: 1, delay: 0.2 }} className='cursor-pointer'>
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
    <motion.div className='grid gap-y-10 border'>
      {/* Slider */}
      <ReactImageGallery items={slides} showThumbnails={false} showFullscreenButton={false} showPlayButton={true} slideInterval={9000} autoPlay={false} additionalClass={''} />
      <a href='#latestUpload' className='border text-center mb-20'>Checkmore</a>

      {/* Latest products */}
      <div ref={ref} id='latestUpload' className='min-h-[80vh] grid grid-cols-3 pt-16'>
        {/* Col 1 */}
        <motion.div className='grid grid-rows-2 grid-cols-3 col-span-2 border'>
          {products &&
            products.map((product, index) => {
              return (
                <motion.div
                  animate={isInView ? "view" : "noView"}
                  variants={variantsLatest}
                  transition={{ duration: 0.5, delay: index / 10 }}
                  className='h-fit w-fit'
                  key={index}
                >
                  <Item info={product.data()} />
                </motion.div>
              )
            })}
        </motion.div>

        {/* Col 2 */}
        {latestPromo &&
          <motion.div className='flex border group cursor-pointer col-span-1 h-full w-full justify-center' >
            <motion.div animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1 }} className='relative h-[90%] w-[90%] border m-auto bg-red-900'>
              <img className='h-full w-full' src={latestPromo.image.Url} />
              <NavLink to="catalog" className='absolute -bottom-9 bg-slate-400 p-10 group-hover:bottom-[10%] opacity-0 group-hover:opacity-100 left-1/2 transform -translate-x-1/2 transition-all duration-500'>
                {latestPromo.title}
              </NavLink>
            </motion.div>
          </motion.div>
        }
      </div>
    </motion.div>
  );
}

export default Home;

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import ReactImageGallery from 'react-image-gallery';
import { useMediaQuery } from 'react-responsive'
import { collection, query, orderBy, limit, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Item from '../components/Catalog/Item';
import { NavLink } from 'react-router-dom';
const Home = () => {
  const [products, setProducts] = useState(undefined);
  const [firstSlide, setFirstSlide] = useState(undefined);
  const [latestPromo, setLatestPromo] = useState(undefined);

  useEffect(() => {
    const getAllDocs = async () => {
      const dataProducts = await getDocs(query(collection(db, "/products/ProductsInfo/All"), orderBy('timestamp', 'asc')));
      const dataLatest = await getDoc(doc(db, "homepage", "latest"));
      const dataSlide = await getDoc(doc(db, "homepage", "carousel"));
      setProducts(dataProducts.docs.slice(0, 6));
      setLatestPromo(dataLatest.data());
      setFirstSlide({ featured: dataProducts.docs.find(item => item.data().id === dataSlide.data().first.idFeatured).data(), imgPromo: dataSlide.data().first.imgPromo });
    }
    getAllDocs();
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
  const refLatest = useRef(null);
  const isInView = useInView(refLatest);

  /* Slides */
  function FirstSlide() {
    return <motion.div className='bg-red-700 relative w-full h-[80vh] cursor-default grid grid-cols-2' >
      {/* col 1 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5 }} className='relative flex border h-[80vh]'>
        <img src={firstSlide.imgPromo.Url} className='w-[80%] h-[80%] border m-auto' />
      </motion.div>
      {/* col 2 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5 }} className='relative flex flex-col gap-y-6 justify-center items-center border h-[80vh]'>
        <div>
          Featured Gadget
        </div>
        <div >
          {firstSlide.featured.info.name}
        </div>
        <img className='h-[55%] w-[40%] border' src={firstSlide.featured.images[0].Url} alt={firstSlide.featured.info.name} />
        <div className='cursor-pointer'>
          READ MORE
        </div>
      </motion.div>
    </motion.div>
  }
  function SecondSlide() {
    return <motion.div initial="noView" animate="view" variants={variantsSlide} transition={{ duration: 2 }} className='bg-blue-700 relative w-full h-[80vh]' />
  }
  const slides = [
    { renderItem: FirstSlide },
    { renderItem: SecondSlide }
  ]
  return (
    <motion.div className='grid gap-y-10 border'>
      {(firstSlide && products && latestPromo)
        ? <>
          {/* Slider */}
          < ReactImageGallery items={slides} showThumbnails={false} showFullscreenButton={false} showPlayButton={false} slideInterval={9000} autoPlay={false} additionalClass={''} />
          <a href='#latestUpload' className='border text-center mb-20'>Checkmore</a>
          {/* Latest products */}
          <div ref={refLatest} id='latestUpload' className='min-h-[80vh] grid grid-cols-3 pt-16'>
            {/* Col 1 */}
            <motion.div className='grid grid-rows-2 grid-cols-3 col-span-2 border'>
              {products.map((product, index) => {
                return (
                  <motion.div

                    className='h-fit w-fit'
                    key={index}
                  >
                    <Item info={product.data()} />
                  </motion.div>
                )
              })}
            </motion.div>
            {/* Col 2 */}
            <motion.div className='flex border group cursor-pointer col-span-1 h-full w-full justify-center' >
              <motion.div className='relative h-[90%] w-[90%] border m-auto bg-red-900'>
                <img className='h-full w-full' src={latestPromo.image.Url} />
                <NavLink to="catalog" className='absolute -bottom-9 bg-slate-400 p-10 group-hover:bottom-[10%] opacity-0 group-hover:opacity-100 left-1/2 transform -translate-x-1/2 transition-all duration-500'>
                  {latestPromo.title}
                </NavLink>
              </motion.div>
            </motion.div>
          </div>
        </>
        : <motion.div>Loading</motion.div>
      }
    </motion.div>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactImageGallery from 'react-image-gallery';
/* import { useMediaQuery } from 'react-responsive' */
import { collection, query, orderBy, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import ItemHome from '../components/ItemHome';
import ItemPreviewHome from '../components/ItemPreviewHome';
const Home = () => {
  /* Products */
  const [products, setProducts] = useState(undefined);
  /* Carousel */
  const [carousel, setCarousel] = useState(undefined);
  /* Categories */
  const [categories, setCategories] = useState(undefined);
  const [categPreview, setCategPreview] = useState(undefined);
  /* Brands */
  const [brands, setBrands] = useState(undefined);
  const [brandsPreview, setBrandsPreview] = useState(undefined);

  useEffect(() => {
    window.scroll(0, 1)
    const initialCategPreview = {};
    const initialBrandsPreview = {};
    const getAllDocs = async () => {
      const dataCategs = await getDocs(collection(db, "/products/Categories/list"))
      const dataProducts = await getDocs(query(collection(db, "/products/ProductsInfo/All"), orderBy('timestamp', 'desc')));
      const dataCarousel = await getDoc(doc(db, "homepage", "carousel"));
      setCategories(dataCategs.docs)
      setProducts(dataProducts.docs.slice(0, 4));
      dataCategs.docs.forEach(categ => {
        initialCategPreview[categ.data().name] = []
      })
      dataProducts.docs.forEach(product => {
        if (initialCategPreview[product.data().info.category].length < 4) {
          initialCategPreview[product.data().info.category].push(product.data().images[0].Url)
        }
        if (!initialBrandsPreview[product.data().info.brand]) {
          initialBrandsPreview[product.data().info.brand] = [product.data().images[0].Url]
        } else if (initialBrandsPreview[product.data().info.brand].length < 4) {
          initialBrandsPreview[product.data().info.brand].push(product.data().images[0].Url)
        }
      })
      const initialBrands = new Set(dataProducts.docs.map(p => p.data().info.brand))
      setBrands(Array.from(initialBrands))
      setBrandsPreview(initialBrandsPreview);
      setCategPreview(initialCategPreview);
      setCarousel(
        Object.values(dataCarousel.data())
          .filter(imageObj => imageObj.Url !== "") // Filter out empty Url values
          .map(imageObj => ({
            original: imageObj.Url,
          }))
      );
      /* setCarousel(Object.values(dataCarousel.data()).map(imageObj => ({
        original: imageObj.Url,
      }))) */
    }
    getAllDocs();
  }, [])

  const isDataLoaded = carousel && products && categories && brands && categPreview && brandsPreview;

  /* Mobile check */
  /* const isMobile = useMediaQuery({ query: "(max-width: 800px)" }); */

  return (
    <div className='font-medium bg-slate-800'>
      {isDataLoaded ? (
        <motion.div className='relative min-h-screen bg-slate-800'>
          {/* Carousel */}
          <ReactImageGallery showBullets={true} items={carousel} renderItem={item =>
            <div className="h-[75vh] overflow-hidden">
              <img className="w-full h-full object-fit" src={item.original} alt="Promo" />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-800 via-transparent to-transparent"></div>
            </div>
          } showThumbnails={false} showFullscreenButton={false} showPlayButton={false} slideInterval={9000} autoPlay={false} additionalClass={'image-galleryHome'} />
          <motion.div className='bg-transparent relative mt-[5vh] flex flex-col'>
            {/* Latest products */}
            <div className='mb-5'>
              <h1 className=' m-auto text-4xl mb-2 text-center text-white p-2 bg-black border-2 border-black'>Latest</h1>
              <motion.div className='relative flex flex-wrap gap-1 md:w-full w-3/4 place-content-center m-auto'>
                {products &&
                  products.map((product, index) => {
                    return (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index / 5 }}
                        className='md:h-fit md:w-fit w-[45%] aspect-square'
                        key={index}
                      >
                        <ItemHome info={product.data()} />
                      </motion.div>
                    )
                  })}
              </motion.div>
            </div>
            {/* Categories */}
            <div className='pb-10 bg-slate-800'>
              <h1 className=' m-auto text-4xl mb-6 text-center text-white p-2 bg-black border-2 border-black'>Categories</h1>
              <motion.div className='relative md:w-auto m-auto w-3/4 flex md:flex-row flex-col gap-2 gap-y-2 flex-wrap place-content-center'>
                {categories.map((categ, index) => {
                  return (
                    <span key={index}>
                      {/* Needs at least 1 product */}
                      {categPreview[categ.data().name].length > 0 && <ItemPreviewHome type={"category"} name={categ.data().name} preview={categPreview[categ.data().name]} />}
                    </span>
                  )
                })
                }
              </motion.div>
            </div >
            {/* Brands */}
            <div className=' pb-10 border-b-2  border-orange-400 bg-slate-800'>
              <h1 className=' m-auto text-4xl mb-6 text-center text-white p-2 bg-black border-2 border-black'>Brands</h1>
              <motion.div className='relative flex gap-2 gap-y-2 flex-wrap place-content-center md:w-auto w-3/4 m-auto'>
                {brands.map((brand, index) => {
                  return (
                    <ItemPreviewHome key={index} type={"brand"} name={brand} preview={brandsPreview[brand]} />
                  )
                })
                }
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )
        /* Loading page */
        : (
          <div className='relative bg-transparent h-screen w-full text-4xl text-center animate-pulse'>
            <span className='absolute md:top-1/4 top-[10%] left-1/2 transform -translate-x-1/2 text-white md:w-auto w-[95%]'>Optimizing the digital aisles for your browsing pleasure...</span>
          </div>
        )}
    </div>
  );
}

export default Home;

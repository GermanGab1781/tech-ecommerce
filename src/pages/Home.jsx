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
    const initialCategPreview = {};
    const initialBrandsPreview = {};
    const getAllDocs = async () => {
      const dataCategs = await getDocs(collection(db, "/products/Categories/list"))
      const dataProducts = await getDocs(query(collection(db, "/products/ProductsInfo/All"), orderBy('timestamp', 'asc')));
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
      setCarousel(Object.values(dataCarousel.data()).map(imageObj => ({
        original: imageObj.Url,
      })))
    }
    getAllDocs();
  }, [])

  /* Mobile check */
  /* const isMobile = useMediaQuery({ query: "(max-width: 800px)" }); */

  return (
    <motion.div className='relative min-h-screen mb-60 bg-slate-100'>
      {/* Carousel */}
      {carousel
        ?
        <ReactImageGallery items={carousel} renderItem={item =>
          <div className="h-[75vh] overflow-hidden">
            <img className="w-full h-full object-fill" src={item.original} alt="Promo" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-100 via-transparent to-transparent"></div>
          </div>
        } showThumbnails={false} showFullscreenButton={false} showPlayButton={false} slideInterval={9000} autoPlay={false} additionalClass={'image-galleryHome'} />
        : <div className='relative bg-transparent w-full h-[65vh] text-4xl text-center animate-pulse border'>
          <span className='absolute top-1/4 left-1/2 transform -translate-x-1/2'>Loading</span>
        </div>
      }

      <motion.div className='bg-transparent relative top-[30vh]'>
        {/* Latest products */}
        <div>
          <h1 className='m-auto rounded-md w-fit text-4xl text-center p-2 bg-slate-200'>Latest</h1>
          <motion.div className='relative flex flex-wrap place-content-center '>
            {products &&
              products.map((product, index) => {
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index / 5 }}
                    className='h-fit w-fit'
                    key={index}
                  >
                    <ItemHome info={product.data()} />
                  </motion.div>
                )
              })}
          </motion.div>
        </div>
        {/* Categories */}
        <div>
          <h1 className='text-center text-4xl mb-2'>Categories</h1>
          <motion.div className='relative flex gap-2 flex-wrap place-content-center '>
            {(categories && categPreview) &&
              categories.map((categ, index) => {
                return (
                  <ItemPreviewHome key={index} type={"category"} name={categ.data().name} preview={categPreview[categ.data().name]} />
                )
              })
            }
          </motion.div>
        </div>
        {/* Brands */}
        <div className='bg-slate-100 pb-10'>
          <h1 className='text-center text-4xl mb-2'>Brands</h1>
          <motion.div className='relative flex gap-2 flex-wrap place-content-center '>
            {(brands && brandsPreview) &&
              brands.map((brand, index) => {
                return (
                  <ItemPreviewHome key={index} type={"brand"} name={brand} preview={brandsPreview[brand]} />
                )
              })
            }
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Home;

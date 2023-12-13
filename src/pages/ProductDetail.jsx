import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { db } from '../firebase';
import ReactImageGallery from 'react-image-gallery';
import { CartContext } from '../contexts/ShoppingCartContext';
import { useMediaQuery } from 'react-responsive'

const ProductDetail = () => {
  const params = useParams()
  const keyword = params.id
  const [product, setProduct] = useState(undefined)
  const [images, setImages] = useState([])
  const { addToCart } = useContext(CartContext)
  /* Mobile check */
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });


  function setImagesForCarousel(list) {
    let result = []
    list.forEach((img) => {
      result.push({ original: img.Url, thumbnail: img.Url, loading: "lazy", alt: "CarouselImage", originalClass: "h-full w-full bg-cover" })
    })
    return result
  }
  useEffect(() => { window.scroll(0, 1); }, [])

  useEffect(() => {
    const getProductDoc = async () => {
      const id = doc(db, "products/ProductsInfo/All", keyword)
      const data = await getDoc(id)
      setProduct(data.data())
      setImages(setImagesForCarousel(data.data().images))
    }
    getProductDoc()
  }, [])

  return (
    <div className='min-h-screen bg-black'>
      {product ? (
        <div className='md:grid md:grid-cols-2 flex flex-col md:min-h-screen   md:w-[95%] h-fit bg-black text-white md:mx-auto text-center md:place-content-center'>
          {/* Name */}
          <h1 className='md:col-start-2 md:text-center text-4xl p-5 font-semibold'>{product.info.name}</h1>
          {/* Carousel */}
          <span className='md:min-h-[50vh] md:max-h-screen mb-5'>
            <ReactImageGallery items={images} additionalClass={'bg-black'} thumbnailPosition={isMobile ? "bottom" : "left"} />
          </span>
          {/* Info */}
          <div className='flex flex-col md:col-start-2 md:border-t-0 border-t md:ml-4 mb-10 border-orange-400'>
            <span className='flex flex-col'>
              <span className=' text-2xl'>
                <span className='text-orange-400'>Brand:</span> {product.info.brand}<br />
                <span className='text-green-400'>${product.info.price}</span>
              </span>
              <span className=' text-xl'>Stock Left:5</span>
            </span>
            <span className=' flex flex-col px-4 text-lg border-y border-orange-400 py-1 my-1'>
              <span className='text-blue-400 text-3xl'>Description</span>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur non, vitae perspiciatis in tempora magni tempore, autem ad, nam harum officiis corporis soluta voluptatibus aut facere nihil quae ab voluptatum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, laboriosam provident obcaecati voluptatibus facilis impedit omnis. Accusamus, sapiente. Deserunt nulla dolore praesentium consectetur corporis consequatur doloribus modi vero quidem? Aliquid!
            </span>
            {/* Buttons */}
            <span onClick={() => addToCart(product)} className='border border-blue-400 select-none cursor-pointer bg-slate-800 hover:bg-blue-900 text-xl p-5 md:col-start-2 w-[60%] mx-auto mb-4 mt-10'>Add to Cart</span>
            <span onClick={() => addToCart(product)} className='border border-green-400 select-none cursor-pointer bg-slate-800 hover:bg-green-500 text-xl p-5 md:col-start-2 w-[60%] mx-auto'>Buy Now</span>
          </div>
          <div className='col-span-2 flex flex-col border-y border-orange-400'>
            <h1 className='text-3xl font-semibold pt-2'>Continue Exploring our Catalog</h1>
            <span className='p-10 flex md:flex-row flex-col place-items-center whitespace-nowrap md:gap-y-0 gap-y-2'>
              <NavLink className='border border-orange-400 select-none cursor-pointer bg-slate-800 hover:bg-blue-950 text-xl w-[60%] p-5 md:mr-5' to={`/catalog/brand/${product.info.brand}`}>More of {product.info.brand}</NavLink>
              <NavLink className='border border-orange-400 select-none cursor-pointer bg-slate-800 hover:bg-blue-950 text-xl w-[60%] p-5' to={`/catalog/category/${product.info.category}`}>More of {product.info.category}</NavLink>
            </span>
          </div>
        </div>)
        : (<div className='relative bg-transparent w-full h-screen text-4xl text-center animate-pulse'>
          <span className='absolute md:top-1/4 top-[15%] left-1/2 transform -translate-x-1/2 text-white md:w-auto w-[95%]'>Product details are on their way...</span>
        </div>)
      }
    </div>
  );
}

export default ProductDetail;

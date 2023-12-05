import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import ReactImageGallery from 'react-image-gallery';
import { CartContext } from '../contexts/ShoppingCartContext';

const ProductDetail = () => {
  const params = useParams()
  const keyword = params.id
  const [product, setProduct] = useState(undefined)
  const [images, setImages] = useState([])
  const { addToCart } = useContext(CartContext)

  function setImagesForCarousel(list) {
    let result = []
    list.forEach((img) => {
      result.push({ original: img.Url, thumbnail: img.Url, loading: "lazy", alt: "CarouselImage", originalClass: "border h-full max-h-[50vh] " })
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
    <div className='min-h-screen'>
      {product &&
        <div className='h-1/2 text-center flex flex-col'>
          <h1 className=''>{product.info.name}</h1>
          <ReactImageGallery items={images} additionalClass={''} />
          <div className='border flex flex-col'>
            <span>Price: ${product.info.price}</span>
            <span>Brand: {product.info.brand}</span>
          </div>
          <span onClick={() => addToCart(product)} className='border p-5 bg-red-200'>Add to Cart</span>
        </div>
      }
    </div>
  );
}

export default ProductDetail;

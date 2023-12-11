import React from 'react';
import { motion } from 'framer-motion';
import Item from './Item';


const View = ({ items, title, setCurrentPage, currentPage }) => {
  const Pagination = ({ itemsPerPage, data }) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
      <div>
        {/* Pagination */}
        {items.length > itemsPerPage &&
          <div className='flex flex-row border-2 border-b-0 border-orange-400 gap-x-3 place-content-center text-white'>
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
              <div className={(index + 1 === currentPage) ? "relative border bg-orange-400 h-12 aspect-square cursor-pointer select-none" : 'relative border bg-black h-12 aspect-square cursor-pointer select-none'} key={index} onClick={() => paginate(index + 1)}>
                <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>{index + 1}</span>
              </div>
            ))}
          </div>}
        {/* Content */}
        <div className='flex border-2 border-black border-t-orange-400 min-h-screen flex-wrap justify-center place-content-start gap-10 md:pt-o pt-5'>
          {currentItems.length > 0 ? currentItems.map((item, index) => {
            return (
              <Item key={index} info={item} />
            )
          })
            : <div className='text-4xl text-white text-center pt-16 animate-pulse'>No products in this category</div>
          }
        </div>
        {/* Pagination */}
        {items.length > itemsPerPage &&
          <div className='flex flex-row border-2 border-orange-400 gap-x-3 place-content-center text-white'>
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
              <div className={(index + 1 === currentPage) ? "relative border bg-orange-400 h-12 aspect-square cursor-pointer select-none" : 'relative border bg-black h-12 aspect-square cursor-pointer select-none'} key={index} onClick={() => paginate(index + 1)}>
                <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>{index + 1}</span>
              </div>
            ))}
          </div>}
      </div>
    );
  };

  return (
    <motion.div key={items} className=''>
      <motion.div key={title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className='h-[20%] text-5xl text-center text-white '>
        {title === undefined ? <span className=''>Our Products</span> : <span className=''>{title}</span>}
      </motion.div>
      <Pagination itemsPerPage={6} data={items} />
    </motion.div >
  );
}

export default View;

import React from 'react';

const ItemCategory = ({ name }) => {
  return (
    <div className='flex place-content-between w-1/2 border p-5'>
      <div>{name}</div>
      <div>
        <div>Editar</div>
        <div>Borrar</div>
      </div>
    </div>
  );
}

export default ItemCategory;

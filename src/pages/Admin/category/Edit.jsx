import { doc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';

const Edit = () => {
  const params = useParams()
  const keyword = params.id
  const thisDocRef = doc(db, "products/Categories/list", keyword)
  useEffect(() => {
    const getCategDoc = async () => {

    }
    getCategDoc()
  }, [])
  return (
    <div className='h-screen bg-red-900'>
      asdasd
    </div>
  );
}

export default Edit;

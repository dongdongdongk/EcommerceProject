import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'
import ProductDetails from '../components/Products/ProductDetails';
import { productData } from '../static/data';
import { useSelector } from 'react-redux';
import SuggestedProduct from '../components/Products/SuggestedProduct';

const ProductDetailsPage = () => {
    const {allProducts} = useSelector((state) => state.product);
    const {id} = useParams();
    const [data,setData] = useState(null);
    const productName = id.replace(/-/g," ");

    useEffect(() => {
        // const data = productData.find((i) => i.name === productName);
        const data = allProducts && allProducts.find((i) => i._id === productName);
        setData(data);
    }, [])

  return (
    <div>
        <Header />
        <ProductDetails data={data} />
         {
            data && <SuggestedProduct data={data} />
         }
        <Footer />
    </div>
  )
}

export default ProductDetailsPage
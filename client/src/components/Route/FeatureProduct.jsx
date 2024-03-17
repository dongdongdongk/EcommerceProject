import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import ProductCard from "./ProductCard";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.product);
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>특별 상품</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {/* {productData &&
            productData.map((i, index) => <ProductCard data={i} key={index} />)} */}
          {allProducts &&
            allProducts.slice(0, 15).map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;

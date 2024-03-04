import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from './ProductsCardList.module.css';

const ProductsCardList = ({ drugsList, onAddToCart }) => {

  return (
    <div className={styles.cont}>
      {drugsList?.map(item => <ProductCard key={item._id} product={item} onAddToCart={onAddToCart} />)}
    </div>
  );
}

export default React.memo(ProductsCardList);
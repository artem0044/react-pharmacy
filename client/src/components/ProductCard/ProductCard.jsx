import styles from './ProductCard.module.css';

const ProductCard = ({ product: { img, name, price, _id: productId }, onAddToCart }) => {
console.log(img)
  return (
    <div className={styles.cardCont}>
      <div className={styles.drugImg} style={{ background: `url(${img})` }}></div>
      <p className={styles.name}>{name}</p>
      <p>Price: {price}</p>
      <button className={styles.primaryBut} onClick={() => onAddToCart(productId)}>add to Cart</button>
    </div>
  );
}

export default ProductCard;
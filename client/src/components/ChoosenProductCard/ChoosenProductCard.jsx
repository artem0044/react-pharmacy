import styles from './ChoosenProductCard.module.css';

const ChoosenProductCard = ({ product, editCart }) => {
  return (
    <div className={styles.container}>
      <div className={styles.drugImg} style={{ background: `url(${product.img})` }}></div>
      <div className={styles.cardInfo}>
        <h1 className={styles.header}>{product.name}</h1>
        <h4 className={styles.price}>Price: {product.price}</h4>
        <input placeholder='count' value={product.count} className={styles.countInput} onChange={(e) => editCart(product, e.target.value)} type="number" />
        <button onClick={() => editCart(product, 0)} className={styles.delBut}>delete</button>
      </div>
    </div>
  );
}

export default ChoosenProductCard;
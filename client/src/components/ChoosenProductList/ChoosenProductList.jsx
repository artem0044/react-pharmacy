import ChoosenProductCard from "../ChoosenProductCard/ChoosenProductCard";
import styles from './ChoosenProductList.module.css';

const ChoosenProductList = ({ order, editCart }) => {
console.log(order.products);
  return (
    <div className={styles.ChoosenProductList}>
      <div className={styles.container}>
        {order.products.map((product) => <ChoosenProductCard editCart={editCart} key={product.productId} product={product} />)}
      </div>
      <div>
        {/* Total */}
      </div>
    </div>
  );
}

export default ChoosenProductList;
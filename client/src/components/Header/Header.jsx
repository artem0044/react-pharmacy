import styles from './Header.module.css';
import { Link } from 'react-router-dom';


const Header = ({ order }) => {
  return (
    <div className={styles.header}>
      <ul className={styles.list}>
        <li className={styles.listItems}>
          <Link className={styles.link} to="/">Shops</Link>
        </li>
        <li className={styles.listItems}>
          <Link className={styles.link} to="shopping cart" >Shopping Cart</Link>
        </li>
      </ul >
      <div className={styles.cardInfo}>
        <h4 className={styles.head}>Products count: {order?.products.length || 0}</h4>
        <h4 className={styles.head}>Total price: {order?.totalPrice || 0}</h4>
      </div>
    </div >
  );
}

export default Header;
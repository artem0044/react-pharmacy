import styles from './ShopNavigation.module.css';
import { useEffect, useState } from 'react';
import cn from 'classnames';

const ShopNavigation = ({ drugStores, selectedStore, setSelectedStore }) => {

  return (
    <div className={styles.shopListContainer}>
      <h1 className={styles.header}>Shops</h1>
      <ul className={styles.shopList}>
        {drugStores.map(({ _id: id, name }) => <li key={id} className={cn(styles.shopListItem, id === selectedStore && styles.shopListItemSelected)} onClick={() => setSelectedStore(id)} >{name}</li>)}
        {/* ADD STYLE TO shopListItem !!!! */}
      </ul>
    </div>
  );
}

export default ShopNavigation;


import ProductsCardList from "../ProductsCardList/ProductsCardList";
import ShopNavigation from "../ShopNavigation/ShopNavigation";
import Spinner from "../Spinner/Spinner";
import styles from './MainPage.module.css';
import { useState, useEffect, useCallback } from "react";

const ShopPage = ({ setOrder }) => {
  const [drugStores, setDrugStores] = useState([]);
  const [drugsList, setDrugList] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:3001/api/store')
      .then(res => res.json())
      .then(stores => {
        setDrugStores(stores);
        setSelectedStore(stores[0]?._id);
      })
      .catch(console.log)

    fetch('http://localhost:3001/api/order/draft')
      .then(res => res.json())
      .then(setOrder)
      .finally(() => setLoading(false));
  }, []);


  useEffect(() => {
    if (!selectedStore) return;
    setLoading(true);

    fetch(`http://localhost:3001/api/store/${selectedStore}`)
      .then(res => res.json())
      .then(([{ drugs }]) => setDrugList(drugs))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [selectedStore]);

  const onAddToCart = useCallback((productId) => {
    setLoading(true);

    fetch('http://localhost:3001/api/order/edit-cart', {
      method: "PATCH",
      body: JSON.stringify({
        storeId: selectedStore,
        productId,
        count: 1,
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(setOrder)
      .finally(() => setLoading(false));

  }, [selectedStore]);

  return (
    <div className={styles.ShopPage}>
      {loading ?
        <Spinner />
        :
        <>
          <ShopNavigation selectedStore={selectedStore} setSelectedStore={setSelectedStore} drugStores={drugStores} />
          <ProductsCardList drugsList={drugsList} onAddToCart={onAddToCart} />
        </>
      }
    </div>
  );
}

export default ShopPage;
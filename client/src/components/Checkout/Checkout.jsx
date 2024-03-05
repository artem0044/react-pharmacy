import ChoosenProductList from "../ChoosenProductList/ChoosenProductList";
import Spinner from "../Spinner/Spinner";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import styles from './Checkout.module.css';
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ order, setOrder }) => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const editCart = useCallback((product, count) => {
    setLoading(true);

    fetch('https://react-pharmacy-2.onrender.com/api/order/edit-cart', {
      method: "PATCH",
      body: JSON.stringify({
        storeId: product.store._id,
        productId: product.productId,
        count,
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(setOrder)
      .finally(() => setLoading(false))
  }, []);

  const onSubmit = (e) => {
    setLoading(true);

    fetch('https://react-pharmacy-2.onrender.com/api/order/place-order', {
      method: 'PUT',
      body: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json"
      }
    })
      .finally(() => setLoading(false));
  }


  useEffect(() => {
    setLoading(true)
    fetch('https://react-pharmacy-2.onrender.com/api/order/draft')
      .then(res => res.json())
      .then(setOrder)
      .finally(() => setLoading(false));
  }, []);

  // useEffect(() => {
  //   if (order && !order.products.length) {
  //     navigate('/', { replace: true });
  //   }

  // }, [order, navigate]);


  return (
    <form className={styles.shopCard} onSubmit={onSubmit}>
      {loading ?
        <Spinner />
        :
        <>
          <div className={styles.cardContainer}>
            <UserInfoCard userInfo={userInfo} setUserInfo={setUserInfo} />
            {order && <ChoosenProductList editCart={editCart} order={order} />}
          </div>
          <div className={styles.result}>
            <button className={styles.subBut}  type="submit">submit</button>
          </div>
        </>
      }
    </form>
  );
}

export default Checkout;
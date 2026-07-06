import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkout, Loaders, HorizontalCard } from "../../Components";
import { PriceContainer } from "./Components/Price Container/PriceContainer";
import { useAuth, useCart } from "../../Context";
import { fetchCartProducts, scrollToTop } from "../../Utils";
import styles from "./Cart.module.css";

const Cart = () => {
  const { authState } = useAuth();
  const [couponType, setCouponType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [checkout, setCheckout] = useState(false);

  const { cartState, cartDispatch } = useCart();

  useEffect(() => {
    fetchCartProducts(authState.token, cartDispatch, setIsLoading);
  }, []);

  useEffect(() => {
    scrollToTop();
  }, []);

  const deleteHandler = async (_id, setQtyChangeLoader, title) => {
    try {
      const response = await axios.delete(`/api/user/cart/${_id}`, {
        headers: {
          authorization: authState.token
        }
      });
      if (response.status === 200) {
        setCouponType("");
        title && toast.info(`Removed ${title} from cart`);
        cartDispatch({ type: "REMOVE_FROM_CART", payload: response.data.cart });
        setQtyChangeLoader && setQtyChangeLoader(false);
      } else {
        console.error("ERROR: ", response);
      }
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  return (
    <>
      {isLoading && <Loaders />}
      {checkout ? (
        <Checkout
          couponType={couponType}
          setCheckout={setCheckout}
          deleteHandler={deleteHandler}
        />
      ) : (
        <main className={styles.cartMain}>
          {cartState.cart.length > 0 && !isLoading ? (
            <>
              <div>
                <h3 className={styles.cartHeading}>My Cart</h3>
                <small>
                  {cartState.cart.length}{" "}
                  {cartState.cart.length > 1 ? "items" : "item"}
                </small>
              </div>
              <section className={styles.cartContainer}>
                <div>
                  {cartState.cart.map((card) => (
                    <HorizontalCard
                      {...card}
                      key={card._id}
                      setCouponType={setCouponType}
                      deleteHandler={deleteHandler}
                    />
                  ))}
                </div>

                <PriceContainer
                  couponType={couponType}
                  setCouponType={setCouponType}
                  setCheckout={setCheckout}
                />
              </section>
            </>
          ) : (
            <>
              {!isLoading && (
                <div className={styles.emptyCartContainer}>
                  <span className={styles.emptyMsgTitle}>
                    Looks like your cart is empty
                  </span>
                  <Link to="/products"> Browse Products</Link>
                </div>
              )}
            </>
          )}
        </main>
      )}
    </>
  );
};

export { Cart };

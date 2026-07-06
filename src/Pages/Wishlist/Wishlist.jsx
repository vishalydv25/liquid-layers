import React, { useState, useEffect } from "react";
import { Card, Loaders } from "../../Components";
import { useAuth, useWishlist } from "../../Context";
import { Link } from "react-router-dom";
import { fetchWishlist, scrollToTop } from "../../Utils";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { authState } = useAuth();

  const {
    wishlistState: { wishlist },
    wishlistDispatch
  } = useWishlist();

  useEffect(
    () => fetchWishlist(authState.token, wishlistDispatch, setIsLoading),
    []
  );

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      {isLoading && <Loaders />}
      <main className={styles.wlPg}>
        {wishlist.length > 0 && !isLoading ? (
          <>
            <h3 className={styles.wlHeading}>My Wishlist</h3>
            <small>
              {wishlist.length} {wishlist.length > 1 ? "items" : "item"}
            </small>
            <section className={styles.productList}>
              {wishlist.map((wishlistItem) => (
                <Card
                  key={wishlistItem._id}
                  {...wishlistItem}
                  products={wishlist}
                />
              ))}
            </section>
          </>
        ) : (
          <>
            {!isLoading && (
              <div className={styles.emptyCartContainer}>
                <span className={styles.emptyMsgTitle}>Hmm... So empty</span>
                <Link to="/products"> Browse Products</Link>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

export { Wishlist };

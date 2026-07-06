import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useCart, useWishlist } from "../../Context";
import {
  addToCartHandler,
  addToWishlistHandler,
  checkWishlistStatus,
  removeFromWishlistHandler
} from "../../Utils";
import styles from "./Card.module.css";

const Card = ({
  discount,
  badge,
  categoryName,
  image,
  price,
  rating,
  title,
  _id,
  products
}) => {
  const [cartBtnLoader, setCartBtnLoader] = useState(false);
  const [wishlistLoader, setWishlistLoader] = useState(false);

  const navigate = useNavigate();

  const { authState } = useAuth();

  const { cartState, cartDispatch } = useCart();

  const { wishlistState, wishlistDispatch } = useWishlist();

  const checkCartStatus = (_id) => {
    const itemInCart = cartState.cart.find((item) => item._id === _id);
    return itemInCart ? "Go to Cart" : "Add to Cart";
  };

  const cartBtnHandler = async (e, _id) => {
    e.stopPropagation();
    setCartBtnLoader(true);

    const product = products.find((product) => product._id === _id);
    if (authState.token) {
      const response = await addToCartHandler(product, authState.token);
      if (response.status === 201) {
        toast.success(`${product.title} added to cart`);
        cartDispatch({ type: "ADD_TO_CART", payload: response.data.cart });
        setCartBtnLoader(false);
      }
    } else {
      toast.warning("You are not logged in!");
      navigate("/login");
    }
  };

  const addToWishlist = async (e, _id) => {
    e.stopPropagation();
    setWishlistLoader(true);
    if (authState.token) {
      const product = products.find((product) => product._id === _id);
      if (!checkWishlistStatus(_id, wishlistState.wishlist)) {
        const response = await addToWishlistHandler(product, authState.token);
        if (response.status === 201) {
          toast.success(`${product.title} added to wishlist`);
          setWishlistLoader(false);
          wishlistDispatch({
            type: "ADD_TO_WISHLIST",
            payload: response.data.wishlist
          });
        }
      } else {
        const response = await removeFromWishlistHandler(_id, authState.token);
        if (response.status === 200) {
          toast.info(`${product.title} removed from wishlist`);
          setWishlistLoader(false);
          wishlistDispatch({
            type: "REMOVE_FROM_WISHLIST",
            payload: response.data.wishlist
          });
        }
      }
    } else {
      toast.warning("You are not logged in!");
      navigate("/login");
    }
  };

  return (
    <article
      className={`card product-card card-shadow ${styles.card}`}
      onClick={() => navigate(`/products/${_id}`)}
    >
      <img
        src={image}
        alt="card image 1"
        className={`card-img ${styles.cardImg}`}
      />
      <div className={`content ${styles.content}`}>
        <h4>{title}</h4>
        <span>{categoryName}</span>
        <button
          className="overlay-icon"
          onClick={(e) => addToWishlist(e, _id)}
          disabled={wishlistLoader}
        >
          <i
            className={`${
              checkWishlistStatus(_id, wishlistState.wishlist) ? "fas" : "far"
            } fa-heart `}
          ></i>
        </button>
        {badge && (
          <span className={`product-card-badge ${styles.productCardBadge}`}>
            <strong>{badge}</strong>
          </span>
        )}
        <div className={styles.rating}>Ratings: {rating}/5</div>
        <p>
          {discount ? (
            <strong>
              Rs. {(price - (discount / 100) * price).toFixed(0)}{" "}
            </strong>
          ) : (
            <strong>Rs. {price} </strong>
          )}

          <small>{discount ? <s>Rs. {price}</s> : ""}</small>
          {discount ? (
            <small className={styles.cardDiscount}> ({discount}% OFF)</small>
          ) : null}
        </p>
        {checkCartStatus(_id) === "Add to Cart" ? (
          <button
            disabled={badge === "Out of Stock" || cartBtnLoader}
            className={`action-link ${styles.actionBtn}`}
            title={badge === "Out of Stock" ? "Item is out of stock" : null}
            onClick={(e) => cartBtnHandler(e, _id)}
          >
            {cartBtnLoader ? (
              <span className={styles.loader}></span>
            ) : (
              "Add to Cart"
            )}
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/cart");
            }}
            className={`action-link ${styles.actionBtn} ${styles.navigate}`}
            disabled={cartBtnLoader}
          >
            Go to Cart
          </button>
        )}
      </div>
    </article>
  );
};

export { Card };

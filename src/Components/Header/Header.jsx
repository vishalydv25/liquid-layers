import { useState, useEffect, useRef } from "react";
import { useAuth, useCart, useWishlist } from "../../Context";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ products }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const timerRef = useRef();
  const { authState } = useAuth();
  const {
    cartState: { cart },
  } = useCart();

  const {
    wishlistState: { wishlist },
  } = useWishlist();

  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue) {
      clearTimeout(timerRef.current);
      if (searchValue !== 0) {
        setIsDebouncing(false);
        timerRef.current = setTimeout(() => {
          const searchedProducts = products.filter((product) =>
            product.title.toLowerCase().includes(searchValue.toLowerCase())
          );
          setSearchList(searchedProducts);
          setIsDebouncing(true);
        }, 300);
      }
    }
  }, [searchValue]);

  return (
    <header className={`header ${styles.header}`}>
      <div
        className={`${showMenu ? styles.backdrop : ""} ${styles.searchActive}`}
        onClick={() => setShowMenu(false)}
      ></div>
      <h2>
        <Link to="/">
          Liquid<span> Layers</span>
        </Link>
      </h2>
      <Link
        to="/products"
        style={{
          marginLeft: "1rem",
          border: "1px solid blue",
          borderRadius: "5px",
          padding: "5px",
        }}
      >
        Shop Now
      </Link>
      <div className={styles.searchContainer}>
        <input
          type="search"
          name="search"
          className={`header-search ${styles.search}`}
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          autoComplete="off"
        />
        {searchValue && isDebouncing ? (
          <ul className={styles.searchList}>
            {searchList.length > 0
              ? searchList.map((listItem) => (
                  <li
                    key={listItem._id}
                    onClick={() => {
                      navigate(`/products/${listItem._id}`);
                      setSearchValue("");
                    }}
                  >
                    {listItem.title}
                  </li>
                ))
              : "No products found"}
          </ul>
        ) : null}
      </div>
      <button
        className={`${styles.menuBtn}`}
        onClick={() => setShowMenu(!showMenu)}
      >
        <i className="fas fa-bars"></i>
      </button>
      <nav
        className={`nav ${styles.nav} ${showMenu ? styles.active : ""} ${
          styles.searchActive
        }`}
      >
        <ul className="nav-list">
          <li>
            <Link
              to={authState.token && authState.user ? "/user" : "/login"}
              onClick={() => setShowMenu(false)}
            >
              <i className="fas fa-user"></i>
              {authState.user ? ` ${authState.user.firstName}` : " Login"}
            </Link>
          </li>
          <li>
            <Link
              to="/wishlist"
              className={styles.badgeContainer}
              onClick={() => setShowMenu(false)}
            >
              <i className="fas fa-heart"></i> Wishlist
              {wishlist.length > 0 ? (
                <span className={styles.badge}>{wishlist.length}</span>
              ) : null}
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className={styles.badgeContainer}
              onClick={() => setShowMenu(false)}
            >
              <i className="fa-solid fa-bag-shopping"></i> Bag
              {cart.length > 0 ? (
                <span className={styles.badge}>{cart.length}</span>
              ) : null}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };

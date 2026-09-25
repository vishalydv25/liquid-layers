import React from "react";
import { Link } from "react-router-dom";
import { useFilter } from "../../../../Context";
import styles from "./Categories.module.css";

const Categories = () => {
  const { filterDispatch } = useFilter();

  const filterFromHome = (category) => {
    filterDispatch({ type: "CLEAR" });
    filterDispatch({ type: "CATEGORY_FILTER", payload: { type: category } });
  };

  return (
    <div className={styles.categoryList}>
      <Link
        to="/products"
        className={styles.categoryItem}
        onClick={() => filterFromHome("Best seller")}
      >
        <img
          src="https://theartking.in/cdn/shop/files/Resin_Articles.webp?v=1724928370&width=1445"
          alt="HeroImg"
        />
        <span>Best seller</span>
      </Link>
      <Link
        to="/products"
        className={styles.categoryItem}
        onClick={() => filterFromHome("Festive")}
      >
        <img
          src="https://www.zatpatbazar.com/cdn/shop/products/image_a78bcfb0-a380-4932-8d56-76ddaeb41fb7_1200x1200.jpg?v=1662016991"
          alt="HeroImg"
        />
        <span>Festive</span>
      </Link>
    </div>
  );
};

export { Categories };

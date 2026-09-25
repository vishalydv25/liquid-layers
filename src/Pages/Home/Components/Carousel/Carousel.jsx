import React, { useState } from "react";
import { Link } from "react-router-dom";
import { carouselImgs } from "../../../../Assets/images";
import styles from "./Carousel.module.css";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselHandler = (btnName) => {
    if (btnName === "prev") {
      currentIndex === 0
        ? setCurrentIndex(carouselImgs.length - 1)
        : setCurrentIndex((prev) => prev - 1);
    }
    if (btnName === "next") {
      currentIndex === carouselImgs.length - 1
        ? setCurrentIndex(0)
        : setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.lpCarouselContainer}>
      {carouselImgs
        ? carouselImgs.map((img, index) => (
            <Link to="/products" key={index}>
              <img
                src={img}
                alt={img}
                className={`resp-img ${
                  index === currentIndex ? styles.activeImg : ""
                }`}
              />
            </Link>
          ))
        : null}
      <button
        className={styles.carouselLeft}
        onClick={() => carouselHandler("prev")}
      >
        <i className="fa-solid fa-circle-chevron-left"></i>
      </button>
      <button
        className={styles.carouselRight}
        onClick={() => carouselHandler("next")}
      >
        <i className="fa-solid fa-circle-chevron-right"></i>
      </button>
    </div>
  );
};

export { Carousel };

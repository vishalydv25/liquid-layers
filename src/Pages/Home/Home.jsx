import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Categories, Footer } from "./Components";
import styles from "./Home.module.css";
import { scrollToTop } from "../../Utils";

const Home = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <main className={styles.lpMain}>
        <section className={styles.heroImgContainer}>
          <Link to="/products">
            <img
              src="https://www.skillshare.com/blog/wp-content/uploads/2022/03/Untitled-2-3.png"
              alt="HeroImg"
              className={styles.heroImg}
            />
          </Link>
        </section>
        <section>
          <div className={styles.lpTextContainer}>
            <h3>New Releases</h3>
            <Link to="/products">View All</Link>
          </div>
          <Carousel />
        </section>
        <section className={styles.lpCategory}>
          <h3>Featured Categories</h3>
          <Categories />
        </section>
        <div className={styles.lpCta}>
          <Link to="/products">Explore More</Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export { Home };

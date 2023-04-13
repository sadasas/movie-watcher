import { useState, useEffect } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";

import styles from "@/styles/navbar/Navbar.module.scss";
import Menu from "./Menu";

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="navbar" className={styles.container}>
      <div
        className={`${styles["navbar-container"]} ${
          isSticky ? styles["navbar-fixed"] : null
        }`}
      >
        <div className={styles["categories-container"]}>
          <a>
            <h2>Movies</h2>
          </a>
          <a>
            <h2>Series</h2>
          </a>
        </div>
        <div className={styles["categories-container"]}>
          <FiSearch className={styles.btn} />
          <CgMenuGridR
            className={styles.btn}
            onClick={() => setIsMenuActive(true)}
          />
        </div>
      </div>
      <Menu isMenuActive={isMenuActive} setIsMenuActive={setIsMenuActive} />
    </section>
  );
}

export default Navbar;

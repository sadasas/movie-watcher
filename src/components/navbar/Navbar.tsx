import { useState, useEffect } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/styles/navbar/Navbar.module.scss";
import Menu from "./Menu";

enum MenuNav {
  MOVIES = 1,
  SERIES,
  NONE,
}
function Navbar() {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuNav>(MenuNav.NONE);

  const checkIsMoviePage = () => {
    let isMoviePage = false;
    if (router.pathname.includes("/film/[...params")) isMoviePage = true;
    else if (router.pathname.includes("/series/[...params")) isMoviePage = true;

    return isMoviePage;
  };
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    if (router.pathname.includes("/film")) setSelectedMenu(MenuNav.MOVIES);
    else if (router.pathname.includes("/series"))
      setSelectedMenu(MenuNav.SERIES);
    else setSelectedMenu(MenuNav.NONE);
    console.log(selectedMenu);
  }, [router]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section
        id="navbar"
        className={`${styles.container} ${
          checkIsMoviePage() ? styles["container-transparent"] : null
        }`}
      >
        <div
          id="navbar-container"
          className={`${styles["navbar-container"]} ${
            isSticky ? styles["navbar-fixed"] : null
          }`}
        >
          <div className={styles["categories-container"]}>
            <Link
              onClick={() => {
                setSelectedMenu(MenuNav.NONE);
              }}
              className={styles["menu-title"]}
              href="/"
            >
              <h2>JustSee</h2>
            </Link>
            <Link
              onClick={() => {
                setSelectedMenu(MenuNav.MOVIES);
              }}
              className={`${styles["menu-list"]} ${
                selectedMenu == MenuNav.MOVIES ? styles["menu-selected"] : null
              }`}
              href="/film"
            >
              <h3>Movies</h3>
            </Link>

            <Link
              onClick={() => {
                setSelectedMenu(MenuNav.SERIES);
              }}
              className={`${styles["menu-list"]} ${
                selectedMenu == MenuNav.SERIES ? styles["menu-selected"] : null
              }`}
              href="/series"
            >
              <h3>Series</h3>
            </Link>
          </div>
          <div className={styles["categories-container"]}>
            <div className={`${styles.btn} ${styles["search-box"]}`}>
              <input type="text" />
              <span></span>
            </div>

            <CgMenuGridR
              className={styles.btn}
              onClick={() => setIsMenuActive(true)}
            />
          </div>
        </div>
      </section>
      <Menu isMenuActive={isMenuActive} setIsMenuActive={setIsMenuActive} />
    </>
  );
}

export default Navbar;

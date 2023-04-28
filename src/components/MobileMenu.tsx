import Link from "next/link";
import { BiMovie, BiBookBookmark } from "react-icons/bi";
import { MdMonitor } from "react-icons/md";

import { MenuNav } from "./navbar/Navbar";
import styles from "@/styles/MobileMenu.module.scss";

function MobileMenu({
  selectedMenu,
  setSelectedMenu,
}: {
  selectedMenu: MenuNav;
  setSelectedMenu: Function;
}) {
  return (
    <section className={styles["mobile-menu"]}>
      <Link
        onClick={() => setSelectedMenu(MenuNav.NONE)}
        className={`${styles["menu"]} ${
          selectedMenu == MenuNav.NONE ? styles["menu-selected"] : null
        }`}
        href="/"
      >
        <h3>JustSee</h3>
      </Link>
      <Link
        onClick={() => setSelectedMenu(MenuNav.MOVIES)}
        className={`${styles["menu"]} ${
          selectedMenu == MenuNav.MOVIES ? styles["menu-selected"] : null
        }`}
        href="/film"
      >
        <BiMovie className={styles["menu-icon"]} />
        <h4>Film</h4>
      </Link>
      <Link
        onClick={() => setSelectedMenu(MenuNav.SERIES)}
        className={`${styles["menu"]} ${
          selectedMenu == MenuNav.SERIES ? styles["menu-selected"] : null
        }`}
        href="/series"
      >
        <MdMonitor className={styles["menu-icon"]} />
        <h4>Series</h4>
      </Link>
      <Link
        onClick={() => setSelectedMenu(MenuNav.BOOKMARK)}
        className={`${styles["menu"]} ${
          selectedMenu == MenuNav.BOOKMARK ? styles["menu-selected"] : null
        }`}
        href="/bookmark"
      >
        <BiBookBookmark className={styles["menu-icon"]} />
        <h4>Bookmark</h4>
      </Link>
    </section>
  );
}

export default MobileMenu;

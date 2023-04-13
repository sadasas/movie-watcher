import { BiCategoryAlt, BiBookBookmark, BiTime } from "react-icons/bi";
import { GoClock } from "react-icons/go";
import { MdLanguage,MdClose } from "react-icons/md";

import styles from "@/styles/navbar/Menu.module.scss";

function List({ children }: React.PropsWithChildren<{}>) {
  return <div className={styles.list}>{children}</div>;
}

function Menu({
  isMenuActive,
  setIsMenuActive,
}: {
  isMenuActive: boolean;
  setIsMenuActive: Function;
}) {
  return (
    <div
      className={`${styles["menu-container"]} ${
        !isMenuActive ? styles["menu-container-inactive"] : null
      }`}
    >
      <div
        onClick={() => setIsMenuActive(false)}
        className={styles["close-btn"]}
      >
        <MdClose/>
      </div>
      <h4>Menu</h4>
      <List>
        <BiCategoryAlt className={styles.icon} />
        <h3>Genre</h3>
      </List>
      <List>
        <GoClock className={styles.icon} />
        <h3>Coming Soon</h3>
      </List>
      <div className={styles.line}></div>
      <h4>Library</h4>
      <List>
        <BiBookBookmark className={styles.icon} />
        <h3>Bookmarked</h3>
      </List>
      <List>
        <BiTime className={styles.icon} />
        <h3>Recent</h3>
      </List>
      <div className={styles.line}></div>
      <h4>Setting</h4>
      <List>
        <MdLanguage className={styles.icon} />
        <h3>Language</h3>
      </List>
    </div>
  );
}

export default Menu;

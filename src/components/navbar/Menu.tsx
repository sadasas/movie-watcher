import { BiCategoryAlt, BiBookBookmark, BiTime } from "react-icons/bi";
import { GoClock } from "react-icons/go";
import { MdLanguage, MdClose } from "react-icons/md";
import { IconType } from "react-icons/lib";
import Link from "next/link";

import styles from "@/styles/navbar/Menu.module.scss";

function List({
  Icon,
  url,
  title,
  setIsMenuActive,
}: {
  setIsMenuActive: Function;
  Icon: IconType;
  url: string;
  title: string;
}) {
  return (
    <Link
      onClick={() => setIsMenuActive(false)}
      href={url}
      className={styles.list}
    >
      <Icon className={styles.icon} />
      <h3>{title}</h3>
    </Link>
  );
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
        <MdClose />
      </div>
      <h4>Menu</h4>

      <List
        setIsMenuActive={setIsMenuActive}
        Icon={BiCategoryAlt}
        title="Genre"
        url="/genre"
      />
      <List
        //TODO: use global state management to pass f
        setIsMenuActive={setIsMenuActive}
        Icon={GoClock}
        title="Coming soon"
        url=""
      />
      <div className={styles.line}></div>
      <h4>Library</h4>
      <div className={styles.bookmark}>
        <List
          setIsMenuActive={setIsMenuActive}
          Icon={BiBookBookmark}
          title="Bookmark"
          url="/bookmark"
        />
      </div>

      <List
        setIsMenuActive={setIsMenuActive}
        Icon={BiTime}
        title="Recent"
        url=""
      />
      <div className={styles.line}></div>
      <h4>Setting</h4>
      <List
        setIsMenuActive={setIsMenuActive}
        Icon={MdLanguage}
        title="Language"
        url=""
      />
    </div>
  );
}

export default Menu;

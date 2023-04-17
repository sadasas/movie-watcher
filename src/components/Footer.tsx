import styles from "@/styles/Footer.module.scss";

function Footer() {
  return (
    <section id="footer" className={styles.container}>
      <div className={styles["footer-container"]}>
        <div className={styles["footer-left-container"]}>
          <div className={styles["row-content"]}>
            <h3>JustSee</h3>
            <p>
              JustSee gives fans everywhere a way to discover, save, and enjoy
              the entertainment they love the most.{" "}
            </p>
          </div>
          <div className={styles["row-content"]}>
            <div className={styles["column-content"]}>
              <h4>Resources</h4>
              <a>Why JustSee</a>
              <a>Guides</a>
            </div>
            <div className={styles["column-content"]}>
              <h4>Company</h4>
              <a>About us</a>
              <a>Carrers</a>
              <a>Partners</a>
            </div>
            <div className={styles["column-content"]}>
              <h4>Sosial</h4>
              <a>Linkedin</a>
              <a>Twitter</a>
              <a>Facebook</a>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles["footer-right-container"]}>
          <h2>Subscribe to get latest movie</h2>
        </div>
      </div>
      <div className={styles["row-content"]}>
        <h5>@2023</h5>
        <h5>Design by Wahyu SRP</h5>
      </div>
    </section>
  );
}

export default Footer;

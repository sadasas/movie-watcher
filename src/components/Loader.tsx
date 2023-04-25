import styles from "@/styles/Loader.module.scss";

function Loader() {
  return (
    <div className={styles.loader}>
      <img src="/loader.svg" />
    </div>
  );
}

export default Loader;

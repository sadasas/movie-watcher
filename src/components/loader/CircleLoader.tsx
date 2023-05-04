import Image from "next/image";

import styles from "@/styles/ContentLoader.module.scss";

function CircleLoader() {
  const PlaceholderCircle = "/img/placeholder/placeholderCircle.svg";

  return (
    <div className={styles.container}>
      <Image width={100} height={100} alt="loading" src={PlaceholderCircle} />
    </div>
  );
}

export default CircleLoader;

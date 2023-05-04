import ContentLoader from "react-content-loader";
import styles from "@/styles/ContentLoader.module.scss";

const BannerLoader = ({ width, height }: { width: number; height: number }) => (
  <ContentLoader
    className={styles.container}
    viewBox={`0 0 ${width} ${height}`}
    height={height}
    backgroundColor="#ffffff"
    foregroundColor="#B7B7B7"
    width={width}
  >
    <rect
      x="0"
      y="0"
      rx="5"
      ry="5"
      width={width}
      height={(height / 100) * 90}
    />
    <rect
      x="0"
      y={(height / 100) * 93}
      rx="5"
      ry="5"
      width={width}
      height={(height / 100) * 4}
    />
  </ContentLoader>
);

export default BannerLoader;

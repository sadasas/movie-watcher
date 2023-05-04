import ContentLoader from "react-content-loader";
import styles from "@/styles/ContentLoader.module.scss";

const MovieBoxLoader = ({
  row = 2,
  column = 5,
  width = 1366,
  padding = 12,
  borderRadius = 4,
  ...props
}) => {
  const list = [];

  let height;
  let index = 0;
  for (let i = 1; i <= row; i++) {
    const itemWidth = (width - padding * (column + 1)) / column;
    index++;
    const height1 = (itemWidth * 9) / 10;

    const height2 = 10;

    const height3 = 10;

    const space =
      padding +
      (padding + height1) +
      (padding / 2 + height2) +
      height3 +
      padding * 6;

    const yHeading = padding + space * (i - 1);

    for (let j = 0; j < column; j++) {
      const x = padding + j * (itemWidth + padding);

      const y1 = yHeading + (padding * 3) / 2;

      const y2 = y1 + padding + height1;

      const y3 = y2 + padding / 2 + height2;
      index++;
      list.push(
        <rect
          key={index}
          x={x}
          y={y1}
          rx={borderRadius}
          ry={borderRadius}
          width={itemWidth}
          height={height1}
        />
      );
      index++;
      list.push(
        <rect
          key={index}
          x={x}
          y={y2}
          rx={0}
          ry={0}
          width={itemWidth}
          height={height2}
        />
      );
      index++;
      list.push(
        <rect
          key={index}
          x={x}
          y={y3}
          rx={0}
          ry={0}
          width={itemWidth * 0.6}
          height={height3}
        />
      );

      if (i === row) {
        height = y3 + height3;
      }
    }
  }

  return (
    <ContentLoader
      className={styles.container}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      backgroundColor="#ffffff"
      foregroundColor="#B7B7B7"
      {...props}
    >
      {list}
    </ContentLoader>
  );
};

export default MovieBoxLoader;

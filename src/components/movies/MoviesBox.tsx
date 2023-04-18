import { IoMdAddCircle } from "react-icons/io";
import { LazyLoadImage, ScrollPosition } from "react-lazy-load-image-component";
import Link from "next/link";

import styles from "@/styles/list_movies/MoviesBox.module.scss";
import { IMovie, MovieType } from "@/models/movie";

function MoviesBox({
  movie,
  width,
  height,
  scrollPosition,
}: {
  scrollPosition: ScrollPosition;
  movie: IMovie;
  width: number;
  height: number;
}) {
  const PlaceholderVertical = "/placeholderVertical.svg";
  const PlaceholderHorizontal = "/placeholderHorizontal.svg";
  const type = movie.episodes ? MovieType.Series : MovieType.Film;
  const boxSizeStyle = {
    width,
    height,
  };

  const boxAbsoluteStyle = () => {
    if (width >= 800)
      return {
        padding: "20px 28px",
        fontSize: "1.2rem",
        width,
        height,
      };
    if (width >= 600 && width < 800)
      return {
        padding: "20px 28px",
        fontSize: "1.2rem",
        width,
        height,
      };
    else if (width < 600)
      return {
        padding: "15px 9px",
        fontSize: "0.8rem",
        width,
        height,
      };
  };

  const btnsLayoutStyle = () => {
    if (width >= 600)
      return {
        justifyContent: "flex-end",
        gap: "10px",
      };
    else {
      return {
        justifyContent: "space-between",
      };
    }
  };

  const btnsSeeStyle = () => {
    if (width >= 600)
      return {
        fontSize: "2.8rem",
      };
    else {
      return {
        fontSize: "2rem",
      };
    }
  };

  return (
    <div style={boxSizeStyle} className={styles["box-container"]}>
      {movie.primaryImage != null && (
        <LazyLoadImage
          scrollPosition={scrollPosition}
          threshold={0}
          alt={movie.titleText.text}
          effect="blur"
          placeholderSrc={
            width > height ? PlaceholderHorizontal : PlaceholderVertical
          }
          src={movie.primaryImage.url}
        />
      )}
      {movie.titleText.text != "" && (
        <div
          style={boxAbsoluteStyle()}
          className={styles["box-container-absolute"]}
        >
          <h2>{movie.titleText.text}</h2> <h4>{movie.releaseDate.year}</h4>
          <div style={btnsLayoutStyle()} className={styles.btns}>
            <Link
              href={{
                pathname: `/${MovieType[type].toLocaleLowerCase()}/params`,
                query: { movie: JSON.stringify(movie) },
              }}
              className={`${styles.btn} ${styles["btn-see"]} `}
            >
              See detail
            </Link>
            <IoMdAddCircle
              style={btnsSeeStyle()}
              className={`${styles.btn} ${styles["btn-watchlist"]} `}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MoviesBox;

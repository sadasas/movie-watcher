import { IoMdAddCircle } from "react-icons/io";
import { LazyLoadImage, ScrollPosition } from "react-lazy-load-image-component";
import Link from "next/link";

import styles from "@/styles/list_movies/MoviesBox.module.scss";
import { IMovie, MovieType } from "@/models/movie";
import { BoxType } from "@/models/box";

function MoviesBox({
  boxType,
  movie,
  scrollPosition,
}: {
  boxType: BoxType;
  scrollPosition: ScrollPosition;
  movie: IMovie;
}) {
  const PlaceholderVertical = "/placeholderVertical.svg";

  const type = movie.episodes ? MovieType.Series : MovieType.Film;

  return (
    <div
      className={`${styles["box-container"]} ${
        boxType == BoxType.Small
          ? styles["small-box"]
          : boxType == BoxType.Medium
          ? styles["medium-box"]
          : styles["large-box"]
      }`}
    >
      {movie.primaryImage != null && (
        <LazyLoadImage
          scrollPosition={scrollPosition}
          threshold={0}
          alt={movie.titleText.text}
          effect="blur"
          placeholderSrc={PlaceholderVertical}
          src={movie.primaryImage.url}
        />
      )}
      {movie.titleText.text != "" && (
        <div
          className={`${styles["box-container-absolute"]} ${
            boxType == BoxType.Small
              ? styles["small-box-absolute"]
              : boxType == BoxType.Medium
              ? styles["medium-box-absolute"]
              : styles["large-box-absolute"]
          }`}
        >
          <h2>{movie.titleText.text}</h2> <h4>{movie.releaseDate.year}</h4>
          <div className={styles.btns}>
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
              className={`${styles.btn} ${styles["btn-watchlist"]} `}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MoviesBox;

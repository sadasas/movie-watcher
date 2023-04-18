import { IoMdAddCircle } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";

import styles from "@/styles/list_movies/BannerBox.module.scss";
import { IMovie, MovieType } from "@/models/movie";

function BannerBox({ movie }: { movie: IMovie }) {
  const PlaceholderHorizontal = "/placeholderHorizontal.svg";
  const type = movie.episodes ? MovieType.Series : MovieType.Film;
  return (
    <div className={styles["box-container"]}>
      {movie.primaryImage && (
        <LazyLoadImage
          threshold={0}
          alt={movie.titleText.text}
          effect="blur"
          placeholderSrc={PlaceholderHorizontal}
          src={movie.primaryImage.url}
        />
      )}
      {movie.titleText.text != "" && (
        <div className={styles["box-container-absolute"]}>
          <h2 className={styles.title}>{movie.titleText.text}</h2>
          <div className={styles["info-container"]}>
            <h5>{movie.releaseDate.year}</h5>
            {movie.genres &&
              movie.genres.genres.length > 0 &&
              movie.genres.genres.map((genre, index) => (
                <h5 key={index}>{genre.text}</h5>
              ))}
          </div>

          <h4 className={styles.synopsis}>{movie.plot.plotText.plainText}</h4>
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

export default BannerBox;

import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";

import styles from "@/styles/Movie.module.scss";
import { IParsedUrlQueryMovie } from "@/models/route";
import { IMovie } from "@/models/movie";

function Movie() {
  const router = useRouter();
  const movie = JSON.parse(
    (router.query as IParsedUrlQueryMovie).movie
  ) as IMovie;

  return (
    <section id="movie" className="container">
      {movie.primaryImage != null && (
        <div className={styles["movie-image"]}>
          <LazyLoadImage src={movie.primaryImage.url} />
        </div>
      )}
      <div className={styles["movie-container"]}>
        <h1>{movie.titleText.text}</h1>
        <div className={styles["box-container"]}>
          <div className={styles["content-container"]}>
            <h5 className={styles.title}>TRAILER</h5>
          </div>
          <div className={styles["content-container"]}>
            <h5 className={styles.title}>RATING</h5>
            <h2>
              {movie.ratingsSummary != null
                ? movie.ratingsSummary.aggregateRating
                : "PG"}
            </h2>
          </div>
          <div className={styles["content-container"]}>
            <h5 className={styles.title}>RELEASE</h5>
            <h2>
              {movie.releaseDate != null
                ? `${movie.releaseDate.day}/${movie.releaseDate.month}/${movie.releaseDate.year}`
                : "PG"}
            </h2>
          </div>
        </div>

        <div className={styles["content-container"]}>
          <h3 className={styles.title}>Description</h3>
          <p>{movie.plot?.plotText.plainText} </p>
        </div>

        <div className={styles["content-container"]}>
          <h3 className={styles.title}>Cast</h3>
          <p>PG</p>
        </div>
      </div>
    </section>
  );
}

export default Movie;

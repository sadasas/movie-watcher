import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";

import styles from "@/styles/Movie.module.scss";
import { ParsedUrlQueryMovie } from "@/models/route";

function Movie() {
  const router = useRouter();
  const movie = router.query as ParsedUrlQueryMovie;

  return (
    <section id="movie" className="container">
      <div className={styles["movie-image"]}>
        <LazyLoadImage src={movie.imgUrl} />
      </div>
      <div className={styles["movie-container"]}>
        <h1>{movie.titleText}</h1>
        <div className={styles["box-container"]}>
          <div className={styles["content-container"]}>
            <h5 className={styles.title}>TRAILER</h5>
          </div>
          <div className={styles["content-container"]}>
            <h5 className={styles.title}>RATING</h5>
            <h2>{movie.rating != null ? movie.rating : "PG"}</h2>
          </div>
          <div className={styles["content-container"]}>
            <h5 className={styles.title}>RELEASE</h5>
            <h2>{movie.releaseDate != null ? movie.releaseDate : "PG"}</h2>
          </div>
        </div>

        <div className={styles["content-container"]}>
          <h3 className={styles.title}>Description</h3>
          <p>{movie.description} s</p>
        </div>

        <div className={styles["content-container"]}>
          <h3 className={styles.title}>Cast</h3>
          <p>{movie.cast} s</p>
        </div>
      </div>
    </section>
  );
}

export default Movie;

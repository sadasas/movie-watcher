import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";

import styles from "@/styles/Movie.module.scss";
import { IParsedUrlQueryMovie } from "@/models/route";
import { ICast, IMovie, defaultValueMovie } from "@/models/movie";
import { getMainActors } from "../api/getMainActor";
import { useEffect, useState } from "react";

function Movie() {
  const router = useRouter();
  const [movie, setMovie] = useState<IMovie>(defaultValueMovie);

  const [cast, setCast] = useState<ICast[]>();

  const dataCastHandler = async (m: IMovie) => {
    const data = await getMainActors(m.id);
    setCast(data!);
  };
  useEffect(() => {
    if (router.isReady) {
      const movieParsed = JSON.parse(
        (router.query as IParsedUrlQueryMovie).movie
      ) as IMovie;
      setMovie(movieParsed);
      dataCastHandler(movieParsed);
    }
  }, [router.isReady]);

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
          <h3 className={styles.title}>Synopsis</h3>
          <p>{movie.plot?.plotText.plainText} </p>
        </div>

        <div className={styles["content-container"]}>
          <h3 className={styles.title}>Cast</h3>
          <div className={styles["cast-container"]}>
            {cast != null &&
              cast.map((cast, i) => (
                <div className={styles["cast-content-container"]} key={i}>
                  <p>{cast.node.name.nameText.text}</p>
                  <div className={styles["cast-img-container"]}>
                    {cast.node.name.primaryImage != null && (
                      <LazyLoadImage
                        placeholderSrc="/placeholderVertical.svg"
                        src={cast.node.name.primaryImage.url}
                      />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Movie;

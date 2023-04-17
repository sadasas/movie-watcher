import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "@/styles/Movie.module.scss";
import { IParsedUrlQueryMovie } from "@/models/route";
import { ICast, ICreator, IMovie, defaultValueMovie } from "@/models/movie";
import { getMainActors } from "@/pages/api/getMainActor";
import { getCreators } from "@/pages/api/getCreator";

function Series() {
  const router = useRouter();
  const [movie, setMovie] = useState<IMovie>(defaultValueMovie);

  const [cast, setCast] = useState<ICast[]>();
  const [creators, setCreator] = useState<ICreator[]>();

  const placeholderList = "/placeholderList.svg";
  const dataCastHandler = async (m: IMovie) => {
    const data = await getMainActors(m.id);
    setCast(data!);
  };

  const dataCreatorHandler = async (id: string) => {
    const data = await getCreators(id);

    setCreator(data!);
  };

  useEffect(() => {
    if (router.isReady) {
      const movieParsed = JSON.parse(
        (router.query as IParsedUrlQueryMovie).movie
      ) as IMovie;
      setMovie(movieParsed);
      dataCastHandler(movieParsed);
      dataCreatorHandler(movieParsed.id);
    }
  }, [router.isReady]);

  return (
    <section id="movie" className="container">
      {movie.primaryImage && (
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
              {movie.ratingsSummary
                ? movie.ratingsSummary.aggregateRating
                : "PG"}
            </h2>
          </div>
          <div className={styles["content-container"]}>
            <h5 className={styles.title}>RELEASE</h5>
            <h2>
              {movie.releaseDate
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
          <h3 className={styles.title}>Creator</h3>
          {creators && creators.length > 0 ? (
            creators.map((creator, i) => (
              <div className={styles["creator-container"]} key={i}>
                {creator.creators &&
                  creator.creators.map((cr, i) => (
                    <div
                      className={styles["creator-content-container"]}
                      key={i}
                    >
                      {cr.credits.map((credit, ii) => (
                        <p key={ii}>
                          {ii + 1}. {credit.name.nameText.text}
                        </p>
                      ))}
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <Image width={230} height={105} alt="" src={placeholderList} />
          )}
        </div>
        <div className={styles["content-container"]}>
          <h3 className={styles.title}>Cast</h3>
          <div className={styles["cast-container"]}>
            {cast ? (
              cast.map((cast, i) => (
                <div className={styles["cast-content-container"]} key={i}>
                  <p>{cast.node.name.nameText.text}</p>
                  <div className={styles["cast-img-container"]}>
                    {cast.node.name.primaryImage && (
                      <LazyLoadImage
                        placeholderSrc="/placeholderVertical.svg"
                        src={cast.node.name.primaryImage.url}
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <Image width={230} height={105} src={placeholderList} alt="" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Series;

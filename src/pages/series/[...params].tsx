import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdAddCircle } from "react-icons/io";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

import styles from "@/styles/Movie.module.scss";
import { IParsedUrlQueryMovie } from "@/models/route";
import { ICast, ICreator, IMovie, defaultValueMovie } from "@/models/movie";
import { getMainActors } from "@/pages/api/getMainActor";
import { getCreators } from "@/pages/api/getCreator";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBookmark, removeBookmark } from "@/store/bookmarkSlice";

function Film() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [movie, setMovie] = useState<IMovie>(defaultValueMovie);
  const [cast, setCast] = useState<ICast[]>();
  const [creators, setCreator] = useState<ICreator[]>();
  const movies = useAppSelector((state) => state.bookmark.value);
  const [isMovieBookmarked, setIsMovieBookmarked] = useState(false);

  const placeholderList = "/placeholderList.svg";
  const placeholderProfile = "/placeholderProfile.svg";

  const dataCastHandler = async (m: IMovie) => {
    const data = await getMainActors(m.id);
    setCast(data!);
  };
  const dataCreatorHandler = async (id: string) => {
    const data = await getCreators(id);
    setCreator(data!);
  };

  const addBookmarkHandler = () => {
    setIsMovieBookmarked(true);
    dispatch(addBookmark(movie));
  };
  const removeBookmarkHandler = () => {
    setIsMovieBookmarked(false);
    dispatch(removeBookmark(movie.id));
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

  useEffect(() => {
    if (movie) {
      if (movies.length < 1) {
        setIsMovieBookmarked(false);
        return;
      }
      let isSame = false;
      movies.forEach((m) => {
        if (m.id === movie.id) {
          isSame = true;
        }
      });
      if (!isSame) setIsMovieBookmarked(false);
      else setIsMovieBookmarked(true);
    }
  }, [movie]);

  return (
    <section id="series" className="container">
      {movie.primaryImage && (
        <div className={styles["movie-image"]}>
          <LazyLoadImage src={movie.primaryImage.url} />
        </div>
      )}
      <div className={styles["movie-container"]}>
        <h1>{movie.titleText.text}</h1>
        <div className={styles["box-container"]}>
          <div
            className={`${styles["content-container"]} ${styles["box-content-container"]}`}
          >
            <h5 className={styles.title}>TRAILER</h5>
          </div>
          <div
            className={`${styles["content-container"]} ${styles["box-content-container"]}`}
          >
            <h5 className={styles.title}>RATING</h5>
            <h2>
              {movie.ratingsSummary
                ? movie.ratingsSummary.aggregateRating
                : "PG"}
            </h2>
          </div>
          <div
            className={`${styles["content-container"]} ${styles["box-content-container"]}`}
          >
            <h5 className={styles.title}>RELEASE</h5>
            <h2>
              {movie.releaseDate
                ? `${movie.releaseDate.day}/${movie.releaseDate.month}/${movie.releaseDate.year}`
                : "PG"}
            </h2>
          </div>
          {isMovieBookmarked ? (
            <BsFillBookmarkCheckFill
              onClick={removeBookmarkHandler}
              className={styles["box-icon"]}
            />
          ) : (
            <IoMdAddCircle
              onClick={addBookmarkHandler}
              className={styles["box-icon"]}
            />
          )}
        </div>

        <div className={styles["content-container"]}>
          <h3 className={styles.title}>Synopsis</h3>
          <p>{movie.plot?.plotText.plainText} </p>
        </div>
        <div className={styles["content-container"]}>
          <h3 className={styles.title}>Director</h3>
          {creators && creators.length > 0 ? (
            creators.map((creator, i) => (
              <div className={styles["creator-container"]} key={i}>
                {creator.directors &&
                  creator.directors.map((director, i) => (
                    <div
                      className={styles["creator-content-container"]}
                      key={i}
                    >
                      {director.credits.map((credit, ii) => (
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
          <h3 className={styles.title}>Writer</h3>
          {creators && creators.length > 0 ? (
            creators.map((creator, i) => (
              <div className={styles["creator-container"]} key={i}>
                {creator.writers &&
                  creator.writers.map((writer, i) => (
                    <div
                      className={styles["creator-content-container"]}
                      key={i}
                    >
                      {writer.credits.map((credit, ii) => (
                        <p key={ii}>
                          {ii + 1}. {credit.name.nameText.text}
                        </p>
                      ))}
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <Image width={230} height={105} src={placeholderList} alt="" />
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
                    <LazyLoadImage
                      placeholderSrc={placeholderProfile}
                      src={
                        cast.node.name.primaryImage
                          ? cast.node.name.primaryImage.url
                          : placeholderProfile
                      }
                    />
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

export default Film;

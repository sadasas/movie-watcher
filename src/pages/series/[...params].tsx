import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdAddCircle } from "react-icons/io";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { useQuery } from "react-query";
import { BsFillPlayFill } from "react-icons/bs";

import styles from "@/styles/Movie.module.scss";
import { IParsedUrlQueryMovie } from "@/models/route";
import { IMovie } from "@/models/movie";
import { getMainActors } from "@/pages/api/getMainActor";
import { getCreators } from "@/pages/api/getCreator";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBookmark, removeBookmark } from "@/features/bookmark/bookmarkSlice";
import { setNotificationBookmark } from "@/features/bookmark/bookmarkNotificationSlice";
import CircleLoader from "@/components/loader/CircleLoader";
import { getTrailer } from "../api/getTrailer";
import PopupTrailer from "@/components/movies/PopupTrailer";
import { togglePopup } from "@/features/popup/popupTrailerSlice";

function Series() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const movies = useAppSelector((state) => state.reducer.bookmark.value);
  const [isMovieBookmarked, setIsMovieBookmarked] = useState(false);

  const {
    data: trailer,
    status: trailerStatus,
    isLoading: trailerLoading,
  } = useQuery({
    queryKey: ["trailer"],
    queryFn: () => getTrailer(movie!.id),
    enabled: movie !== null,
    structuralSharing: false,
    cacheTime: 0,
  });

  const {
    data: cast,
    status: castStatus,
    isLoading: castLoading,
  } = useQuery({
    queryKey: ["castMovie"],
    queryFn: () => getMainActors(movie!.id),
    enabled: movie != null,
    structuralSharing: false,
    cacheTime: 0,
  });

  const {
    data: creators,
    status: creatorsStatus,
    isLoading: creatorsLoading,
  } = useQuery({
    queryKey: ["creatorMovie"],
    queryFn: () => getCreators(movie!.id),
    enabled: movie !== null,
    structuralSharing: false,
    cacheTime: 0,
  });
  const popupToggle = useAppSelector((state) => state.reducer.popupTrailer);

  const placeholderList = "/img/placeholder/placeholderList.svg";
  const emptyCastProfile = "/img/placeholder/placeholderProfile.svg";
  const placeholderCastProfile =
    "/img/placeholder/placeholderMovieVertical.svg";

  const addBookmarkHandler = () => {
    setIsMovieBookmarked(true);
    dispatch(addBookmark(movie!));
    dispatch(setNotificationBookmark(true));
  };
  const removeBookmarkHandler = () => {
    setIsMovieBookmarked(false);
    dispatch(removeBookmark(movie!.id));
  };

  const toggleTrailerHandler = () => {
    if (trailer === null || trailer === undefined) return;
    dispatch(togglePopup(trailer!));
  };

  useEffect(() => {
    if (router.isReady) {
      const movieParsed = JSON.parse(
        (router.query as IParsedUrlQueryMovie).movie
      ) as IMovie;
      setMovie(movieParsed);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (movies.length < 1) {
      setIsMovieBookmarked(false);
      return;
    }
    if (movie) {
      let isSame = false;
      movies.forEach((m) => {
        if (m.id === movie!.id) {
          isSame = true;
        }
      });
      if (!isSame) setIsMovieBookmarked(false);
      else setIsMovieBookmarked(true);
    }
  }, [movie]);

  return (
    <section id="series">
      <div className={styles["movie-image-container"]}>
        <LazyLoadImage src={movie?.primaryImage?.url} />
        <div className={styles["img-overlay"]} />
        <div className={`container ${styles["movie-image-content"]}`}>
          <h1>{movie?.titleText?.text}</h1>
          <div className={styles["title-container"]}>
            <div className={styles["genre-container"]}>
              {movie?.genres?.genres?.map((item, index) => (
                <div key={index}>
                  <p>{item.text}</p>
                </div>
              ))}
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

          <div className={styles["box-container"]}>
            <div
              onClick={toggleTrailerHandler}
              className={`${styles["content-container"]} ${styles["box-content-container"]}`}
            >
              <h5 className={styles.title}>TRAILER</h5>
              {trailerLoading || trailerStatus === "idle" ? (
                <div className={styles["trailer-icon"]}>
                  <CircleLoader />
                </div>
              ) : (
                <BsFillPlayFill className={styles["trailer-icon"]} />
              )}
            </div>
            <div
              className={`${styles["content-container"]} ${styles["box-content-container"]}`}
            >
              <h5 className={styles.title}>RATING</h5>
              <h2>
                {movie?.ratingsSummary
                  ? movie?.ratingsSummary?.aggregateRating
                  : "PG"}
              </h2>
            </div>
            <div
              className={`${styles["content-container"]} ${styles["box-content-container"]}`}
            >
              <h5 className={styles.title}>RELEASE</h5>
              <h2>
                {movie?.releaseDate
                  ? `${movie?.releaseDate?.day}/${movie?.releaseDate?.month}/${movie?.releaseDate?.year}`
                  : "PG"}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles["movie-container"]}`}>
        <div className={styles["content-container"]}>
          <h3 className={styles.title}>Synopsis</h3>
          <p>{movie?.plot?.plotText?.plainText} </p>
        </div>
        <div className={styles["content-container"]}>
          <h3 className={styles.title}>Director</h3>
          {creators &&
            creators.length > 0 &&
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
            ))}
          {creatorsLoading && (
            <Image width={230} height={105} alt="" src={placeholderList} />
          )}
        </div>
        <div className={styles["content-container"]}>
          <h3 className={styles.title}>Writer</h3>
          {creators &&
            creators.length > 0 &&
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
            ))}
          {creatorsLoading && (
            <Image width={230} height={105} alt="" src={placeholderList} />
          )}
        </div>
        <div className={styles["content-container"]}>
          <h3 className={styles.title}>Cast</h3>
          <div className={styles["cast-container"]}>
            {cast &&
              cast.map((cast, i) => (
                <div className={styles["cast-content-container"]} key={i}>
                  <div className={styles["cast-img-container"]}>
                    <LazyLoadImage
                      placeholderSrc={placeholderCastProfile}
                      src={
                        cast.node.name.primaryImage
                          ? cast.node.name.primaryImage.url
                          : emptyCastProfile
                      }
                    />
                  </div>
                  <p>{cast.node.name.nameText.text}</p>
                </div>
              ))}
            {castStatus === "loading" && <CircleLoader />}
          </div>
        </div>
      </div>
      {popupToggle.isActive && <PopupTrailer />}
    </section>
  );
}

export default Series;

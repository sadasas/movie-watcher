import { IoMdAddCircle } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { LazyLoadImage, ScrollPosition } from "react-lazy-load-image-component";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import styles from "@/styles/list_movies/MoviesBox.module.scss";
import { IMovie, MovieType } from "@/models/movie";
import { BoxType } from "@/models/box";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBookmark, removeBookmark } from "@/features/bookmark/bookmarkSlice";
import { setNotificationBookmark } from "@/features/bookmark/bookmarkNotificationSlice";
import { getTrailer } from "@/pages/api/getTrailer";
import { togglePopup } from "@/features/popup/popupTrailerSlice";

function MoviesBox({
  boxType,
  movie,
  scrollPosition,
}: {
  boxType: BoxType;
  scrollPosition: ScrollPosition;
  movie: IMovie;
}) {
  const [isMovieBookmarked, setIsMovieBookmarked] = useState(false);
  const movies = useAppSelector((state) => state.reducer.bookmark.value);
  const {
    data: trailer,
    status: trailerStatus,
    isLoading: trailerLoading,
  } = useQuery({
    queryKey: [movie.id],
    queryFn: () => getTrailer(movie!.id),
    enabled: movie !== null,
    structuralSharing: false,
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const PlaceholderVertical = "/img/placeholder/placeholderMovieVertical.svg";
  const PlaceholderHorizontal =
    "/img/placeholder/placeholderMovieHorizontal.svg";

  const router = useRouter();
  const dispatch = useAppDispatch();
  const type = movie.episodes ? MovieType.Series : MovieType.Film;

  const addBookmarkHandler = (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    dispatch(addBookmark(movie));
    dispatch(setNotificationBookmark(true));
  };
  const removeBookmarkHandler = (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    dispatch(removeBookmark(movie.id));
  };
  const toggleTrailerHandler = () => {
    if (trailer === null || trailer === undefined) return;
    dispatch(togglePopup(trailer!));
  };
  useEffect(() => {
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
  }, [movies]);

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
          placeholderSrc={
            boxType == BoxType.Small
              ? PlaceholderVertical
              : PlaceholderHorizontal
          }
          src={movie.primaryImage.url}
        />
      )}
      {movie.titleText.text != "" && (
        <>
          {/* mobile device overlay */}
          <div
            onClick={() => {
              router.push({
                pathname: `/${MovieType[type].toLocaleLowerCase()}/params`,
                query: { movie: JSON.stringify(movie) },
              });
            }}
            className={`${styles["mobile-box-overlay-absolute"]} ${
              boxType == BoxType.Small
                ? styles["small-box-absolute"]
                : boxType == BoxType.Medium
                ? styles["medium-box-absolute"]
                : styles["large-box-absolute"]
            }`}
          />
          <div
            onClick={toggleTrailerHandler}
            className={`${styles["box-container-absolute"]} ${
              boxType == BoxType.Small
                ? styles["small-box-absolute"]
                : boxType == BoxType.Medium
                ? styles["medium-box-absolute"]
                : styles["large-box-absolute"]
            }`}
          >
            <h2>{movie.titleText.text}</h2>
            <h4>{movie.releaseDate.year}</h4>
            <div className={styles.btns}>
              <Link
                onClick={(event: React.MouseEvent) => event.stopPropagation()}
                href={{
                  pathname: `/${MovieType[type].toLocaleLowerCase()}/params`,
                  query: { movie: JSON.stringify(movie) },
                }}
                className={`${styles.btn} ${styles["btn-see"]} `}
              >
                See detail
              </Link>
              {isMovieBookmarked ? (
                <BsFillBookmarkCheckFill
                  onClick={removeBookmarkHandler}
                  className={`${styles.btn} ${styles["btn-remove-bookmark"]} `}
                />
              ) : (
                <IoMdAddCircle
                  onClick={addBookmarkHandler}
                  className={`${styles.btn} ${styles["btn-add-bookmark"]} `}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MoviesBox;

import { IoMdAddCircle } from "react-icons/io";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { LazyLoadImage, ScrollPosition } from "react-lazy-load-image-component";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/styles/list_movies/MoviesBox.module.scss";
import { IMovie, MovieType } from "@/models/movie";
import { BoxType } from "@/models/box";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBookmark, removeBookmark } from "@/store/bookmarkSlice";
import { useEffect, useState } from "react";

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
  const movies = useAppSelector((state) => state.reducer.value);
  const PlaceholderVertical = "/placeholderVertical.svg";

  const router = useRouter();
  const dispatch = useAppDispatch();
  const type = movie.episodes ? MovieType.Series : MovieType.Film;

  const addBookmarkHandler = (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    dispatch(addBookmark(movie));
  };
  const removeBookmarkHandler = (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    dispatch(removeBookmark(movie.id));
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
          placeholderSrc={PlaceholderVertical}
          src={movie.primaryImage.url}
        />
      )}
      {movie.titleText.text != "" && (
        <div
          onClick={() => {
            router.push({
              pathname: `/${MovieType[type].toLocaleLowerCase()}/params`,
              query: { movie: JSON.stringify(movie) },
            });
          }}
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
      )}
    </div>
  );
}

export default MoviesBox;

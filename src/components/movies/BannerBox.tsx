import { IoMdAddCircle } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

import styles from "@/styles/list_movies/BannerBox.module.scss";
import { IMovie, MovieType } from "@/models/movie";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBookmark, removeBookmark } from "@/store/bookmark/bookmarkSlice";
import { setNotificationBookmark } from "@/store/bookmark/bookmarkNotificationSlice";

function BannerBox({ movie }: { movie: IMovie }) {
  const [isMovieBookmarked, setIsMovieBookmarked] = useState(false);
  const dispatch = useAppDispatch();
  const PlaceholderHorizontal =
    "/img/placeholder/placeholderMovieHorizontal.svg";
  const type = movie.episodes ? MovieType.Series : MovieType.Film;
  const movies = useAppSelector((state) => state.reducer.bookmark.value);

  const addBookmarkHandler = (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    dispatch(setNotificationBookmark(true));
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

export default BannerBox;

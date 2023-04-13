import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";

import styles from "@/styles/list_movies/Box.module.scss";
import { Image, Movie } from "@/models/movie";
import { ParsedUrlQueryMovie } from "@/models/route";

function Box({
  movie,
  width,
  height,
}: {
  movie: Movie;
  width: number;
  height: number;
}) {
  const PlaceholderVertical = "/placeholderVertical.svg";
  const PlaceholderHorizontal = "/placeholderHorizontal.svg";

  const parseMovie = () => {
    const queryMovie: ParsedUrlQueryMovie = {
      id: movie.id,
      imgUrl: movie.primaryImage?.url,
      releaseDate: `${movie.releaseDate.day} ${movie.releaseDate.month} ${movie.releaseDate.year}`,
      titleText: movie.titleText.text,
      rating: movie.rating,
      description: movie.description,
      cast: movie.cast,
    };
    return queryMovie;
  };

  const navigateTMovieHandler = () => {
    document.getElementById("navbar-container")!.style.backgroundColor =
      "transparent";
  };
  const boxSizeStyle = {
    width,
    height,
  };

  const boxAbsoluteStyle = () => {
    if (width >= 600)
      return {
        padding: "40px 28px",
        fontSize: "1.2rem",
        width,
        height,
      };
    else
      return {
        padding: "25px 9px",
        fontSize: "0.8rem",
        width,
        height,
      };
  };

  const btnsLayoutStyle = () => {
    if (width >= 600)
      return {
        justifyContent: "flex-end",
        gap: "10px",
      };
    else {
      return {
        justifyContent: "space-between",
      };
    }
  };

  const btnsSeeStyle = () => {
    if (width >= 600)
      return {
        fontSize: "2.8rem",
      };
    else {
      return {
        fontSize: "2rem",
      };
    }
  };

  return (
    <div className={styles.box}>
      <div style={boxSizeStyle} className={styles["box-container"]}>
        {movie.primaryImage != null && (
          <LazyLoadImage
            threshold={0}
            effect="blur"
            placeholderSrc={
              width > height ? PlaceholderHorizontal : PlaceholderVertical
            }
            src={movie.primaryImage.url}
          />
        )}
        {movie.titleText.text != "" && (
          <div
            style={boxAbsoluteStyle()}
            className={styles["box-container-absolute"]}
          >
            <h2>{movie.titleText.text}</h2> <h4>{movie.releaseDate.year}</h4>
            <div style={btnsLayoutStyle()} className={styles.btns}>
              <Link
                onClick={() => navigateTMovieHandler()}
                href={{
                  pathname: "/movie/params",
                  query: parseMovie(),
                }}
                className={styles["btn-see"]}
              >
                See detail
              </Link>
              <IoMdAddCircle
                style={btnsSeeStyle()}
                className={styles["btn-watchlist"]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Box;

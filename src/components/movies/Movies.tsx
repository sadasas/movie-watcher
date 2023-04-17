import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import MoviesBox from "@/components/movies/MoviesBox";
import { IMovie, MovieType, defaultValueMovie } from "@/models/movie";
import styles from "@/styles/list_movies/Movies.module.scss";

function Movies({
  title,
  movies,
  widthBox,
  heightBox,
}: {
  title: string;
  movies: IMovie[];
  widthBox: number;
  heightBox: number;
}) {
  const EmptyImg = "";

  const slideLeft = () => {
    let slider = document.getElementById(`slider-${title}`);
    slider!.scrollLeft = slider!.scrollLeft - widthBox - 10;
  };

  const slideRight = () => {
    let slider = document.getElementById(`slider-${title}`);
    slider!.scrollLeft = slider!.scrollLeft + widthBox + 10;
  };

  return (
    <div className={styles.container}>
      <div className={styles["list-movies-container"]}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles["slider-container"]}>
          <div className={styles["btns-scroll"]}>
            <IoIosArrowBack onClick={slideLeft} />
            <IoIosArrowForward onClick={slideRight} />
          </div>
          <div
            className={styles["slider-content-container"]}
            id={`slider-${title}`}
          >
            {movies.length > 0 &&
              movies.map((movie, index) => (
                <MoviesBox
                  key={index}
                  movie={movie}
                  width={widthBox}
                  height={heightBox}
                ></MoviesBox>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movies;

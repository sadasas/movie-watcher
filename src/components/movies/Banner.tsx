import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { IMovie, defaultValueMovie } from "@/models/movie";
import styles from "@/styles/list_movies/Movies.module.scss";
import BannerBox from "@/components/movies/BannerBox";

function Banner({ title, movies }: { title: string; movies: IMovie[] }) {
  const EmptyImg = "";

  const slideLeft = () => {
    let slider = document.getElementById(`slider-${title}`);
    slider!.scrollLeft = slider!.scrollLeft - 800 - 10;
  };

  const slideRight = () => {
    let slider = document.getElementById(`slider-${title}`);
    slider!.scrollLeft = slider!.scrollLeft + 800 + 10;
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
                <BannerBox key={index} movie={movie}></BannerBox>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;

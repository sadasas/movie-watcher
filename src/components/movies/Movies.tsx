import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";

import MoviesBox from "@/components/movies/MoviesBox";
import { IMovie, MovieType, defaultValueMovie } from "@/models/movie";
import styles from "@/styles/list_movies/Movies.module.scss";
import Link from "next/link";

function Movies({
  scrollPosition,
  title,
  movies,
  urlBase,
  urlBaseParams,
  widthBox,
  heightBox,
}: {
  scrollPosition: ScrollPosition;
  title: string;
  urlBase: string;
  urlBaseParams: object | null;
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
        <div className={styles["title-container"]}>
          <h2>{title}</h2>
          {urlBaseParams ? (
            <Link
              href={{
                pathname: urlBase,
                query: { data: JSON.stringify(urlBaseParams) },
              }}
            >
              See all
            </Link>
          ) : (
            <Link
              href={{
                pathname: urlBase,
              }}
            >
              See all
            </Link>
          )}
        </div>

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
                  scrollPosition={scrollPosition}
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

export default trackWindowScroll(Movies);

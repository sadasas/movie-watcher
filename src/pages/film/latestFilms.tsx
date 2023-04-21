import { useCallback, useEffect, useRef, useState } from "react";
import {
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import Image from "next/image";

import { IMovie } from "@/models/movie";
import styles from "@/styles/GenreMovie.module.scss";
import MoviesBox from "@/components/movies/MoviesBox";
import { getLatestFilms } from "../api/film/getLatesFilms";
import { BoxType } from "@/models/box";

function LatestFilms({ scrollPosition }: { scrollPosition: ScrollPosition }) {
  const observer = useRef<IntersectionObserver>();
  const [movies, setMovies] = useState<IMovie[]>();

  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextItems, setHasNextItems] = useState(true);

  const lastItemElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextItems) {
          setCurrentPage((i) => i + 1);
          getDataMovieHandler(currentPage, 12);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasNextItems]
  );

  const getDataMovieHandler = async (index: number, length: number) => {
    setIsFetching(true);
    const { validData, hasNextItems } = await getLatestFilms(index, length);
    if (movies) setMovies([...movies!, ...validData]);
    else setMovies(validData);
    setHasNextItems(hasNextItems);
    setIsFetching(false);
  };

  useEffect(() => {
    if (hasNextItems) {
      setCurrentPage((i) => i + 1);
      getDataMovieHandler(currentPage, 12);
    }
  }, []);

  return (
    <section id="latest-films" className="container">
      <main className={styles["genre-movie-container"]}>
        <h2>Latest</h2>
        <div className={styles["genre-movie-grid-container"]}>
          {movies &&
            movies.map((movie, index) => {
              if (movies.length === index + 1) {
                return (
                  <div key={index} ref={lastItemElementRef}>
                    <MoviesBox
                      scrollPosition={scrollPosition}
                      movie={movie}
                      boxType={BoxType.Small}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    <MoviesBox
                      scrollPosition={scrollPosition}
                      movie={movie}
                      boxType={BoxType.Small}
                    />
                  </div>
                );
              }
            })}
        </div>
        {isFetching && (
          <Image
            className={styles.loader}
            width={800}
            height={100}
            alt=""
            src="/placeholderList2.svg"
          ></Image>
        )}
      </main>
    </section>
  );
}

export default trackWindowScroll(LatestFilms);

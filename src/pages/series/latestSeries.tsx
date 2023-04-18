import { useEffect, useRef, useState } from "react";
import {
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { useInViewport } from "react-in-viewport";
import Image from "next/image";

import { IMovie } from "@/models/movie";
import styles from "@/styles/GenreMovie.module.scss";
import MoviesBox from "@/components/movies/MoviesBox";
import { getLatestSeries } from "@/pages/api/series/getLatestSeries";

function LatestSeries({ scrollPosition }: { scrollPosition: ScrollPosition }) {
  const myRef = useRef<HTMLImageElement>(null);
  const [movies, setMovies] = useState<IMovie[]>();
  const { inViewport } = useInViewport(myRef);
  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getDataMovieHandler = async (index: number, length: number) => {
    setIsFetching(true);
    const data = await getLatestSeries(index, length);
    if (movies) setMovies([...movies!, ...data]);
    else setMovies(data);

    setIsFetching(false);
  };

  useEffect(() => {
    if (inViewport && !isFetching) {
      setCurrentPage((i) => i + 1);
      getDataMovieHandler(currentPage, 12);
    }
  }, [inViewport]);

  return (
    <section id="latestFilms" className="container">
      <main className={styles["genre-movie-container"]}>
        <h2>Latest</h2>
        <div className={styles["genre-movie-grid-container"]}>
          {movies &&
            movies.map((movie, index) => (
              <MoviesBox
                scrollPosition={scrollPosition}
                movie={movie}
                key={index}
                width={180}
                height={270}
              />
            ))}
        </div>
        <Image
          className={styles.loader}
          width={800}
          height={100}
          ref={myRef}
          alt=""
          src="/placeholderList2.svg"
        ></Image>
      </main>
    </section>
  );
}

export default trackWindowScroll(LatestSeries);

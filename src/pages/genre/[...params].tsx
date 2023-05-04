import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import dynamic from "next/dynamic";

import { Genre, Genre as genreType, IMovie } from "@/models/movie";
import { getGenreMovies } from "@/pages/api/getGenreMovies";
import styles from "@/styles/GenreMovie.module.scss";
import { IParsedUrlQueryGenre, IParsedUrlQueryTypeMovie } from "@/models/route";
import { BoxType } from "@/models/box";
import CircleLoader from "@/components/loader/CircleLoader";
import MovieBoxLoader from "@/components/loader/MovieBoxLoader";
const MoviesBox = dynamic(() => import("@/components/movies/MoviesBox"), {
  loading: () => <MovieBoxLoader row={1} column={1} width={150} />,
});

function GenreMovie({ scrollPosition }: { scrollPosition: ScrollPosition }) {
  const router = useRouter();
  const observer = useRef<IntersectionObserver>();
  const [movies, setMovies] = useState<IMovie[]>();

  const [isFetching, setIsFetching] = useState(false);
  const [genre, setGenre] = useState<Genre>();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextItems, setHasNextItems] = useState(true);

  const lastItemElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextItems) {
          setCurrentPage((i) => i + 1);
          getDataMovieHandler(currentPage, genre!, 12);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasNextItems]
  );

  const getDataMovieHandler = async (
    index: number,
    genre: genreType,
    length: number
  ) => {
    setIsFetching(true);
    const { validData, hasNextItems } = await getGenreMovies(
      index,
      genre,
      length
    );
    if (movies) setMovies([...movies!, ...validData]);
    else setMovies(validData);
    setHasNextItems(hasNextItems);
    setIsFetching(false);
  };

  useEffect(() => {
    if (router.isReady && hasNextItems) {
      setCurrentPage((i) => i + 1);
      const dataQuery = router.query as IParsedUrlQueryTypeMovie;
      const genreQuery = JSON.parse(dataQuery.data) as IParsedUrlQueryGenre;
      setGenre(Number(genreQuery.index) as genreType);
      getDataMovieHandler(
        currentPage,
        Number(genreQuery.index) as genreType,
        12
      );
    }
  }, [router.isReady]);

  return (
    <section id="genre" className="container">
      <main className={styles["genre-movie-container"]}>
        <h2>{Genre[genre!]}</h2>
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
                      boxType={BoxType.Small}
                      scrollPosition={scrollPosition}
                      movie={movie}
                    />
                  </div>
                );
              }
            })}
        </div>
        {isFetching && <CircleLoader />}
      </main>
    </section>
  );
}

export default trackWindowScroll(GenreMovie);

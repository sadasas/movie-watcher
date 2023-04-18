import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { useInViewport } from "react-in-viewport";
import Image from "next/image";

import { Genre as genreType, IMovie } from "@/models/movie";
import { getGenreMovies } from "@/pages/api/getGenreMovies";
import styles from "@/styles/GenreMovie.module.scss";
import MoviesBox from "@/components/movies/MoviesBox";
import { IParsedUrlQueryGenre, IParsedUrlQueryTypeMovie } from "@/models/route";

function GenreMovie({ scrollPosition }: { scrollPosition: ScrollPosition }) {
  const router = useRouter();
  const myRef = useRef<HTMLImageElement>(null);
  const [movies, setMovies] = useState<IMovie[]>();
  const { inViewport } = useInViewport(myRef);
  const [query, setQuery] = useState<IParsedUrlQueryGenre>();
  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getDataMovieHandler = async (
    index: number,
    genre: genreType,
    length: number
  ) => {
    setIsFetching(true);
    const data = await getGenreMovies(index, genre, length);
    if (movies) setMovies([...movies!, ...data]);
    else setMovies(data);

    setIsFetching(false);
  };

  useEffect(() => {
    if (inViewport && !isFetching && router.isReady && router.isReady) {
      setCurrentPage((i) => i + 1);
      const dataQuery = router.query as IParsedUrlQueryTypeMovie;
      const genreQuery = JSON.parse(dataQuery.data) as IParsedUrlQueryGenre;
      const genre = Number(genreQuery.index) as genreType;

      setQuery(genreQuery);
      getDataMovieHandler(currentPage, genre, 12);
    }
  }, [inViewport, router.isReady]);

  return (
    <section id="genre" className="container">
      <main className={styles["genre-movie-container"]}>
        <h2>{query?.genre}</h2>
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

export default trackWindowScroll(GenreMovie);
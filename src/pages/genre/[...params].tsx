import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { defaultValueMovie, Genre as genreType, IMovie } from "@/models/movie";
import { IParsedUrlQueryGenre } from "@/models/route";
import { getGenreMovies } from "../api/getGenreMovies";
import styles from "@/styles/GenreMovie.module.scss";
import MoviesBox from "@/components/movies/MoviesBox";

function GenreMovie() {
  const router = useRouter();
  const [movies, setMovies] = useState<IMovie[]>(
    Array(4).fill(defaultValueMovie)
  );
  const [isFetching, setIsFetching] = useState(true);
  const [query, setQuery] = useState<IParsedUrlQueryGenre>();

  const getDataMovieHandler = async (
    index: number,
    genre: genreType,
    length: number
  ) => {
    setIsFetching(true);
    const data = await getGenreMovies(index, genre, length);
    setMovies(data);
    setIsFetching(false);
  };

  useEffect(() => {
    if (router.isReady) {
      const genreQuery = router.query as IParsedUrlQueryGenre;
      const genre = Number(genreQuery.index) as genreType;
      setQuery(genreQuery);
      //TODO: to slow when get all data once
      getDataMovieHandler(1, genre, 50);
    }
  }, [router.isReady]);

  return (
    <section id="genre" className="container">
      <main className={styles["genre-movie-container"]}>
        <h2>{query?.genre}</h2>
        <div className={styles["genre-movie-grid-container"]}>
          {movies &&
            movies.map((movie, index) => (
              <MoviesBox movie={movie} key={index} width={180} height={270} />
            ))}
        </div>
      </main>
    </section>
  );
}

export default GenreMovie;

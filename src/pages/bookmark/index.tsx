import dynamic from "next/dynamic";
import {
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";

import styles from "@/styles/GenreMovie.module.scss";
import { useAppSelector } from "@/store/hooks";
import { BoxType } from "@/models/box";
const MoviesBox = dynamic(() => import("@/components/movies/MoviesBox"), {
  suspense: true,
});

function Bookmark({ scrollPosition }: { scrollPosition: ScrollPosition }) {
  const movies = useAppSelector((state) => state.reducer.bookmark.value);

  return (
    <section id="bookmark" className="container">
      <main className={styles["genre-movie-container"]}>
        <h2>Bookmark</h2>
        <div className={styles["genre-movie-grid-container"]}>
          {movies &&
            movies.map((movie, index) => (
              <div key={index}>
                <MoviesBox
                  scrollPosition={scrollPosition}
                  movie={movie}
                  boxType={BoxType.Small}
                />
              </div>
            ))}
        </div>
      </main>
    </section>
  );
}

export default trackWindowScroll(Bookmark);

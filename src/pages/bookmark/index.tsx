import dynamic from "next/dynamic";
import {
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { RiMovie2Line } from "react-icons/ri";

import styles from "@/styles/Bookmark.module.scss";
import { useAppSelector } from "@/store/hooks";
import { BoxType } from "@/models/box";
import MovieBoxLoader from "@/components/loader/MovieBoxLoader";
import PopupTrailer from "@/components/movies/PopupTrailer";
const MoviesBox = dynamic(() => import("@/components/movies/MoviesBox"), {
  loading: () => <MovieBoxLoader row={1} column={1} width={150} />,
});

function Bookmark({ scrollPosition }: { scrollPosition: ScrollPosition }) {
  const movies = useAppSelector((state) => state.reducer.bookmark.value);
  const popupToggle = useAppSelector((state) => state.reducer.popupTrailer);

  return (
    <section id="bookmark" className="container">
      <main className={styles["bookmark-movie-container"]}>
        <h2>Bookmark</h2>
        <div className={styles["bookmark-movie-grid-container"]}>
          {movies && movies.length > 0 ? (
            movies.map((movie, index) => (
              <div key={index}>
                <MoviesBox
                  scrollPosition={scrollPosition}
                  movie={movie}
                  boxType={BoxType.Small}
                />
              </div>
            ))
          ) : (
            <div className={styles["empty-bookmark"]}>
              <RiMovie2Line />
              <h3>Empty</h3>
            </div>
          )}
        </div>
      </main>
      {popupToggle.isActive && <PopupTrailer />}
    </section>
  );
}

export default trackWindowScroll(Bookmark);

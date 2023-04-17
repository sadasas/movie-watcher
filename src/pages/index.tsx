import { Suspense } from "react";
import dynamic from "next/dynamic";

import styles from "@/styles/Home.module.scss";
import { getTopRatedFilms } from "./api/film/getTopRatedFilms";
import Movies from "@/components/movies/Movies";
import { getTopRatedSeries } from "./api/series/getTopRatedSeries";
import { getLatestMovies } from "./api/getLatestMovies";
import { getGenreMovies } from "./api/getGenreMovies";
import { Genre } from "@/models/movie";
const Banner = dynamic(() => import("@/components/movies/Banner"), {
  suspense: true,
});

function Home() {
  return (
    <section id="home" className={styles["home-container"]}>
      <Suspense fallback={<div>Loading...</div>}>
        <Banner title="" getDataF={getTopRatedFilms} getdataFParams={[]} />
        <Movies
          title="Top rated series"
          getDataF={getTopRatedSeries}
          widthBox={300}
          heightBox={250}
          getdataFParams={[]}
        />
        <Movies
          title="Latest"
          getDataF={getLatestMovies}
          widthBox={300}
          heightBox={250}
          getdataFParams={[]}
        />
        <Movies
          title="Action"
          getDataF={getGenreMovies}
          widthBox={200}
          heightBox={300}
          getdataFParams={[Genre.Action]}
        />
      </Suspense>
    </section>
  );
}

export default Home;

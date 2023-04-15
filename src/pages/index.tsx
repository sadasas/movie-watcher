import { Suspense } from "react";
import dynamic from "next/dynamic";

import styles from "@/styles/Home.module.scss";
import { getTrendingFilms } from "@/pages/api/film/getTrendingFilms";
import { getUpcomingFilms } from "@/pages/api/film/getLatesFilms";
import { getGenreFilms } from "@/pages/api/film/getGenreFilms";
import { Genre, MovieType } from "@/models/movie";
const Movies = dynamic(() => import("@/components/movies/Movies"), {
  suspense: true,
});

function Home() {
  return (
    <div className={styles["home-container"]}>
      <Suspense fallback={<div>Loading...</div>}>
        <Movies
          title="Trending film"
          type={MovieType.Film}
          getDataF={getTrendingFilms}
          widthBox={600}
          heightBox={400}
          getdataFParams={[]}
        />
        <Movies
          title="Latest film"
          type={MovieType.Film}
          getDataF={getUpcomingFilms}
          widthBox={200}
          heightBox={250}
          getdataFParams={[]}
        />
        <Movies
          title="Comedy"
          type={MovieType.Film}
          getDataF={getGenreFilms}
          widthBox={200}
          heightBox={250}
          getdataFParams={[Genre.Comedy]}
        />
        <Movies
          title="Romance"
          type={MovieType.Film}
          getDataF={getGenreFilms}
          widthBox={200}
          heightBox={250}
          getdataFParams={[Genre.Romance]}
        />
      </Suspense>
    </div>
  );
}

export default Home;

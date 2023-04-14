import { Suspense } from "react";
import dynamic from "next/dynamic";

import styles from "@/styles/Home.module.scss";
import { getTrendingFilms } from "@/pages/api/film/getTrendingFilms";
import { getUpcomingFilms } from "@/pages/api/film/getUpcomingFilms";
import { getGenreFilms } from "@/pages/api/film/getGenreFilms";
const Movies = dynamic(() => import("@/components/movies/Movies"), {
  suspense: true,
});

function Home() {
  return (
    <div className={styles["home-container"]}>
      <Suspense fallback={<div>Loading...</div>}>
        <Movies
          title="Trending film"
          type="film"
          getDataF={getTrendingFilms}
          widthBox={600}
          heightBox={400}
          getdataFParams={[]}
        />
        <Movies
          title="Upcoming film"
          type="film"
          getDataF={getUpcomingFilms}
          widthBox={200}
          heightBox={250}
          getdataFParams={[]}
        />
        <Movies
          title="Comedy"
          type="film"
          getDataF={getGenreFilms}
          widthBox={200}
          heightBox={250}
          getdataFParams={["Comedy"]}
        />
        <Movies
          title="Romance"
          type="film"
          getDataF={getGenreFilms}
          widthBox={200}
          heightBox={250}
          getdataFParams={["Romance"]}
        />
      </Suspense>
    </div>
  );
}

export default Home;

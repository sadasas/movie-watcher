import { Suspense } from "react";
import dynamic from "next/dynamic";

import styles from "@/styles/Home.module.scss";
import { getTrendingSeries } from "@/pages/api/series/getTrendingSeries";
import { getLatestSeries } from "../api/series/getLatestSeries";
import { getGenreSeries } from "../api/series/getGenreSeries";
import { Genre, MovieType } from "@/models/movie";

const Movies = dynamic(() => import("@/components/movies/Movies"), {
  suspense: true,
});

function Home() {
  return (
    <section id="series" className={styles["home-container"]}>
      <Suspense fallback={<div>Loading...</div>}>
        <Movies
          title="Trending series"
          getDataF={getTrendingSeries}
          widthBox={600}
          heightBox={400}
          getdataFParams={[]}
        />
        <Movies
          title="Lates series"
          getDataF={getLatestSeries}
          widthBox={200}
          heightBox={300}
          getdataFParams={[]}
        />
        <Movies
          title="Drama series"
          getDataF={getGenreSeries}
          widthBox={200}
          heightBox={300}
          getdataFParams={[Genre.Drama]}
        />
        <Movies
          title="Family series"
          getDataF={getGenreSeries}
          widthBox={200}
          heightBox={300}
          getdataFParams={[Genre.Family]}
        />
      </Suspense>
    </section>
  );
}

export default Home;
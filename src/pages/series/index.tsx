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
    <div className={styles["home-container"]}>
      <Suspense fallback={<div>Loading...</div>}>
        <Movies
          title="Trending series"
          type={MovieType.Series}
          getDataF={getTrendingSeries}
          widthBox={600}
          heightBox={400}
          getdataFParams={[]}
        />
        <Movies
          title="Lates series"
          type={MovieType.Series}
          getDataF={getLatestSeries}
          widthBox={200}
          heightBox={250}
          getdataFParams={[]}
        />
        <Movies
          title="Drama series"
          type={MovieType.Series}
          getDataF={getGenreSeries}
          widthBox={200}
          heightBox={250}
          getdataFParams={[Genre.Drama]}
        />
        <Movies
          title="Family series"
          type={MovieType.Series}
          getDataF={getGenreSeries}
          widthBox={200}
          heightBox={250}
          getdataFParams={[Genre.Family]}
        />
      </Suspense>
    </div>
  );
}

export default Home;

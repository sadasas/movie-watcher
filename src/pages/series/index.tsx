import { Suspense } from "react";
import dynamic from "next/dynamic";

import styles from "@/styles/Home.module.scss";
import { getTrendingSeries } from "@/pages/api/series/getTrendingSeries";
import { getLatestSeries } from "../api/series/getLatestSeries";
import { getGenreSeries } from "../api/series/getGenreSeries";
import { Genre, IMovie, MovieType } from "@/models/movie";
import { BoxType } from "@/models/box";
import Loader from "@/components/Loader";

const Movies = dynamic(() => import("@/components/movies/Movies"), {
  suspense: true,
});

function Home({
  trendingMoviesData,
  latesMoviesData,
  dramaMoviesData,
  familyMoviesData,
}: {
  trendingMoviesData: IMovie[];
  latesMoviesData: IMovie[];
  dramaMoviesData: IMovie[];
  familyMoviesData: IMovie[];
}) {
  return (
    <section id="series" className={styles["home-container"]}>
      <Suspense fallback={<Loader />}>
        <Movies
          urlBase="/series/trendingSeries"
          urlBaseParams={null}
          title="Trending series"
          movies={trendingMoviesData}
          typeBox={BoxType.Large}
        />
        <Movies
          urlBase="/series/latestSeries"
          urlBaseParams={null}
          title="Lates series"
          movies={latesMoviesData}
          typeBox={BoxType.Small}
        />
        <Movies
          urlBase="/genre/params"
          urlBaseParams={{
            genre: Genre[Genre.Drama],
            index: Genre["Drama"],
          }}
          title="Drama series"
          movies={dramaMoviesData}
          typeBox={BoxType.Small}
        />
        <Movies
          urlBase="/genre/params"
          urlBaseParams={{
            genre: Genre[Genre.Family],
            index: Genre["Family"],
          }}
          title="Family series"
          movies={familyMoviesData}
          typeBox={BoxType.Small}
        />
      </Suspense>
    </section>
  );
}

export default Home;

export async function getStaticProps() {
  const { validData: trendingMoviesData } = await getTrendingSeries(1, 10);
  const { validData: latesMoviesData } = await getLatestSeries(1, 10);
  const { validData: dramaMoviesData } = await getGenreSeries(
    1,
    Genre.Drama,
    10
  );
  const { validData: familyMoviesData } = await getGenreSeries(
    1,
    Genre.Family,
    10
  );
  return {
    props: {
      trendingMoviesData,
      latesMoviesData,
      dramaMoviesData,
      familyMoviesData,
    },
  };
}

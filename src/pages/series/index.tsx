import { Suspense } from "react";
import dynamic from "next/dynamic";

import styles from "@/styles/Home.module.scss";
import { getTrendingSeries } from "@/pages/api/series/getTrendingSeries";
import { getLatestSeries } from "../api/series/getLatestSeries";
import { getGenreSeries } from "../api/series/getGenreSeries";
import { Genre, IMovie, MovieType } from "@/models/movie";

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
      <Suspense fallback={<div>Loading...</div>}>
        <Movies
          title="Trending series"
          movies={trendingMoviesData}
          widthBox={600}
          heightBox={400}
        />
        <Movies
          title="Lates series"
          movies={latesMoviesData}
          widthBox={200}
          heightBox={300}
        />
        <Movies
          title="Drama series"
          movies={dramaMoviesData}
          widthBox={200}
          heightBox={300}
        />
        <Movies
          title="Family series"
          movies={familyMoviesData}
          widthBox={200}
          heightBox={300}
        />
      </Suspense>
    </section>
  );
}

export default Home;

export async function getStaticProps() {
  const trendingMoviesData = await getTrendingSeries(1, 10);
  const latesMoviesData = await getLatestSeries(1, 10);
  const dramaMoviesData = await getGenreSeries(1, Genre.Drama, 10);
  const familyMoviesData = await getGenreSeries(1, Genre.Family, 10);
  return {
    props: {
      trendingMoviesData,
      latesMoviesData,
      dramaMoviesData,
      familyMoviesData,
    },
  };
}

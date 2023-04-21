import { Suspense } from "react";
import dynamic from "next/dynamic";

import styles from "@/styles/Home.module.scss";
import { getTopRatedFilms } from "./api/film/getTopRatedFilms";
import Movies from "@/components/movies/Movies";
import { getTopRatedSeries } from "./api/series/getTopRatedSeries";
import { getLatestMovies } from "./api/getLatestMovies";
import { getGenreMovies } from "./api/getGenreMovies";
import { Genre, IMovie } from "@/models/movie";
import { BoxType } from "@/models/box";
const Banner = dynamic(() => import("@/components/movies/Banner"), {
  suspense: true,
});

function Home({
  bannerMoviesData,
  topRatedMoviesData,
  latestMoviesData,
  actionMoviesData,
}: {
  bannerMoviesData: IMovie[];
  topRatedMoviesData: IMovie[];
  latestMoviesData: IMovie[];
  actionMoviesData: IMovie[];
}) {
  return (
    <section id="home" className={styles["home-container"]}>
      <Suspense fallback={<div>Loading...</div>}>
        <Banner title="" movies={bannerMoviesData} />
        <Movies
          urlBase="/series/topRatedSeries"
          urlBaseParams={null}
          title="Top rated series"
          movies={topRatedMoviesData}
          typeBox={BoxType.Medium}
        />
        <Movies
          urlBase="/film/latestFilms"
          urlBaseParams={null}
          title="Latest"
          movies={latestMoviesData}
          typeBox={BoxType.Medium}
        />
        <Movies
          urlBase="/genre/params"
          urlBaseParams={{
            genre: Genre[Genre.Action],
            index: Genre["Action"],
          }}
          title="Action"
          movies={actionMoviesData}
          typeBox={BoxType.Small}
        />
      </Suspense>
    </section>
  );
}

export default Home;

export async function getStaticProps() {
  const { validData: bannerMoviesData } = await getTopRatedFilms(1, 10);
  const { validData: topRatedMoviesData } = await getTopRatedSeries(1, 10);
  const { validData: latestMoviesData } = await getLatestMovies(1, 10);
  const { validData: actionMoviesData } = await getGenreMovies(
    1,
    Genre.Action,
    10
  );
  return {
    props: {
      bannerMoviesData,
      topRatedMoviesData,
      latestMoviesData,
      actionMoviesData,
    },
  };
}

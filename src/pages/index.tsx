import { Suspense } from "react";
import dynamic from "next/dynamic";

import styles from "@/styles/Home.module.scss";
import { getTopRatedFilms } from "./api/film/getTopRatedFilms";
import Movies from "@/components/movies/Movies";
import { getTopRatedSeries } from "./api/series/getTopRatedSeries";
import { getLatestMovies } from "./api/getLatestMovies";
import { getGenreMovies } from "./api/getGenreMovies";
import { Genre, IMovie } from "@/models/movie";
const Banner = dynamic(() => import("@/components/movies/Banner"), {
  suspense: true,
});

function Home({
  bannerMoviesData,
  topRatedMoviesData,
  latestMoviesData,
  genreMoviesData,
}: {
  bannerMoviesData: IMovie[];
  topRatedMoviesData: IMovie[];
  latestMoviesData: IMovie[];
  genreMoviesData: IMovie[];
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
          widthBox={300}
          heightBox={250}
        />
        <Movies
          urlBase="/film/latestFilms"
          urlBaseParams={null}
          title="Latest"
          movies={latestMoviesData}
          widthBox={300}
          heightBox={250}
        />
        <Movies
          urlBase="/genre/params"
          urlBaseParams={{
            genre: Genre[Genre.Action],
            index: Genre["Action"],
          }}
          title="Action"
          movies={genreMoviesData}
          widthBox={200}
          heightBox={300}
        />
      </Suspense>
    </section>
  );
}

export default Home;

export async function getStaticProps() {
  const bannerMoviesData = await getTopRatedFilms(1, 10);
  const topRatedMoviesData = await getTopRatedSeries(1, 10);
  const latestMoviesData = await getLatestMovies(1, 10);
  const genreMoviesData = await getGenreMovies(1, Genre.Action, 10);
  return {
    props: {
      bannerMoviesData,
      topRatedMoviesData,
      latestMoviesData,
      genreMoviesData,
    },
  };
}

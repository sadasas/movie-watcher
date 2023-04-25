import { Suspense } from "react";
import dynamic from "next/dynamic";

import styles from "@/styles/Home.module.scss";
import { getTrendingFilms } from "@/pages/api/film/getTrendingFilms";
import { getLatestFilms } from "@/pages/api/film/getLatesFilms";
import { getGenreFilms } from "@/pages/api/film/getGenreFilms";
import { Genre, IMovie, MovieType } from "@/models/movie";
import { BoxType } from "@/models/box";
import Loader from "@/components/Loader";
const Movies = dynamic(() => import("@/components/movies/Movies"), {
  suspense: true,
});

function Home({
  trendingMoviesData,
  latesMoviesData,
  comedyMoviesData,
  romanceMoviesData,
}: {
  trendingMoviesData: IMovie[];
  latesMoviesData: IMovie[];
  comedyMoviesData: IMovie[];
  romanceMoviesData: IMovie[];
}) {
  return (
    <section id="films" className={styles["home-container"]}>
      <Suspense fallback={<Loader />}>
        <Movies
          urlBase="/film/trendingFilms"
          urlBaseParams={null}
          title="Trending film"
          movies={trendingMoviesData}
          typeBox={BoxType.Large}
        />
        <Movies
          urlBase="/film/latestFilms"
          urlBaseParams={null}
          title="Latest film"
          movies={latesMoviesData}
          typeBox={BoxType.Small}
        />
        <Movies
          urlBase="/genre/params"
          urlBaseParams={{ genre: Genre[Genre.Comedy], index: Genre["Comedy"] }}
          title="Comedy"
          movies={comedyMoviesData}
          typeBox={BoxType.Small}
        />
        <Movies
          urlBase="/genre/params"
          urlBaseParams={{
            genre: Genre[Genre.Romance],
            index: Genre["Romance"],
          }}
          title="Romance"
          movies={romanceMoviesData}
          typeBox={BoxType.Small}
        />
      </Suspense>
    </section>
  );
}

export default Home;

export async function getStaticProps() {
  const { validData: trendingMoviesData } = await getTrendingFilms(1, 10);
  const { validData: latesMoviesData } = await getLatestFilms(1, 10);
  const { validData: comedyMoviesData } = await getGenreFilms(
    1,
    Genre.Comedy,
    10
  );
  const { validData: romanceMoviesData } = await getGenreFilms(
    1,
    Genre.Romance,
    10
  );
  return {
    props: {
      trendingMoviesData,
      latesMoviesData,
      comedyMoviesData,
      romanceMoviesData,
    },
  };
}

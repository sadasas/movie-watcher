import { Suspense, lazy } from "react";

import styles from "@/styles/Home.module.scss";
import { getTrendingFilms } from "@/pages/api/film/getTrendingFilms";
import { getLatestFilms } from "@/pages/api/film/getLatesFilms";
import { getGenreFilms } from "@/pages/api/film/getGenreFilms";
import { Genre, IMovie, MovieType } from "@/models/movie";
import { BoxType } from "@/models/box";
import ListMoviesLoader from "@/components/loader/ListMoviesLoader";
import { getTopRatedFilms } from "../api/film/getTopRatedFilms";
const Movies = lazy(() => import("@/components/movies/Movies"));

function Home({
  trendingMoviesData,
  latesMoviesData,
  comedyMoviesData,
  romanceMoviesData,
  topRatedMoviesData,
  hororMoviesData,
  fantasyMoviesData,
}: {
  trendingMoviesData: IMovie[];
  latesMoviesData: IMovie[];
  comedyMoviesData: IMovie[];
  romanceMoviesData: IMovie[];
  topRatedMoviesData: IMovie[];
  hororMoviesData: IMovie[];
  fantasyMoviesData: IMovie[];
}) {
  return (
    <section id="films" className={styles["home-container"]}>
      <Suspense fallback={<ListMoviesLoader row={1} column={2} width={900} />}>
        <Movies
          urlBase="/film/TrendingFilms"
          urlBaseParams={null}
          title="Trending film"
          movies={trendingMoviesData}
          typeBox={BoxType.Large}
        />
      </Suspense>
      <Suspense fallback={<ListMoviesLoader row={1} column={5} width={900} />}>
        <Movies
          urlBase="/film/LatestFilms"
          urlBaseParams={null}
          title="Latest film"
          movies={latesMoviesData}
          typeBox={BoxType.Small}
        />
      </Suspense>
      <Suspense fallback={<ListMoviesLoader row={1} column={5} width={900} />}>
        <Movies
          urlBase="/genre/params"
          urlBaseParams={{ genre: Genre[Genre.Comedy], index: Genre["Comedy"] }}
          title="Comedy"
          movies={comedyMoviesData}
          typeBox={BoxType.Small}
        />
      </Suspense>
      <Suspense fallback={<ListMoviesLoader row={1} column={5} width={900} />}>
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
      <Suspense fallback={<ListMoviesLoader row={1} column={3} width={900} />}>
        <Movies
          urlBase="/film/TopRatedFilms"
          urlBaseParams={null}
          title="Top Rated"
          movies={topRatedMoviesData}
          typeBox={BoxType.Medium}
        />
      </Suspense>
      <Suspense fallback={<ListMoviesLoader row={1} column={5} width={900} />}>
        <Movies
          urlBase="/genre/params"
          urlBaseParams={{
            genre: Genre[Genre.Horror],
            index: Genre["Horror"],
          }}
          title="Horror"
          movies={hororMoviesData}
          typeBox={BoxType.Small}
        />
      </Suspense>
      <Suspense fallback={<ListMoviesLoader row={1} column={5} width={900} />}>
        <Movies
          urlBase="/genre/params"
          urlBaseParams={{
            genre: Genre[Genre.Fantasy],
            index: Genre["Fantasy"],
          }}
          title="Fantasy"
          movies={fantasyMoviesData}
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
  const { validData: topRatedMoviesData } = await getTopRatedFilms(1, 10);
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
  const { validData: hororMoviesData } = await getGenreFilms(
    1,
    Genre.Horror,
    10
  );
  const { validData: fantasyMoviesData } = await getGenreFilms(
    1,
    Genre.Fantasy,
    10
  );
  return {
    props: {
      trendingMoviesData,
      latesMoviesData,
      comedyMoviesData,
      romanceMoviesData,
      topRatedMoviesData,
      hororMoviesData,
      fantasyMoviesData,
    },
  };
}
